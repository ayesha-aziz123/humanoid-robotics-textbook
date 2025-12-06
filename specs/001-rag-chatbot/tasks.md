# Tasks: RAG Chatbot System

**Input**: Design documents from `/specs/001-rag-chatbot/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are OPTIONAL for this feature, as per spec.md. No explicit test tasks will be generated, but implementation tasks will ensure testable components.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `api/src/`, `scripts/`, `book_source/src/components/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create `api/` directory structure: `api/src/`, `api/tests/`
- [ ] T002 Create `scripts/` directory
- [ ] T003 Create `book_source/src/components/` directory
- [ ] T004 Initialize Python project with `poetry` in `api/` (create `api/pyproject.toml`)
- [ ] T005 Initialize Python project with `poetry` in `scripts/` (create `scripts/pyproject.toml`)
- [ ] T006 Initialize Node.js project in `book_source/` (run `npm init` or `yarn init` in `book_source/`)
- [ ] T007 Configure `.env` file at project root with QDRANT_URL, QDRANT_API_KEY, CLUSTER_ID, GEMINI_API_KEY

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T008 Install Python dependencies for `api/` (FastAPI, uvicorn, qdrant-client, google-generativeai, python-dotenv) in `api/pyproject.toml`
- [ ] T009 Install Python dependencies for `scripts/` (FastEmbed, qdrant-client, python-dotenv) in `scripts/pyproject.toml`
- [ ] T010 Implement markdown file scanning logic in `scripts/generate_embeddings.py`
- [ ] T011 Implement embedding generation using FastEmbed in `scripts/generate_embeddings.py`
- [ ] T012 Implement Qdrant collection creation ("physical_ai_book" with 384 dimensions) and population logic in `scripts/generate_embeddings.py`
- [ ] T013 Create FastAPI application instance in `api/src/main.py`
- [ ] T014 Configure CORS for FastAPI to allow `localhost:3000` in `api/src/main.py`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Ask a Question to the Chatbot (Priority: P1) 🎯 MVP

**Goal**: Enable users to ask general questions to the chatbot and receive answers based on the book content.

**Independent Test**: Successfully send a text query from the Docusaurus frontend to the backend and receive a relevant, sourced answer displayed in the chatbot UI.

### Implementation for User Story 1

- [ ] T015 [P] [US1] Implement POST `/query` endpoint in `api/src/main.py` to accept text queries
- [ ] T016 [US1] Implement RAG logic for standard queries within the `/query` endpoint in `api/src/main.py`, including embedding user query, searching Qdrant, and generating response via Gemini API
- [ ] T017 [US1] Include source citations in the `/query` endpoint response in `api/src/main.py`
- [ ] T018 [P] [US1] Create React chatbot component in `book_source/src/components/Chatbot.js`
- [ ] T019 [US1] Integrate `Chatbot.js` component into Docusaurus (e.g., in `book_source/src/theme/Root.js` or a custom page)
- [ ] T020 [US1] Implement sending standard text queries from `Chatbot.js` to the `/query` endpoint
- [ ] T021 [US1] Display chatbot responses, including source citations, in the `Chatbot.js` UI

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Query Based on Selected Text (Priority: P1)

**Goal**: Allow users to select text in the Docusaurus book and ask contextual questions.

**Independent Test**: Select text in the Docusaurus book, initiate a selected-text query from the chatbot UI, and receive a relevant answer focused solely on the selected text.

### Implementation for User Story 2

- [ ] T022 [P] [US2] Implement POST `/query-selection` endpoint in `api/src/main.py` to accept selected text and an optional question
- [ ] T023 [US2] Implement RAG logic for selected text queries within the `/query-selection` endpoint in `api/src/main.py`, ensuring context is restricted to the selected text as per constitution
- [ ] T024 [US2] Modify `Chatbot.js` to detect selected text in Docusaurus and enable a "Query Selected Text" option
- [ ] T025 [US2] Implement sending selected text queries from `Chatbot.js` to the `/query-selection` endpoint
- [ ] T026 [US2] Display contextual chatbot responses in the `Chatbot.js` UI

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: Initializing the RAG System (Priority: P2)

**Goal**: Ensure the embedding generation and Qdrant population process is robust and easily executable.

**Independent Test**: Successfully run the `generate_embeddings.py` script and verify that the Qdrant collection is created/updated and populated with correct embeddings.

### Implementation for Initializing RAG System

- [ ] T027 [US3] Refine `scripts/generate_embeddings.py` for robust error handling and logging during scanning, embedding, and Qdrant upload
- [ ] T028 [US3] Document the execution process for `scripts/generate_embeddings.py` in `quickstart.md` (if not already sufficiently covered)

**Checkpoint**: All core user stories and initial setup should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T029 Implement comprehensive error handling for all API endpoints in `api/src/main.py`
- [ ] T030 Implement robust logging for backend operations (FastAPI, embedding generation) in `api/src/main.py` and `scripts/generate_embeddings.py`
- [ ] T031 Implement graceful rate limit handling for Google Gemini API calls in `api/src/main.py`
- [ ] T032 Review and ensure all secrets (API keys) are loaded securely from environment variables, especially for deployment scenarios (refer to `quickstart.md` for guidance)
- [ ] T033 Run `quickstart.md` validation by following all steps to ensure a smooth setup and operation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Integrates with US1 (Chatbot UI) but should be independently testable for its core functionality.
- **User Story 3 (P2)**: Primarily foundational tasks, its execution (running the script) can happen after Phase 2 is complete. Its refinement tasks (T027, T028) can run in parallel with US1/US2 implementation.

### Within Each User Story

- Models before services
- Services before endpoints
- Core implementation before integration with UI
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks (Phase 1) can run in parallel where file paths are distinct.
- Many Foundational tasks (Phase 2) are independent and can be parallelized.
- Once Foundational phase completes, User Story 1 and User Story 2 can be worked on in parallel, particularly tasks T015/T018 (US1) and T022/T024 (US2) can start concurrently.
- Within each user story, tasks marked [P] can run in parallel.

---

## Parallel Example: User Story 1 & 2 (after Foundational)

```bash
# In parallel, for User Story 1 (Ask a Question):
Task: "Implement POST /query endpoint in api/src/main.py"
Task: "Create React chatbot component in book_source/src/components/Chatbot.js"

# In parallel, for User Story 2 (Query Based on Selected Text):
Task: "Implement POST /query-selection endpoint in api/src/main.py"
Task: "Modify Chatbot.js to detect selected text in Docusaurus"
```

---

## Implementation Strategy

### MVP First (User Story 1 & 2)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. Complete Phase 4: User Story 2
5. **STOP and VALIDATE**: Test User Story 1 and 2 independently and together.
6. Deploy/demo if ready.

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP for general Q&A!)
3. Add User Story 2 → Test independently → Deploy/Demo (Adds selected text context!)
4. Refine User Story 3 (Embedding Initialization) & Polish → Full System Ready
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together.
2. Once Foundational is done:
   - Developer A: User Story 1 (Backend /query, Frontend Chatbot UI)
   - Developer B: User Story 2 (Backend /query-selection, Frontend Selected Text Integration)
   - Developer C: Refinement of Embedding Initialization (US3) & Cross-Cutting Concerns (e.g., error handling, logging)
3. Stories complete and integrate independently.

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence



