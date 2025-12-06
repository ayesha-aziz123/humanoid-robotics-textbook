from qdrant_client import QdrantClient
client = QdrantClient(path="../qdrant-db")

client.count(collection_name="physical_ai_book")
