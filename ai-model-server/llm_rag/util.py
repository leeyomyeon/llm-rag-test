import pymupdf4llm
from langchain.text_splitter import RecursiveCharacterTextSplitter

def load_pdf(file_path):
  pdf_data = pymupdf4llm.to_markdown(file_path)
  text = "".join(pdf_data)
  print("pdf 파일 업로드 중...")
  return text

def split_text(text):
  text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=150)
  return text_splitter.split_text(text)