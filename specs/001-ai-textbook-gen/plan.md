# Implementation Plan: Physical AI & Humanoid Robotics Textbook Generation

**Branch**: `001-ai-textbook-gen` | **Date**: 2025-11-28 | **Spec**: [specs/001-ai-textbook-gen/spec.md](specs/001-ai-textbook-gen/spec.md)
**Input**: Feature specification from `/specs/001-ai-textbook-gen/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

This plan outlines the implementation for generating a comprehensive "Physical AI & Humanoid Robotics" textbook with 4 modules using Docusaurus, including a professional UI and an embedded RAG chatbot that answers questions based on selected text, with optional Urdu translation.

## Technical Context

**Language/Version**: TypeScript/JavaScript (for Docusaurus frontend), Python 3.10+ (for RAG backend)
**Primary Dependencies**: Docusaurus, React, FastAPI, Qdrant/Neon (for RAG vector database)
**Storage**: PostgreSQL/Neon (for RAG chunk -> source mapping)
**Testing**: Jest/React Testing Library (for frontend), Pytest (for backend)
**Target Platform**: Web (Docusaurus hosted application)
**Project Type**: Hybrid (web application with dedicated backend service for RAG)
**Performance Goals**: RAG chatbot accurately answers 95% of relevant queries from selected text within a reasonable response time (sub-second for typical queries). Textbook generation and Docusaurus build process completes without critical errors.
**Constraints**: RAG chatbot context MUST be restricted to user-selected text only. API keys MUST be stored as environment variables or GitHub Actions secrets. Textbook content MUST adhere to Markdown (UTF-8) with `NN-slug-title.md` filename pattern.
**Scale/Scope**: 4 complete textbook modules, embedded RAG chatbot, optional Urdu translation. Designed for classroom-ready content.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **1. Scope & Deliverables**: PASS - The feature aligns with primary and secondary deliverables, including 4 modules, RAG chatbot, and Urdu translation.
- **2. Project Structure & Paths**: PASS - Content will be generated directly into the `docs/` folder, respecting Docusaurus structure.
- **3. Book Modules (As Per Hackathon Course)**: PASS - The plan ensures generation of the specified 4 modules.
- **4. Quality Standards**: PASS - Each chapter will include learning objectives, explanations, exercises, quizzes, and references.
- **5. UI & Design Requirements**: PASS - The plan includes implementing a professional Docusaurus theme and responsive design.
- **6. Provenance & RAG policy**: PASS - RAG chatbot will restrict context to selected text and provide source citations, with chunk mapping stored in Postgres/Neon.
- **7. Content Source**: PASS - Content generation will be based on the hackathon course outline.
- **8. Security & Secrets**: PASS - API keys will be managed via environment variables or GitHub Actions secrets.
- **9. Localization**: PASS - Optional Urdu translation is planned.
- **10. Licensing & Attribution**: PASS - Licensing (CC BY-SA 4.0) and attribution will be handled during content generation.
- **11. Versioning & Releases**: PASS - Semantic versioning and GitHub tags will be applied to the textbook releases.
- **12. Minimal Acceptance Criteria**: PASS - The feature directly contributes to fulfilling all minimal acceptance criteria for the hackathon submission.
- **13. Workflow & Writing Rules**: PASS - Content generation will produce Markdown files directly in `docs/` for peer review.

## Project Structure

### Documentation (this feature)

```text
specs/001-ai-textbook-gen/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
# Option 1: Single project (DEFAULT)
# Existing Docusaurus project structure
.
├── docs/                 # Textbook content (generated Markdown files)
├── src/                  # Docusaurus React components/pages
├── sidebars.ts           # Docusaurus sidebar configuration (updated)
├── docusaurus.config.ts  # Docusaurus main configuration (updated for theme)
├── backend/              # RAG chatbot backend service (e.g., FastAPI)
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   └── services/
│   └── tests/
├── requirements.txt      # Python dependencies for backend
└── tests/                # Overall project tests
```

**Structure Decision**: The project will utilize an existing Docusaurus frontend structure for the textbook, with a new dedicated `backend/` directory for the RAG chatbot service. This hybrid approach allows for clear separation of concerns while integrating the RAG functionality directly into the textbook experience. This aligns with the constitution's emphasis on modularity and clear project paths.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |
