import os
from dotenv import load_dotenv
from qdrant_client import QdrantClient
from fastembed import TextEmbedding
import google.generativeai as genai
from typing import Optional

# Load environment variables
load_dotenv()

QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
COLLECTION_NAME = "physical_ai_book"

genai.configure(api_key=GEMINI_API_KEY)
model_gemini = genai.GenerativeModel('gemini-2.5-flash') # type: ignore

def get_qdrant_client():
    return QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)

def get_embedding_model():
    return TextEmbedding(model_name="BAAI/bge-small-en-v1.5")

async def query_rag_system(query: str):
    client = get_qdrant_client()
    embedding_model = get_embedding_model()

    # 1. Embed the user query
    query_embedding = list(embedding_model.embed([query]))[0]

    # 2. Search Qdrant for relevant documents
    search_result = client.search(
        collection_name=COLLECTION_NAME,
        query_vector=query_embedding,
        limit=3  # Retrieve top 3 most relevant chunks
    )

    context = []
    sources = []
    for hit in search_result:
        context.append(hit.payload.get("text_chunk", ""))
        sources.append({"file": hit.payload.get("source_file", "Unknown"), "text_snippet": hit.payload.get("text_chunk", "Unknown")})

    context_str = "\n\n".join(context)

    # 3. Generate response using Gemini API
    prompt = f"Based on the following context, answer the question. If the answer is not in the context, state that you don't know.\n\nContext:\n{context_str}\n\nQuestion: {query}\nAnswer:"

    try:
        response = model_gemini.generate_content(prompt)
        answer = response.text
    except Exception as e:
        print(f"Gemini API error: {e}")
        answer = "I am currently unable to generate a response. Please try again later."

    return {"answer": answer, "sources": sources}

async def query_rag_system_with_selection(selected_text: str, query: Optional[str] = None):
    # For selected text queries, the context is the selected text itself.
    # No need to search Qdrant.
    context_str = selected_text
    question = query if query else selected_text

    prompt = f"Based on the following context, answer the question. If the answer is not in the context, state that you don't know.\n\nContext:\n{context_str}\n\nQuestion: {question}\nAnswer:"

    try:
        response = model_gemini.generate_content(prompt)
        answer = response.text
    except Exception as e:
        print(f"Gemini API error: {e}")
        answer = "I am currently unable to generate a response. Please try again later."

    # Sources will be the selected text itself, for simplicity.
    sources = [{"file": "User Selection", "text_snippet": selected_text}]

    return {"answer": answer, "sources": sources}
