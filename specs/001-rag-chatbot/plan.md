# Implementation Plan: RAG Chatbot System

**Branch**: `001-rag-chatbot` | **Date**: 2025-11-30 | **Spec**: `specs/001-rag-chatbot/spec.md`
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement a complete RAG chatbot system for the Physical AI Docusaurus book to answer user queries and selected text questions, utilizing FastEmbed for local embeddings, Qdrant Cloud for vector storage, and Google Gemini API for LLM responses, with a FastAPI backend and a React Docusaurus component.

## Technical Context

**Language/Version**: Python 3.11 (backend), TypeScript/JavaScript (frontend)
**Primary Dependencies**: FastEmbed, Qdrant client, Google Gemini API client (for Python), FastAPI, React, Docusaurus
**Storage**: Qdrant Cloud (vector storage for embeddings)
**Testing**: pytest (Python backend), React Testing Library / Jest (React frontend)
**Target Platform**: Linux server (backend), Web browser (frontend - Docusaurus embedded)
**Project Type**: Web application (backend + frontend)
**Performance Goals**: Standard RAG Q&A queries return a response within 3 seconds for 95% of requests. Selected text queries return a response within 3 seconds for 95% of requests.
**Constraints**: No OpenAI API usage; FastEmbed for local embeddings; Google Gemini API for LLM responses; Qdrant collection auto-creation if not exists; graceful rate limit handling for Gemini API; CORS enabled for localhost:3000.
**Scale/Scope**: RAG chatbot for a Docusaurus book (medium scale, specific domain content for Physical AI & Humanoid Robotics).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Alignment with Scope & Deliverables**: The RAG chatbot functionality, including the "selected-text only" answering, directly aligns with the primary deliverables defined in the constitution (1. Scope & Deliverables).
- **Adherence to Provenance & RAG policy**: The implementation will strictly adhere to the RAG policy, ensuring all generated answers include source citations and that "selected-text only" queries restrict context to the selected text (6. Provenance & RAG policy).
- **Security & Secrets Handling**: API keys (Qdrant, Gemini) will be loaded from environment variables (e.g., `.env` for local development). For deployment, these must be handled as GitHub Actions secrets or equivalent, adhering to the constitution's principle of no secrets in the repository (8. Security & Secrets). This requires careful implementation to distinguish between local development and deployment configurations.
- **Minimal Acceptance Criteria**: The plan contributes directly to several minimal acceptance criteria, especially regarding the RAG endpoint and the "selected-text only" answer flow (12. Minimal Acceptance Criteria).


## Project Structure

### Documentation (this feature)

```text
specs/001-rag-chatbot/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
.
├── api/                  # FastAPI backend
│   ├── src/
│   │   └── main.py       # FastAPI application
│   └── tests/            # Backend tests
├── scripts/              # Embedding generation scripts
│   └── generate_embeddings.py
├── book_source/          # Docusaurus book
│   ├── docs/             # Markdown content for the book
│   └── src/
│       └── components/   # React chatbot component
├── .env                  # Environment variables for local development
├── pyproject.toml        # Python project configuration (poetry/pipenv)
└── history/              # Prompt history records and ADRs
```

**Structure Decision**: The project will follow a hybrid structure suitable for a Docusaurus application with a separate Python backend. The `api/` directory will house the FastAPI application, `scripts/` will contain embedding generation logic, and `book_source/` will maintain the Docusaurus project, including the React chatbot component. Environment variables will be managed via `.env` for local setup.

