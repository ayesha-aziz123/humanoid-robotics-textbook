# from fastapi import FastAPI, Request, status, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from typing import Optional, Dict, Any, List
# import os
# import httpx
# from dotenv import load_dotenv
# from fastembed import TextEmbedding
# import google.generativeai as genai
# # Import the agent validator
# from src.services.agent_validator import validate_question, ValidationStatus, format_rejection_response, format_success_response


# # --- FastAPI App Setup ---
# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "http://localhost:3000",
#         "http://127.0.0.1:3000"
#     ],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # --- Pydantic Models ---
# class QueryRequest(BaseModel):
#     query: str

# class QuerySelectionRequest(BaseModel):
#     selected_text: str
#     query: Optional[str] = None

# # --- Helper Function for RAG ---
# def perform_rag(query: str, context_prefix: str = "") -> Dict[str, Any]:
#     """
#     Performs the RAG process using raw HTTP requests for Qdrant to bypass client library issues.
#     """
#     try:
#         # Load environment variables
#         load_dotenv()
#         QDRANT_URL = os.getenv("QDRANT_URL")
#         QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
#         GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
        
#         if not QDRANT_URL or not GEMINI_API_KEY:
#             raise ValueError("QDRANT_URL or GEMINI_API_KEY not found in .env file.")

#         # 1. Initialize models
#         embedding_model = TextEmbedding(model_name="BAAI/bge-small-en-v1.5")
#         genai.configure(api_key=GEMINI_API_KEY) # type: ignore
#         llm = genai.GenerativeModel('gemini-2.5-flash') # type: ignore

#         # 2. Embed the search query
#         search_query = f"{context_prefix} {query}" if context_prefix else query
#         query_embedding = list(embedding_model.embed([search_query]))[0]

#         # 3. Search Qdrant using raw HTTP POST request
#         print("--- [DEBUG] Searching Qdrant via raw HTTP request...")
#         qdrant_search_url = f"{QDRANT_URL}/collections/physical_ai_book/points/search"
#         headers = {
#             "Content-Type": "application/json",
#             "api-key": QDRANT_API_KEY
#         }
#         # FIX: Convert numpy array to list for JSON serialization
#         search_payload = {
#             "vector": query_embedding.tolist(),
#             "limit": 3,
#             "with_payload": True
#         }
        
#         with httpx.Client() as client:
#             response = client.post(qdrant_search_url, json=search_payload, headers=headers, timeout=20.0)
#             response.raise_for_status()
#             qdrant_response = response.json()

#         search_results = qdrant_response.get("result", [])
#         if not search_results:
#              print("--- [DEBUG] Qdrant returned no results.")

#         context = "\n\n".join([hit.get("payload", {}).get("text_chunk", "") for hit in search_results])
#         sources = [{"file": hit.get("payload", {}).get("source_file", "Unknown"), "score": hit.get("score", 0.0)} for hit in search_results]

#         # 4. Generate response from LLM
#         final_prompt = f"Context:\n{context}\n\nQuestion: {query}\n\nAnswer:"
#         llm_response = llm.generate_content(final_prompt)

#         return {"answer": llm_response.text, "sources": sources}

#     except httpx.HTTPStatusError as e:
#         print(f"--- [CRITICAL ERROR in Qdrant HTTP request]: {e.response.text} ---")
#         raise HTTPException(status_code=500, detail=f"Qdrant request failed: {e.response.text}")
#     except Exception as e:
#         print(f"--- [CRITICAL ERROR in RAG process]: {e} ---")
#         raise HTTPException(status_code=500, detail=f"An internal error occurred: {e}")


# # --- API Endpoints ---
# @app.get("/")
# async def read_root():
#     return {"message": "RAG Chatbot API is running (HTTP-only Mode)."}

# @app.post("/query")
# async def query_chatbot(request: QueryRequest):
#     # Validate the question for relevance before RAG processing
#     validation_result = await validate_question(request.query)

#     if validation_result.status == ValidationStatus.IRRELEVANT:
#         # Return rejection message if question is irrelevant
#         return format_rejection_response(validation_result)
#     else:
#         # Proceed with RAG processing if question is relevant
#         rag_result = perform_rag(request.query)
#         # Extract answer and sources from rag_result to format properly
#         answer = rag_result.get("answer", "")
#         sources = rag_result.get("sources", [])
#         # Convert sources to the expected source_chunks format
#         source_chunks = [{"content": s.get("file", ""), "source": s.get("file", ""), "page": s.get("score", 0.0)} for s in sources]
#         return format_success_response(answer, source_chunks, validation_result)

# @app.post("/query-selection")
# async def query_chatbot_selection(request: QuerySelectionRequest):
#     return perform_rag(request.query, context_prefix=request.selected_text)















from fastapi import FastAPI, Request, status, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, Any, List
import os
import httpx
from dotenv import load_dotenv
from fastembed import TextEmbedding
import google.generativeai as genai
# Import the agent validator
from src.services.agent_validator import validate_question, ValidationStatus, format_rejection_response, format_success_response


# --- FastAPI App Setup ---
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Models ---
class QueryRequest(BaseModel):
    query: str= None

class QuerySelectionRequest(BaseModel):
    selected_text: str
    query: Optional[str] = None

# --- Helper Function for RAG ---
def perform_rag(query: str, context_prefix: str = "") -> Dict[str, Any]:
    """
    Performs the RAG process using raw HTTP requests for Qdrant to bypass client library issues.
    """
    try:
        # Load environment variables
        load_dotenv()
        QDRANT_URL = os.getenv("QDRANT_URL")
        QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
        GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
        
        if not QDRANT_URL or not GEMINI_API_KEY:
            raise ValueError("QDRANT_URL or GEMINI_API_KEY not found in .env file.")

        # 1. Initialize models
        embedding_model = TextEmbedding(model_name="BAAI/bge-small-en-v1.5")
        genai.configure(api_key=GEMINI_API_KEY) # type: ignore
        llm = genai.GenerativeModel('gemini-2.5-flash') # Updated to stable model

        # 2. Embed the search query
        search_query = f"{context_prefix} {query}" if context_prefix else query
        query_embedding = list(embedding_model.embed([search_query]))[0]

        # 3. Search Qdrant using raw HTTP POST request
        print("--- [DEBUG] Searching Qdrant via raw HTTP request...")
        qdrant_search_url = f"{QDRANT_URL}/collections/physical_ai_book/points/search"
        headers = {
            "Content-Type": "application/json",
            "api-key": QDRANT_API_KEY
        }
        # FIX: Convert numpy array to list for JSON serialization
        search_payload = {
            "vector": query_embedding.tolist(),
            "limit": 3,
            "with_payload": True
        }
        
        with httpx.Client() as client:
            response = client.post(qdrant_search_url, json=search_payload, headers=headers, timeout=20.0)
            response.raise_for_status()
            qdrant_response = response.json()

        search_results = qdrant_response.get("result", [])
        if not search_results:
            print("--- [DEBUG] Qdrant returned no results.")

        context = "\n\n".join([hit.get("payload", {}).get("text_chunk", "") for hit in search_results])
        sources = []
        for hit in search_results:
            payload = hit.get("payload", {})
            source_file = payload.get("source_file", "Unknown")
            score = hit.get("score", 0.0)
            
            # Agar aapke documents ek specific directory mein hain
            # Ya web URLs hain, to unhe yahan define karein
            file_path = f"file:///{source_file}"  # Local files ke liye
            # OR agar web par accessible hai to:
            # file_path = f"http://your-domain.com/documents/{source_file}"
            
            sources.append({
                "file": source_file,
                "file_path": file_path,  # ADD THIS
                "score": score
            })

        # 4. Generate response from LLM
        final_prompt = f"Context:\n{context}\n\nQuestion: {query}\n\nAnswer:"
        llm_response = llm.generate_content(final_prompt)

        return {"answer": llm_response.text, "sources": sources}

    except httpx.HTTPStatusError as e:
        print(f"--- [CRITICAL ERROR in Qdrant HTTP request]: {e.response.text} ---")
        raise HTTPException(status_code=500, detail=f"Qdrant request failed: {e.response.text}")
    except Exception as e:
        print(f"--- [CRITICAL ERROR in RAG process]: {e} ---")
        raise HTTPException(status_code=500, detail=f"An internal error occurred: {e}")


# --- API Endpoints ---
@app.get("/")
async def read_root():
    return {"message": "RAG Chatbot API is running (HTTP-only Mode)."}


@app.post("/query")
async def query_chatbot(request: QueryRequest):
    # Validate the question for relevance before RAG processing
    validation_result = await validate_question(request.query)

    if validation_result.status == ValidationStatus.IRRELEVANT:
        # Return rejection message if question is irrelevant
        return format_rejection_response(validation_result)
    else:
        # Proceed with RAG processing if question is relevant
        rag_result = perform_rag(request.query)
        # Extract answer and sources from rag_result to format properly
        answer = rag_result.get("answer", "")
        sources = rag_result.get("sources", [])
        
        # MODIFY THIS: Add file_path to source_chunks
        source_chunks = [
            {
                "content": s.get("file", ""), 
                "source": s.get("file", ""), 
                "file_path": s.get("file_path", ""),  # ADD THIS
                "page": s.get("score", 0.0)
            } 
            for s in sources
        ]
        
        return format_success_response(answer, source_chunks, validation_result)


@app.post("/query-selection")
async def query_chatbot_selection(request: QuerySelectionRequest):  # <-- Ab model use karo
    # Effective query for validation: use query if present, else selected_text
    effective_query = request.query if request.query else request.selected_text
    validation_result = await validate_question(effective_query)

    if validation_result.status == ValidationStatus.IRRELEVANT:
        return format_rejection_response(validation_result)
    else:
        rag_result = perform_rag(request.query or "", context_prefix=request.selected_text)
        answer = rag_result.get("answer", "")
        sources = rag_result.get("sources", [])
        
        source_chunks = [
            {
                "content": s.get("file", ""), 
                "source": s.get("file", ""), 
                "file_path": s.get("file_path", ""),
                "page": s.get("score", 0.0)
            } 
            for s in sources
        ]
        
        return format_success_response(answer, source_chunks, validation_result)