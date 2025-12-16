<!--
Sync Impact Report:
- Version change: 2.0.0 -> 2.1.0
- List of modified principles: None
- Added sections: ### Agent Validator (Question Relevance Check)
- Removed sections: None
- Templates requiring updates:
    - .specify/templates/plan-template.md: ✅ updated
    - .specify/templates/spec-template.md: ✅ updated
    - .specify/templates/tasks-template.md: ✅ updated
    - .specify/templates/commands/*.md: ✅ updated
- Follow-up TODOs if any placeholders intentionally deferred: None
-->
---
title: Project Constitution — Physical AI & Humanoid Robotics Textbook
version: 2.1.0

created_by: Ayesha
created_at: 2025-11-28
---

# Project Constitution
**Purpose:** This project is high-quality, modular, classroom-ready textbook banana hai — "Physical AI & Humanoid Robotics" — jise hackathon submission ke liye Spec-Kit Plus, Docusaurus aur Claude subagents ke sath integrate kiya jayega.

## 1. Scope & Deliverables
- Primary deliverable: Publicly hosted Docusaurus textbook with **4 complete modules** (as per hackathon course outline) + embedded RAG chatbot with "selected-text only" answering.
- Book must replace default Docusaurus content with professional Physical AI textbook.
- Secondary deliverables: Urdu translation, user personalization, Claude subagents.

## 2. Project Structure & Paths
- **Book Content Directory**: `/book_source/docs/` (Docusaurus docs folder - REPLACE DEFAULT CONTENT)
- **Chapter Files**: `/book_source/docs/01-introduction.md`, `/book_source/docs/02-ros2-fundamentals.md`, etc.
- **Sidebar Config**: `/book_source/sidebars.ts` (must reflect 4 modules from course outline)
- **Docusaurus Config**: `/book_source/docusaurus.config.ts` (professional theme for textbook)
- **ALL generated content goes directly into Docusaurus docs folder**

## 3. Book Modules (As Per Hackathon Course)
**Module 1: Introduction to Physical AI**
- Foundations of Physical AI and embodied intelligence
- Humanoid robotics landscape
- Sensor systems

**Module 2: ROS 2 Fundamentals**
- ROS 2 architecture and core concepts
- Nodes, topics, services, and actions
- URDF for humanoids

**Module 3: Gazebo & Simulation**
- Gazebo simulation environment
- Physics simulation and sensors
- Unity integration

**Module 4: NVIDIA Isaac Platform**
- Isaac Sim and Isaac ROS
- VSLAM and navigation
- Capstone project

## 4. Quality Standards (apply to every chapter / asset)
- Each chapter must include:
  1. Learning objectives (3–6 bulleted points).
  2. Core explanation (concepts + diagrams as images or code blocks).
  3. At least **2 hands-on exercises** with expected outputs.
  4. Short quiz (3 multiple-choice Qs) or reflection prompts.
  5. References / further reading (links).
- Tone: clear, classroom-friendly, mixture of conceptual explanation + practical examples.
- File format: Markdown (UTF-8). Each chapter = one `.md` file. Filename pattern: `NN-slug-title.md` (e.g., `01-intro.md`).

## 5. UI & Design Requirements
- Replace default Docusaurus UI with professional textbook theme
- Clean, academic color scheme
- Responsive sidebar navigation
- Professional typography and layout

## 6. Provenance & RAG policy
- All generated answers shown to users must include source citations (chunk metadata & link to chapter).
- If user selects text and requests an answer, backend **must** restrict context to only the selected text. No external context allowed.
- Store chunk -> source mapping in Postgres/Neon for auditability.

## 7. Content Source
- All content based on hackathon provided course outline
- Use exact modules and topics from "The Course Details" section
- Include hardware requirements and practical examples

## 8. Security & Secrets
- API keys (Claude, OpenAI, Qdrant, Neon) must be stored as environment variables or GitHub Actions secrets. No `.env` or secrets in repo.
- Access control: only maintainers have deploy token.

## 9. Localization
- Base language: English. Urdu translations are optional but recommended for accessibility.
- Translation approach: use Claude to produce draft translations, then human proofread before publishing.

## 10. Licensing & Attribution
- License: CC BY-SA 4.0 (recommended) — add `LICENSE` file at repo root.
- Any third-party figures/code must include attribution and license compatibility info.

## 11. Versioning & Releases
- Use semantic versioning for the textbook (e.g., v0.1.0 initial hackathon submission).
- Tag releases in GitHub.

## 12. Minimal Acceptance Criteria (must be true at submission)
1. Public GitHub repo + README with instructions.
2. Hosted Docusaurus textbook (link) with 4 complete modules.
3. FastAPI (or equivalent) RAG endpoint responding to queries.
4. Proof (screen recording or images) of "selected-text only" answer flow.
5. Professional UI replacing default Docusaurus theme.
6. Submission package: GitHub link + hosted link + demo video.


## 13. Workflow & Writing Rules
- Author writes directly in `/book_source/docs/NN-slug.md` (Docusaurus docs folder).
- Peer review via PR in `dev` branch; merge to `main` only after review.
- Use consistent frontmatter for metadata.



## RAG Chatbot Implementation

### Requirements
1. Build a RAG chatbot using:
   - OpenAI Agents SDK for chat interface
   - FastAPI for backend API
   - Qdrant Cloud for vector storage
   - Gemini Free API for embeddings

2. Chatbot features:
   - Answer questions about book content
   - Support text selection queries (user selects text, asks questions about it)
   - Embed into Docusaurus book


### Agent Validator (Question Relevance Check)

**Purpose**: Ensure chatbot only answers questions related to the Physical AI & Humanoid Robotics textbook content.

**Implementation Strategy**: Option A - Validate BEFORE RAG retrieval
```
User Question → Agent Validation → [If relevant] → RAG Process → Answer
  → [If irrelevant] → Polite Rejection Message
```

**Technology Stack**:
- **Framework**: OpenAI Agents SDK (using Gemini as backend via AsyncOpenAI)
- **Model**: Gemini 2.0 Flash (via OpenAI-compatible endpoint)
- **Integration Point**: FastAPI `/query` endpoint - validation happens first

**Agent Configuration**:
- Agent Name: "Question Validator"
- Agent Role: Determine if user question is related to textbook topics
- Response Types:
  - RELEVANT: Question is about Physical AI, ROS 2, Gazebo, Isaac Sim, humanoid robotics, sensors, URDF, SLAM, or related robotics topics
  - IRRELEVANT: Question is unrelated to textbook content (e.g., cooking, history, general knowledge)


**Rejection Message (when irrelevant):**
"I can only answer questions related to the Physical AI & Humanoid Robotics textbook. Please ask questions about topics covered in the book such as ROS 2, Gazebo, Isaac Sim, sensors, or humanoid robotics."

**Quality Checks**:
- Agent must respond within 2 seconds
- False rejection rate < 5% (don't reject valid questions)
- Log all validation decisions for monitoring


## File Structure
- `/book_source/` - Docusaurus book
- `/api/` - FastAPI backend
- `/scripts/` - Embedding generation scripts
- `/.env` - Environment variables



## Technical Stack
- **Embeddings**: FastEmbed (fast, local, token-efficient)
- **Vector DB**: Qdrant Cloud (Free Tier)
- **LLM**: Google Gemini API (Free)
- **Backend**: FastAPI
- **Frontend**: React component embedded in Docusaurus
- **Agent Framework**: OpenAI Agents SDK pattern



## Key Constraints
1. NO paid APIs (OpenAI, Anthropic) - Use Gemini only
2. Use FastEmbed for embeddings (not OpenAI embeddings)
3. All work via Claude CLI - autonomous setup
4. Support text selection-based Q&A
5. Deploy-ready for Vercel/GitHub Pages


### Environment Variables Required
- QDRANT_URL=
- QDRANT_API_KEY=
- CLUSTER_ID=
- GEMINI_API_KEY=











