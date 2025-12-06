import os
import logging
from dotenv import load_dotenv
from qdrant_client import QdrantClient, models
from fastembed import TextEmbedding



# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Load environment variables
load_dotenv()

QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
COLLECTION_NAME = "physical_ai_book"
VEC_DIM = 384

def scan_markdown_files(docs_path="../book_source/docs/"):
    markdown_files = []
    logging.info(f"Scanning markdown files in {docs_path}...")
    try:
        for root, _, files in os.walk(docs_path):
            for file in files:
                if file.endswith(".md"):
                    markdown_files.append(os.path.join(root, file))
        logging.info(f"Found {len(markdown_files)} markdown files.")
    except Exception as e:
        logging.error(f"Error scanning markdown files: {e}")
    return markdown_files

def generate_embeddings(text_chunks):
    logging.info("Generating embeddings with FastEmbed...")
    try:
        model = TextEmbedding(model_name="BAAI/bge-small-en-v1.5")
        embeddings = list(model.embed(text_chunks))
        logging.info(f"Generated {len(embeddings)} embeddings.")
        return embeddings
    except Exception as e:
        logging.error(f"Error generating embeddings: {e}")
        return []

def main():
    markdown_files = scan_markdown_files()
    all_text_chunks = []
    file_metadata = []

    if not markdown_files:
        logging.warning("No markdown files found to process. Exiting.")
        return

    for file_path in markdown_files:
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
                chunks = [chunk.strip() for chunk in content.split("\n\n") if chunk.strip()]
                for chunk in chunks:
                    all_text_chunks.append(chunk)
                    file_metadata.append({"source_file": file_path, "text_chunk": chunk})
        except Exception as e:
            logging.error(f"Error reading file {file_path}: {e}")
            continue

    if not all_text_chunks:
        logging.warning("No markdown content found after chunking. Exiting.")
        return

    embeddings = generate_embeddings(all_text_chunks)
    if not embeddings:
        logging.error("Embedding generation failed. Exiting.")
        return

    logging.info(f"Connecting to Qdrant at {QDRANT_URL}...")
    try:
        client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)

        # Create collection if it doesn't exist
        try:
            client.get_collection(collection_name=COLLECTION_NAME)
            logging.info(f"Collection \"{COLLECTION_NAME}\" already exists.")
        except Exception:
            logging.info(f"Collection \"{COLLECTION_NAME}\" not found, creating...")
            client.create_collection(
                collection_name=COLLECTION_NAME,
                vectors_config=models.VectorParams(size=VEC_DIM, distance=models.Distance.COSINE),
            )
            logging.info(f"Collection \"{COLLECTION_NAME}\" created.")

        # Upload embeddings to Qdrant
        points = []
        for i, embedding in enumerate(embeddings):
            points.append(
                models.PointStruct(
                    id=i,
                    vector=embedding,
                    payload=file_metadata[i] # Associate metadata with each embedding
                )
            )

        client.upsert(collection_name=COLLECTION_NAME, points=points, wait=True)
        logging.info(f"Uploaded {len(points)} points to collection \"{COLLECTION_NAME}\".")

    except Exception as e:
        logging.error(f"Error interacting with Qdrant: {e}")
        return

if __name__ == "__main__":
    main()
