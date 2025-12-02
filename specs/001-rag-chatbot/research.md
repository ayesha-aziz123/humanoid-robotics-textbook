# Research for RAG Chatbot System

**Feature Branch**: `001-rag-chatbot` | **Date**: 2025-11-30

## Technology Decisions and Rationale

### 1. Embeddings: FastEmbed (BAAI/bge-small-en-v1.5)

- **Decision**: Use FastEmbed with the `BAAI/bge-small-en-v1.5` model.
- **Rationale**: Chosen as per user requirements for local, fast, and cost-effective embedding generation, avoiding external API dependencies for this critical step.
- **Alternatives Considered**: OpenAI Embeddings (rejected due to cost), other open-source embedding models (FastEmbed was specified).

### 2. Vector Database: Qdrant Cloud

- **Decision**: Utilize Qdrant Cloud for vector storage.
- **Rationale**: User-specified, and suitable for scalable vector search. The plan includes auto-creation of the "physical_ai_book" collection if it doesn't exist, as required.
- **Alternatives Considered**: Pinecone, ChromaDB (rejected as Qdrant was specified).

### 3. Large Language Model (LLM): Google Gemini API

- **Decision**: Integrate Google Gemini API for LLM responses.
- **Rationale**: Explicitly mandated by user requirements to use a free LLM, avoiding OpenAI. Gemini API provides text generation capabilities essential for the RAG system.
- **Alternatives Considered**: OpenAI GPT models (rejected due to cost), other open-source LLMs (rejected as Gemini was specified and free).

### 4. Backend Framework: FastAPI

- **Decision**: Implement the backend using FastAPI.
- **Rationale**: User-specified for building API endpoints. FastAPI is a modern, fast (high-performance) web framework for building APIs with Python, suitable for the RAG backend.
- **Alternatives Considered**: Flask, Django (rejected as FastAPI was specified).

### 5. Frontend Component: React for Docusaurus

- **Decision**: Develop a React chatbot component for embedding within Docusaurus.
- **Rationale**: User-specified to integrate seamlessly with the Docusaurus book, providing an interactive chatbot UI.
- **Alternatives Considered**: Vanilla JavaScript, other frontend frameworks (rejected as React/Docusaurus was specified).

### 6. Agent Framework Pattern: OpenAI Agents SDK patterns (Design Pattern Only)

- **Decision**: Adopt design patterns from the OpenAI Agents SDK.
- **Rationale**: User-specified for architectural guidance, without using the actual OpenAI API, ensuring adherence to the "no OpenAI API usage" constraint while leveraging proven agent design principles.
- **Alternatives Considered**: Custom agent orchestration, LangChain (rejected as OpenAI Agents SDK patterns were specified for design, and full frameworks might introduce unwanted dependencies).
