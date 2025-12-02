# ADR-0001: RAG Chatbot System Project Structure

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Proposed | Accepted | Superseded | Rejected
- **Date:** 2025-12-01
- **Feature:** 001-rag-chatbot
- **Context:** The RAG chatbot system aims to provide answers to user queries and selected text questions for the Physical AI Docusaurus book. This involves integrating a FastAPI backend, a React Docusaurus component, FastEmbed for local embeddings, Qdrant Cloud for vector storage, and Google Gemini API for LLM responses. The project structure decision defines how these components are organized within the repository.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
     2) Alternatives: Multiple viable options considered with tradeoffs?
     3) Scope: Cross-cutting concern (not an isolated detail)?
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

The project will follow a hybrid structure suitable for a Docusaurus application with a separate Python backend.
- **Backend Framework**: FastAPI
- **Frontend Framework**: React (embedded in Docusaurus)
- **Embedding Model**: FastEmbed (BAAI/bge-small-en-v1.5)
- **Vector Database**: Qdrant Cloud
- **LLM**: Google Gemini API
- **Project Structure**: Hybrid (FastAPI backend in `api/`, embedding generation scripts in `scripts/`, Docusaurus frontend with React component in `book_source/`)
- **Environment Variables**: Managed via `.env` for local setup.

## Consequences

### Positive

- Leverages the robust Python ecosystem for backend development (FastAPI, FastEmbed, Qdrant client, Google Gemini client).
- Promotes separation of concerns, allowing independent development and scaling of the backend API, embedding generation scripts, and frontend UI.
- Docusaurus integration provides a unified and cohesive user experience directly within the book's documentation.
- FastEmbed offers a local, fast, and cost-free solution for generating text embeddings.
- Qdrant Cloud provides a scalable and managed vector database solution.
- Google Gemini API is a powerful and free Large Language Model option for generating responses.

### Negative

- Increased complexity due to the multi-language (Python/TypeScript) and multi-framework (FastAPI/React/Docusaurus) setup, potentially requiring more specialized knowledge.
- Deployment and local development setup might be more involved due to the need to manage separate backend and frontend components.
- Potential for versioning and dependency management challenges across different parts of the system, especially between the backend API and the frontend chatbot component.

## Alternatives Considered

- **Alternative Stack A: Single-language Backend/Frontend (e.g., Node.js for both)**
  - **Why rejected**: Less mature ecosystem for key RAG components (FastEmbed, Qdrant client, Google Gemini client) which are predominantly Python-centric, requiring significant reimplementation or adoption of less optimized alternative libraries.
- **Alternative Stack B: Monolithic Framework (e.g., Django with Django Rest Framework for API, Django templates for frontend)**
  - **Why rejected**: Offers less flexibility for seamless frontend integration with Docusaurus and would likely result in a heavier, more opinionated setup for a feature primarily focused on a chatbot.

## References

- Feature Spec: specs/001-rag-chatbot/spec.md
- Implementation Plan: specs/001-rag-chatbot/plan.md
- Related ADRs: null
- Evaluator Evidence: null

