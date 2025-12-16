# Tasks: Physical AI & Humanoid Robotics Textbook Generation

**Feature Branch**: `001-ai-textbook-gen` | **Date**: 2025-11-28 | **Plan**: [specs/001-ai-textbook-gen/plan.md](specs/001-ai-textbook-gen/plan.md)
**Input**: Implementation plan from `/specs/001-ai-textbook-gen/plan.md`

## Summary

This document outlines the detailed, dependency-ordered tasks for implementing the "Physical AI & Humanoid Robotics Textbook Generation" feature. Tasks are organized into phases, with specific focus on individual user stories to facilitate incremental development and testing.

## Dependencies

User Story Completion Order:
- User Story 1 (Generate Core Textbook Modules) -> No direct dependencies
- User Story 2 (Implement Professional Textbook UI) -> Depends on User Story 1 (Docusaurus structure)
- User Story 3 (Integrate RAG Chatbot with Selected Text Context) -> Depends on User Story 1 (textbook content for RAG)
- User Story 4 (Urdu Translation) -> Depends on User Story 1 (textbook content for translation)

## Parallel Execution Examples

**Within User Story 1**: Tasks for generating different modules (e.g., Module 1 and Module 2) can be parallelized if content generation is independent.
- `T007 [P] [US1] Generate content for Module 1 chapters in /book_source/docs/01-introduction/*.md`
- `T008 [P] [US1] Generate content for Module 2 chapters in /book_source/docs/02-ros2-fundamentals/*.md`

**Between User Story 2 and 3**: Once User Story 1 is complete, UI implementation (US2) and RAG backend development (US3) can proceed in parallel.
- `T014 [P] [US2] Update docusaurus.config.ts for professional theme configuration`
- `T017 [P] [US3] Set up FastAPI backend directory structure in backend/`

## Implementation Strategy

The implementation will follow an MVP-first approach, prioritizing User Story 1 (Core Textbook Modules) and User Story 2 (Professional Textbook UI) as P1, then User Story 3 (RAG Chatbot) as P2, and finally User Story 4 (Urdu Translation) as P3. This allows for incremental delivery and early validation of core textbook functionality.

---

## Phase 1: Setup

- [X] T001 Initialize Node.js project for Docusaurus frontend in project root
- [X] T002 Install Docusaurus and React dependencies in package.json
- [X] T003 Initialize Python project for RAG backend in backend/
- [X] T004 Install FastAPI, Qdrant client, and PostgreSQL client dependencies in backend/requirements.txt
- [X] T005 Verify .gitignore includes node_modules/, dist/, build/, __pycache__/, .venv/, venv/, *.log, .env* and other common patterns

## Phase 2: Foundational

- [X] T006 Replace default Docusaurus content in /book_source/docs/ with initial empty module directories and placeholder `_category_.json` files

## Phase 3: User Story 1 - Generate Core Textbook Modules (Priority: P1)

**Goal**: Publicly hosted Docusaurus textbook with 4 complete modules, as per hackathon course outline.
**Independent Test**: The generated `/book_source/docs/` folder can be built using Docusaurus, and the 4 modules can be navigated through, verifying that each chapter contains the required elements (objectives, explanation, exercises, quizzes, references).

