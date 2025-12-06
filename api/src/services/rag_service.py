import os
import asyncio
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from qdrant_client import QdrantClient
from fastembed import TextEmbedding
from langchain_core.prompts import PromptTemplate
from typing import Optional, List, Dict, Any

# --- Globals ---
qdrant_client: Optional[QdrantClient] = None
embedding_model: Optional[TextEmbedding] = None
llm: Optional[Any] = None
initialization_status: Dict[str, str] = {
    "qdrant_client": "Not initialized",
    "embedding_model": "Not initialized",
    "llm": "Not initialized",
    "details": "Services are not yet initialized. Run the /health/init endpoint to start."
}

# --- Lifecycle Events ---
async def initialize_services():
    """Initializes all necessary services, adding verbose debug printing."""
    global qdrant_client, embedding_model, llm, initialization_status
    
    if initialization_status["details"] == "All services are operational.":
        print("--- [INFO] Services already initialized. ---")
        return

    print("--- [DEBUG] Starting Service Initialization ---")
    
    try:
        load_dotenv()
        QDRANT_URL = os.getenv("QDRANT_URL")
        GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

        print(f"--- [DEBUG] QDRANT_URL found: {'Yes' if QDRANT_URL else 'No'}")
        print(f"--- [DEBUG] GEMINI_API_KEY found: {'Yes' if GEMINI_API_KEY else 'No'}")

        if not QDRANT_URL or not GEMINI_API_KEY:
            raise ValueError("Required environment variables (QDRANT_URL, GEMINI_API_KEY) are missing.")

        loop = asyncio.get_event_loop()

        print("--- [DEBUG] Initializing embedding model...")
        embedding_model = await loop.run_in_executor(None, lambda: TextEmbedding(model_name="BAAI/bge-small-en-v1.5"))
        initialization_status["embedding_model"] = "Successfully initialized."
        print("--- [DEBUG] Embedding model initialized.")

        print("--- [DEBUG] Initializing Qdrant client...")
        qdrant_client = QdrantClient(url=QDRANT_URL, api_key=os.getenv("QDRANT_API_KEY"))
        await loop.run_in_executor(None, qdrant_client.get_collections)
        initialization_status["qdrant_client"] = "Successfully initialized and connected."
        print("--- [DEBUG] Qdrant client initialized and connected.")

        print("--- [DEBUG] Initializing LLM...")
        llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", google_api_key=GEMINI_API_KEY)
        initialization_status["llm"] = "Successfully initialized."
        print("--- [DEBUG] LLM initialized.")
        
        initialization_status["details"] = "All services are operational."
        print("--- [SUCCESS] Service Initialization Complete ---")

    except Exception as e:
        error_message = str(e)
        initialization_status["details"] = f"An error occurred during initialization: {error_message}"
        # ... update specific statuses ...
        print(f"--- [CRITICAL ERROR] Service Initialization Failed: {error_message} ---")
        raise e

# --- Health Check ---
def get_system_health() -> Dict[str, Any]:
    return initialization_status

# --- RAG Implementation ---
# ... (The rest of the file remains the same, so it's omitted for brevity)
# The functions below will only work after initialize_services() has been successfully called.

def retrieve_context(query: str, search_limit: int = 5) -> Dict[str, Any]:
    if not qdrant_client or not embedding_model:
        raise ConnectionError("Services not initialized. Please run the /health/init endpoint first.")
    # ... (rest of the function)
    query_embedding = list(embedding_model.embed([query]))[0]
    search_results = qdrant_client.search(
        collection_name="physical_ai_book",
        query_vector=query_embedding,
        limit=search_limit,
        with_payload=True
    )
    context_chunks = [hit.payload.get("text_chunk", "") for hit in search_results]
    sources = [{"file": hit.payload.get("source_file", "Unknown"), "score": hit.score} for hit in search_results]
    return {"context": "\n\n".join(context_chunks), "sources": sources}


async def query_rag_system(query: str) -> Dict[str, Any]:
    if not llm:
        raise ConnectionError("Services not initialized. Please run the /health/init endpoint first.")
    # ... (rest of the function)
    prompt_template = "Answer based on context..."
    prompt = PromptTemplate.from_template(prompt_template)
    rag_chain = (
        {"context": (lambda x: retrieve_context(x["question"])) , "question": RunnablePassthrough()}
        | (lambda x: {"context": x["context"]["context"], "question": x["question"], "sources": x["context"]["sources"]})
        | {"answer": prompt | llm | StrOutputParser(), "sources": (lambda x: x["sources"])}
    )
    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(None, rag_chain.invoke, {"question": query})

async def query_rag_system_with_selection(selected_text: str, query: Optional[str] = None) -> Dict[str, Any]:
    if not llm:
        raise ConnectionError("Services not initialized. Please run the /health/init endpoint first.")
    # ... (rest of the function)
    search_query = f"{query} - based on: {selected_text}" if query else selected_text
    retrieved = await asyncio.get_event_loop().run_in_executor(None, retrieve_context, search_query, 4)
    question_to_ask = query if query else selected_text
    
    selection_prompt_template = "Answer based on selection and context..."
    selection_prompt = PromptTemplate.from_template(selection_prompt_template)
    chain = selection_prompt | llm | StrOutputParser()
    
    loop = asyncio.get_event_loop()
    answer = await loop.run_in_executor(None, chain.invoke, {
        "selected_text": selected_text,
        "retrieved_context": retrieved["context"],
        "question": question_to_ask
    })
    return {"answer": answer, "sources": retrieved["sources"]}
