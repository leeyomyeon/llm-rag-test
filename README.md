# [OpenAI/LM Studio] LLM + RAG를 이용해 웹 챗봇 어플리케이션 만들기

## how to install

```
Python version=>3.11

* LMStudio
https://lmstudio.ai/docs/app/basics/download-model
- LM Studio에서 LLM 모델 받기

pip install OpenAI
pip install lmstudio

* cudart64_110.dll 에러 발생 시 CUDA Toolkit 설치
https://developer.nvidia.com/cuda-downloads?target_os=Windows&target_arch=x86_64&target_version=10&target_type=exe_network

* LLM + RAG 작업 시 필요한 패키지 설치(ChromaDB + llama-index)
pip install openai llama-index llama-index-vector-stores-chroma
pip install pymupdf4llm sentence-transformers chromadb ollama langchain
```

LM Studio를 설치하고 시작합니다
<img width="1200" height="760" alt="img1 daumcdn" src="https://github.com/user-attachments/assets/cf90ef50-cfad-4b2d-948c-a6fd5933272a" />
위와 같은 창이 뜨는데 여기서 필요한 모델을 다운받습니다. 컴퓨터 사양에 맞춰 최적의 모델을 선택해주기도 합니다.

자신의 사양보다 높은 모델을 불러오면 에러가 뜨니 미리 컴퓨터 사양과 모델이 요구하는 사양을 확인합니다.
여기서는 gemma-3-1b를 설치합니다
<img width="1089" height="753" alt="img1 daumcdn" src="https://github.com/user-attachments/assets/8e5887ab-d1c7-412b-894b-7ab7077d7a8f" />

모델이 설치되고 나면 왼쪽의 폴더 모양 탭에서 확인 가능합니다 
<img width="1002" height="381" alt="img1 daumcdn" src="https://github.com/user-attachments/assets/2a10bde5-e6ef-4376-8f34-abfd36376f84" />

터미널로 들어가 상단에 모델 선택을 눌러 방금 다운받은 gemma-3-1b를 선택합니다
<img width="709" height="236" alt="img1 daumcdn" src="https://github.com/user-attachments/assets/06ba2d84-3bda-44ee-8375-ce86cf883ace" />

그리고 서버를 작동시키면 READY와 함께 로컬에서 접속가능한 주소가 나옵니다.
<img width="1062" height="495" alt="img1 daumcdn" src="https://github.com/user-attachments/assets/5f2101fa-acee-4f9c-a464-ea190c3c96c4" />

파이썬 파일을 하나 만들어서 모델 서버를 불러보겠습니다.
```python
from openai import OpenAI

client = OpenAI(
    base_url="http://127.0.0.1:1234/v1",
    api_key="not-needed"  # LM Studio does not require an API key
)

result = client.chat.completions.create(
    model="google/gemma-3-1b",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Explain what MXFP4 quantization is."}
    ]
)

print(result.choices[0].message.content)
```

그러면 LM Studio 콘솔창에서 아래와 같이 작동중인 메세지가 뜨고
<img width="691" height="333" alt="img1 daumcdn" src="https://github.com/user-attachments/assets/6db417d6-2341-4dc8-a335-31388162dcc5" />

콘솔 창에는 아래와 같이 질문에 대한 답변이 정상적으로 출력됩니다
<img width="923" height="484" alt="img1 daumcdn" src="https://github.com/user-attachments/assets/a6943045-0c19-4acc-b535-3437e1f8d0cf" />

## LLM + RAG 구현(ChromaDB + llama)

pymupdf4llm은 python에서 pdf파일을 llm에 쓰기 쉽게 하기 위한 파싱 도구입니다.
langchain의 text_splitter를 이용해 텍스트를 청크단위로 쪼개줍니다.
```python
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
```
pdf문서를 텍스트화하여 chromadb에 저장합니다.
```python
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
```
정수기 사용설명서를 넣고 정수기 주의사항을 질문했습니다.
<img width="740" height="312" alt="img1 daumcdn" src="https://github.com/user-attachments/assets/8f71c608-fc45-462f-9156-731d11a888d3" />

## Front-End
```
react + redux-saga 기반
UI : react-bootstrap
Form 관리 : react-hook-form

* react-bootstrap 공식문서
https://react-bootstrap.github.io/docs/getting-started/introduction
* react-hook-form 공식문서
https://react-hook-form.com/docs

* 패키지 설치
npm install

* web server start
cd front-page
npm run start
```

## Back-End Server 붙이기

위에 만들었던 LLM을 부르는 파이썬 코드를 Flask 서버로 변경합니다.
```
pip install flask
pip install flask-cors
```

터미널 경로를 모델이 있는 파일 경로로 옮깁니다
```
cd ai-model-server/llm_rag
```

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
  return "Welcome to the AI Model Server!"

if __name__ == '__main__':
  app.run(debug=True)
```
위 코드는 Flask 서버를 동작시킬 수 있는 기본 코드입니다.

```
@app.route('/chatbot', methods=['GET', 'POST'])
def chatbot():
  if request.method == 'POST':
    data = decode_request(request)
    return get_chat_message(data['message'])
```
위와 같은 방법으로 라우트를 지정하면 http://localhost:5000/chatBot 으로 서버에 접근할 수 있습니다.

서버를 동작시킬땐 
```
python main_server.py
```
명령어를 입력합니다.

<img width="1027" height="379" alt="img1 daumcdn" src="https://github.com/user-attachments/assets/4ef8b129-7648-41b8-888e-5b0761d58f50" />
API 테스트 도구로 테스트를 해보면 정상적으로 응답이 옵니다.

미리 만들어 둔 웹 서버를 연결하고 테스트를 해봅니다.

<img width="1163" height="936" alt="img1 daumcdn" src="https://github.com/user-attachments/assets/70a7d39b-7021-4cff-89a4-236e790feb1c" />





