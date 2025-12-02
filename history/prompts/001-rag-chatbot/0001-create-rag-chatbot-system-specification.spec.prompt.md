---
id: 0001
title: Create RAG Chatbot System Specification
stage: spec
date: 2025-11-30
surface: agent
model: claude-sonnet-4-5-20250929
feature: 001-rag-chatbot
branch: 001-rag-chatbot
user: user
command: /sp.specify
labels: ["specification", "rag", "chatbot"]
links:
  spec: specs/001-rag-chatbot/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/001-rag-chatbot/spec.md
 - specs/001-rag-chatbot/checklists/requirements.md
tests:
null
---

## Prompt

```text
/sp.specify Implement a complete RAG chatbot system for the Physical AI Docusaurus book with these requirements:

TECHNICAL STACK:
- FastEmbed (BAAI/bge-small-en-v1.5) for embeddings - local, fast, no API costs
- Qdrant Cloud for vector storage (credentials in .env)
- Google Gemini API for LLM responses (FREE - no OpenAI)
- FastAPI backend with CORS
- React chatbot component for Docusaurus
- OpenAI Agents SDK patterns (design pattern only, not actual API)

FEATURES:
1. Scan all markdown files in book_source/docs/
2. Generate embeddings using FastEmbed
3. Create/use Qdrant collection "physical_ai_book" (384 dimensions)
4. Build FastAPI with two endpoints:
   - POST /query: Standard RAG Q&A
   - POST /query-selection: Answer based on user's selected text
5. React chatbot UI that embeds in Docusaurus
6. Support text selection queries

STRUCTURE TO CREATE:
- api/ folder with FastAPI backend
- scripts/ folder for embedding generation
- book_source/src/components/ for React chatbot
- Auto-detect and use existing .env file




### Environment Variables Required
- QDRANT_URL=https://0e797b5c-5f88-4622-947b-beaab05d3594.sa-east-1-0.aws.cloud.qdrant.io
- QDRANT_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.Sh3bZvOSI6TgWhMB1BMBw6BUpqO6qkzCAkUtHYUlpG0
- CLUSTER_ID=0e797b5c-5f88-4622-947b-beaab05d3594
- GEMINI_API_KEY=AIzaSyCOY99nEkAkJOk5n5sWeV9WlXr8HXWtVFc




CRITICAL:
- NO OpenAI API usage (paid)
- Use FastEmbed locally for embeddings
- Use Gemini API for text generation
- Collection auto-creation if not exists
- Handle rate limits gracefully
- CORS for localhost:3000

Start by testing Qdrant connection, then create collection, generate embeddings, build API, and finally create frontend component.
```

## Response snapshot

The RAG Chatbot System specification has been created in `specs/001-rag-chatbot/spec.md` and a corresponding quality checklist `specs/001-rag-chatbot/checklists/requirements.md` has been generated. The feature branch `001-rag-chatbot` was created for this task.

## Outcome

- ✅ Impact: The specification for the RAG chatbot system has been successfully created, outlining user scenarios, functional requirements, and success criteria.
- 🧪 Tests: No explicit tests were run during the specification phase.
- 📁 Files: `specs/001-rag-chatbot/spec.md`, `specs/001-rag-chatbot/checklists/requirements.md`
- 🔁 Next prompts: Proceed to `/sp.clarify` if clarifications are needed, or `/sp.plan` to begin architectural planning.
- 🧠 Reflection: Successfully created the feature branch, spec file, and checklist. Encountered an issue with the `create-phr.sh` script, which led to using the agent-native flow for PHR creation.

## Evaluation notes (flywheel)

- Failure modes observed: Initial attempt to run `create-phr.sh` with `pwsh` failed due to incorrect interpreter and path. Resolved by switching to agent-native PHR creation.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Ensure `create-phr` script is correctly configured for the environment or confirm its expected location/usage in documentation.
