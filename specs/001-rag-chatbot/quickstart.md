# Quickstart Guide: RAG Chatbot System

**Feature Branch**: `001-rag-chatbot` | **Date**: 2025-11-30

This guide outlines the steps to quickly set up and run the RAG Chatbot system for the Physical AI Docusaurus book.

## 1. Environment Setup

Before running the system, ensure you have the following prerequisites installed:

- **Python 3.11+**: For the FastAPI backend and embedding generation scripts.
- **Node.js & npm (or yarn)**: For the Docusaurus frontend and React chatbot component.
- **Poetry (recommended)**: For Python dependency management.

### 1.1. Clone the Repository

```bash
git clone <repository-url>
cd physical-ai-humanoid-robotics
git checkout 001-rag-chatbot
```

### 1.2. Environment Variables

Create a `.env` file in the root directory of the project with the following variables. Replace the placeholder values with your actual credentials:

```env
QDRANT_URL=https://0e797b5c-5f88-4622-947b-beaab05d3594.sa-east-1-0.aws.cloud.qdrant.io
QDRANT_API_KEY=YOUR_QDRANT_API_KEY
CLUSTER_ID=0e797b5c-5f88-4622-947b-beaab05d3594
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

**Note**: For production deployments, these environment variables should be managed securely (e.g., GitHub Actions secrets, Kubernetes secrets) and not hardcoded or committed to version control.

## 2. Backend Setup (FastAPI & Embeddings)

Navigate to the `api/` directory to set up the Python backend.

```bash
cd api
poetry install    # or pip install -r requirements.txt if not using poetry
```

### 2.1. Generate Embeddings and Populate Qdrant

This step will scan the markdown files, generate embeddings using FastEmbed, and upload them to your Qdrant Cloud instance. Ensure your `QDRANT_URL` and `QDRANT_API_KEY` are correctly set in the `.env` file.

```bash
cd ../scripts
poetry run python generate_embeddings.py # or python generate_embeddings.py
```

**Note**: Check the console output for detailed logs and error messages during the embedding generation and Qdrant population process.

### 2.2. Run the FastAPI Backend

Start the FastAPI application. It will be accessible at `http://localhost:8000`.

```bash
cd ../api
poetry run uvicorn src.main:app --reload --port 8000 # or uvicorn src.main:app --reload --port 8000
```

## 3. Frontend Setup (Docusaurus & React Chatbot)

Navigate to the `book_source/` directory to set up the Docusaurus frontend.

```bash
cd book_source
npm install # or yarn install
```

### 3.1. Start the Docusaurus Development Server

This will launch the Docusaurus website with the embedded React chatbot. The site will typically be available at `http://localhost:3000`.

```bash
npm start # or yarn start
```

## 4. Interacting with the Chatbot

Once both the backend and frontend are running:

- Open your web browser to `http://localhost:3000`.
- The React chatbot component should be visible within the Docusaurus UI.
- You can type questions into the chatbot to query the book content.
- You can also select text within the Docusaurus book and interact with the chatbot for contextual answers.

Enjoy using your RAG Chatbot system!