- [x] T007 [P] [US1] Generate content for Module 1 chapters (Introduction to Physical AI) in /book_source/docs/01-introduction/*.md, ensuring learning objectives, explanations, exercises, quizzes, and references.
- [x] T008 [P] [US1] Generate content for Module 2 chapters (ROS 2 Fundamentals) in /book_source/docs/02-ros2-fundamentals/*.md, ensuring learning objectives, explanations, exercises, quizzes, and references.
- [X] T009 [P] [US1] Generate content for Module 3 chapters (Gazebo & Simulation) in /book_source/docs/03-gazebo-simulation/*.md, ensuring learning objectives, explanations, exercises, quizzes, and references.
- [X] T010 [P] [US1] Generate content for Module 4 chapters (NVIDIA Isaac Platform) in /book_source/docs/04-nvidia-isaac-platform/*.md, ensuring learning objectives, explanations, exercises, quizzes, and references.
- [X] T011 [US1] Update sidebars.ts to accurately reflect the 4 generated modules and their respective chapters.
- [X] T012 [US1] Run Docusaurus build to verify successful content generation and sidebar configuration.

## Phase 4: User Story 2 - Implement Professional Textbook UI (Priority: P1)

**Goal**: Docusaurus website with a professional textbook-like UI, replacing the default Docusaurus theme, with a clean academic color scheme, responsive sidebar navigation, and professional typography.
**Independent Test**: The Docusaurus site can be launched, and its visual appearance can be manually inspected to confirm the professional theme, color scheme, typography, and responsive navigation.

- [X] T013 [P] [US2] Research and select a professional Docusaurus theme or customize existing theme files in src/css/custom.css (or similar).
- [X] T014 [US2] Update docusaurus.config.ts for professional theme configuration, academic color scheme, and typography.
- [X] T015 [US2] Implement responsive design adjustments for sidebar navigation and content layout in relevant CSS/React component files (e.g., src/components/Sidebar/index.js).
- [X] T016 [US2] Run Docusaurus build and visually inspect the UI to ensure it meets professional standards and responsiveness.

## Phase 5: User Story 3 - Integrate RAG Chatbot with Selected Text Context (Priority: P2)

**Goal**: Embedded RAG chatbot that can answer questions based *only* on the currently selected text in the textbook, providing source citations from the relevant chapter.
**Independent Test**: A user can select a passage of text, activate the chatbot, ask a question relevant to the selected text, and verify that the answer is accurate and only uses the selected text as context, including a citation.

### Backend Tasks
- [X] T017 [P] [US3] Set up FastAPI backend directory structure in backend/app/, including api/, core/, and services/.
- [X] T018 [US3] Implement RAG API endpoint (/api/rag/query) as defined in specs/001-ai-textbook-gen/contracts/rag-api.yaml in backend/app/api/rag.py.
- [X] T019 [P] [US3] Implement text chunking and embedding service using a suitable embedding model in backend/app/services/embedding_service.py.
- [X] T020 [P] [US3] Implement Qdrant client integration for vector storage and retrieval in backend/app/core/qdrant_client.py.
- [X] T021 [US3] Implement PostgreSQL/Neon client integration for chunk-to-source mapping in backend/app/core/postgres_client.py.
- [X] T022 [US3] Develop core RAG logic to retrieve relevant text chunks from Qdrant based on selected text, and generate answers using an LLM (Claude/OpenAI) in backend/app/services/rag_service.py.
- [X] T023 [US3] Ensure RAG logic restricts context to *only* selected text for answering questions.
- [X] T024 [US3] Implement logic to generate source citations (chapter_id, chapter_title, link, text_excerpt) for RAG answers.
- [X] T025 [US3] Write Pytest unit and integration tests for RAG API, embedding service, Qdrant, and PostgreSQL clients in backend/tests/.

### Frontend Integration Tasks
- [X] T026 [US3] Develop a React component for the RAG chatbot UI (e.g., src/components/Chatbot/index.js).
- [X] T027 [US3] Implement text selection listener and UI trigger for the chatbot in Docusaurus pages (e.g., src/theme/DocItem/Content/index.js).
- [X] T028 [US3] Integrate RAG chatbot React component into Docusaurus theme layout.
- [X] T029 [US3] Implement API calls from frontend to backend RAG API endpoint.
- [X] T030 [US3] Display chatbot answers and source citations in the UI.
- [X] T031 [US3] Ensure frontend handles cases where selected text is insufficient or irrelevant.
- [X] T032 [US3] Run end-to-end tests for RAG chatbot functionality, verifying selected text context and citations.

## Phase 6: User Story 4 - Urdu Translation (Priority: P3)

**Goal**: Textbook content available in Urdu, with translations produced by Claude and then human proofread.
**Independent Test**: A user can switch the textbook language to Urdu and verify that the content is translated, and a human reviewer can confirm the quality of the translation.

- [X] T033 [P] [US4] Configure Docusaurus for i18n (internationalization) to support Urdu (ur) locale.
- [X] T034 [US4] Develop a script or process to generate initial Urdu translations for all textbook chapters using Claude.
- [X] T035 [US4] Integrate Urdu translation files into the Docusaurus project structure.
- [X] T036 [US4] Implement a language switcher UI component in Docusaurus.
- [X] T037 [US4] Run Docusaurus build for Urdu locale and visually inspect translated content.
- [X] T038 [US4] Establish a process for human proofreading and updating Urdu translations.

## Phase 7: Polish & Cross-Cutting Concerns

- [X] T039 Implement robust error handling and logging for both frontend and backend components.
- [X] T040 Configure API keys as environment variables or GitHub Actions secrets for deployment (FR-010).
- [X] T041 Review and update `quickstart.md` with instructions for content generation and environment setup.
- [X] T042 Ensure all generated content adheres to Markdown (UTF-8) format and `NN-slug-title.md` naming convention (FR-011).
- [X] T043 Perform final end-to-end testing to verify all success criteria (SC-001 to SC-006).
- [X] T044 Update project README.md with comprehensive build, run, and usage instructions.

