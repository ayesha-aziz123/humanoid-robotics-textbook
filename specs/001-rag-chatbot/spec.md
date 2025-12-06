# Feature Specification: RAG Chatbot System

**Feature Branch**: `001-rag-chatbot`
**Created**: 2025-11-30
**Status**: Draft
**Input**: User description: "/sp.specify Implement a complete RAG chatbot system for the Physical AI Docusaurus book with these requirements:

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
- QDRANT_URL=
- QDRANT_API_KEY=
- CLUSTER_ID=
- GEMINI_API_KEY=

CRITICAL:NO OpenAI API usage (paid) - Use FastEmbed locally for embeddings - Use Gemini API for text generation - Collection auto-creation if not exists - Handle rate limits gracefully - CORS for localhost:3000 Start by testing Qdrant connection, then create collection, generate embeddings, build API, and finally create frontend component."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Ask a Question to the Chatbot (Priority: P1)

A user wants to get answers to their questions about the Physical AI Docusaurus book content by typing a query into the chatbot.

**Why this priority**: This is the core functionality of a RAG chatbot, providing immediate value by answering user queries.

**Independent Test**: Can be fully tested by deploying the backend and frontend components, then submitting text queries through the chatbot UI and verifying relevant responses.

**Acceptance Scenarios**:

1. **Given** the chatbot UI is loaded and the Qdrant collection is populated with embeddings, **When** the user types a question into the chatbot and submits it, **Then** the chatbot displays a relevant answer based on the book's content.
2. **Given** the chatbot UI is loaded and the Qdrant collection is populated with embeddings, **When** the user types a question into the chatbot and submits it, **Then** the chatbot provides a concise and accurate response, citing relevant sections if applicable.

---

### User Story 2 - Query Based on Selected Text (Priority: P1)

A user wants to get answers about a specific piece of text they have selected within the Docusaurus book.

**Why this priority**: This feature enhances user experience by allowing contextual queries, making it a critical interaction method.

**Independent Test**: Can be fully tested by deploying the backend and frontend components, then selecting text in the Docusaurus book and initiating a query from the chatbot UI to verify contextual responses.

**Acceptance Scenarios**:

1. **Given** the chatbot UI is loaded and the user has selected text within the Docusaurus book, **When** the user initiates a query based on the selected text, **Then** the chatbot provides a relevant answer focused on the context of the selected text.

---

### User Story 3 - Initializing the RAG System (Priority: P2)

An administrator or developer needs to set up the RAG system by scanning markdown files, generating embeddings, and populating the Qdrant collection.

**Why this priority**: This is a foundational step for the chatbot to function, but it's not a direct user-facing feature.

**Independent Test**: Can be tested by running the embedding generation script, verifying the Qdrant collection "physical_ai_book" is created (if not exists) and populated with 384-dimensional vectors derived from the markdown files.

**Acceptance Scenarios**:

1. **Given** markdown files exist in `book_source/docs/` and environment variables are configured, **When** the embedding generation script is executed, **Then** the Qdrant collection "physical_ai_book" is created (if it doesn't exist) with 384 dimensions.
2. **Given** markdown files exist in `book_source/docs/` and **When** the embedding generation script is executed, **Then** all markdown files are scanned, and their contents are converted into FastEmbed embeddings and stored in the "physical_ai_book" Qdrant collection.

---

### Edge Cases

- What happens when no relevant information is found in Qdrant for a given query? The chatbot should indicate that it cannot find a relevant answer or suggest rephrasing the question.
- How does the system handle very long user queries or selected text? The system should process them efficiently and provide a relevant response without truncation or errors, potentially by summarizing the query or focusing on key terms.
- How does the system handle rate limits from the Google Gemini API? The system should implement graceful handling mechanisms (e.g., retries with exponential backoff).
- What happens if Qdrant Cloud connection fails during embedding generation or querying? The system should provide informative error messages and attempt graceful recovery or retry mechanisms.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST scan all markdown files located in `book_source/docs/`.
- **FR-002**: The system MUST generate embeddings for the scanned markdown files using FastEmbed (BAAI/bge-small-en-v1.5).
- **FR-003**: The system MUST create a Qdrant collection named "physical_ai_book" with 384 dimensions if it does not already exist.
- **FR-004**: The system MUST store the generated embeddings in the "physical_ai_book" Qdrant collection.
- **FR-005**: The system MUST provide a FastAPI backend with CORS enabled for `localhost:3000`.
- **FR-006**: The FastAPI backend MUST expose a POST `/query` endpoint for standard RAG Q&A.
- **FR-007**: The FastAPI backend MUST expose a POST `/query-selection` endpoint to answer questions based on user-selected text.
- **FR-008**: The system MUST use the Google Gemini API for Large Language Model (LLM) responses.
- **FR-009**: The system MUST include a React chatbot component embeddable within Docusaurus.
- **FR-010**: The React chatbot component MUST support sending standard text queries to the backend.
- **FR-011**: The React chatbot component MUST support sending selected text queries to the backend.
- **FR-012**: The system MUST auto-detect and use existing `.env` file for configuration, including Qdrant and Gemini API credentials.
- **FR-013**: The system MUST NOT use the OpenAI API.
- **FR-014**: The system MUST handle Google Gemini API rate limits gracefully.


### Key Entities *(include if feature involves data)*

- **Markdown File Content**: The text content extracted from `.md` files in `book_source/docs/`.
- **Embedding**: A 384-dimensional vector representation of a chunk of markdown text, generated by FastEmbed.
- **Qdrant Collection "physical_ai_book"**: A vector database collection storing embeddings and their associated metadata (e.g., source file path, original text chunk).
- **User Query**: Text input from the user, either typed directly or derived from selected text.
- **LLM Response**: Text generated by the Google Gemini API based on the retrieved context and user query.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The RAG chatbot provides relevant answers to 90% of user queries based on the book content.
- **SC-002**: Standard RAG Q&A queries return a response within 3 seconds for 95% of requests.
- **SC-003**: Selected text queries return a response within 3 seconds for 95% of requests.
- **SC-004**: The embedding generation process successfully processes all markdown files in `book_source/docs/` and populates the Qdrant collection without errors.
- **SC-005**: The Qdrant collection "physical_ai_book" is successfully created with 384 dimensions and remains accessible.
- **SC-006**: The chatbot UI is successfully embedded into Docusaurus and functions as expected.
- **SC-007**: No calls are made to the OpenAI API throughout the system's operation.
- **SC-008**: The system successfully handles Google Gemini API rate limits without crashing or severe degradation of service, ensuring continuity of responses.

