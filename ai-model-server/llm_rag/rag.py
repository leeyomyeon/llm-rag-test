from sentence_transformers import SentenceTransformer
import chromadb
from util import load_pdf, split_text

import os
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(BASE_DIR, "docs", "sample.pdf")
print(file_path)
def create_collection():
  client = chromadb.PersistentClient(path="./chroma_db")
  embedder = SentenceTransformer("intfloat/multilingual-e5-small")
  collection = client.get_or_create_collection(name="rag_collection",  metadata={"hnsw:space": "cosine"} )

  print("문서 로드 및 임베딩 시작...")
  raw_text = load_pdf(file_path)
  chunks = split_text(raw_text)
  embeddings = embedder.encode(chunks, convert_to_tensor=False)

  for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
    collection.add(
      ids=[f"chunk_{i + 1}"],
      embeddings=[embedding.tolist()],
      metadatas=[{"text": chunk}],
    )
  
  return embedder, collection