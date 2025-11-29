# Quickstart Guide: Physical AI & Humanoid Robotics Textbook Generation

This guide provides instructions to quickly set up and run the Physical AI & Humanoid Robotics textbook generation and the integrated RAG chatbot.

## 1. Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (LTS version) & **npm** (comes with Node.js) for Docusaurus frontend.
- **Python 3.10+** & **pip** for the RAG chatbot backend.
- **Git** for cloning the repository.
- **Docker** (optional, for easier Qdrant/PostgreSQL setup).

## 2. Setup

### 2.1. Clone the Repository

```bash
git clone [repository-url]
cd physical-ai-humanoid-robotis
```

### 2.2. Configure Environment Variables

Create a `.env` file in the root of the project for local development (this file should *not* be committed to Git). Populate it with your API keys:

```dotenv
CLAUDE_API_KEY="your_claude_api_key"
OPENAI_API_KEY="your_openai_api_key" # If using OpenAI models
QDRANT_HOST="localhost"
QDRANT_PORT="6333"
POSTGRES_HOST="localhost"
POSTGRES_PORT="5432"
POSTGRES_USER="your_pg_user"
POSTGRES_PASSWORD="your_pg_password"
POSTGRES_DB="rag_citations"
```

For production deployments, these should be configured as environment variables or GitHub Actions secrets as per `FR-010`.

### 2.3. Docusaurus Frontend Setup

Navigate to the project root and install Docusaurus dependencies:

```bash
npm install
```

### 2.4. RAG Chatbot Backend Setup

Navigate to the `backend/` directory and install Python dependencies:

```bash
cd backend
pip install -r requirements.txt
```

## 3. Running the Application

### 3.1. Start Database Services (Qdrant & PostgreSQL)

If using Docker, you can start the databases with `docker-compose` (assuming a `docker-compose.yml` is provided for the backend services):

```bash
docker-compose up -d
```

Alternatively, ensure your Qdrant and PostgreSQL instances are running and accessible as configured in your `.env` file.

### 3.2. Generate Textbook Content

(This step assumes a content generation script will be available, e.g., in a `scripts/` directory or as a CLI tool).

```bash
# Example: python scripts/generate_textbook.py
# This script will populate the docs/ folder based on the course outline.
```

### 3.3. Run Docusaurus Frontend

From the project root:

```bash
npm start
```

This will open the textbook in your browser, typically at `http://localhost:3000`.

### 3.4. Run RAG Chatbot Backend

From the `backend/` directory:

```bash
# Assuming FastAPI application is in app/main.py
uvicorn app.main:app --reload
```

This will start the RAG API server, typically at `http://localhost:8000`.

## 4. Using the RAG Chatbot

Once both the Docusaurus frontend and RAG backend are running:

1.  Navigate to any chapter in the Docusaurus textbook.
2.  Select a portion of the text that you want to query.
3.  (An interactive UI element for the chatbot will be available, e.g., a button or a sidebar).
4.  Enter your question into the chatbot.
5.  The chatbot will provide an answer based *only* on your selected text and include source citations.

## 5. Next Steps

- Explore the generated textbook content.
- Test the RAG chatbot with various selected texts and queries.
- For Urdu translation, follow the instructions in the main documentation.
