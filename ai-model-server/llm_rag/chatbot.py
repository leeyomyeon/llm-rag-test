# LLM + RAG
from openai import OpenAI
from collections import deque
from rag import create_collection

class Message_manager:
  def __init__(self):
    self._system_msg = {"role": "system", "content": ""}
    self.queue = deque(maxlen=10)  # 최대 10개 대화 저장

  def create_msg(self, role, content):
    return {"role": role, "content": content}

  def system_msg(self, content):
    self._system_msg = self.create_msg("system", content)

  def get_chat(self):
    return [self._system_msg] + list(self.queue)

  def set_retrived_docs(self, docs):
    self.retrieved_docs = docs

  def generate_prompt(self, retrieved_docs):
    docs = "\n".join(retrieved_docs)

    prompt = [msgManager._system_msg,{
      "role": "system",
      "content": f"문서 내용: {docs}\n질문에 대한 답변은 문서 내용을 기반으로 정확히 제공하시오.",
    }]

    return prompt

client = OpenAI(
  base_url="http://127.0.0.1:1234/v1",
  api_key="not-needed"  # LM Studio does not require an API key
)

def retrieve_docs(query, collection, embedder, top_k=2):
    query_embedding = embedder.encode(query, convert_to_tensor=False)
    results = collection.query(query_embeddings=[query_embedding], n_results=top_k)
    
    if not results["metadatas"]:  # 검색 결과가 없는 경우
        return ["관련 문서를 찾을 수 없습니다."]
    
    docs = [doc["text"] for doc in results["metadatas"][0]]
    return docs

def generate_answer(user_input, retrieved_docs):
  # 스트리밍으로 답변 생성
  print("답변: ", end="", flush=True)
  
  msg = msgManager.generate_prompt(retrieved_docs)
  msg.append({"role": "user", "content": user_input})
  result = client.chat.completions.create(
    model="google/gemma-3-1b",
    messages=msg
  )

  return result.choices[0].message.content


msgManager = Message_manager()
msgManager.system_msg(
  "user'의 'content'에 대해 상세히 답변한다."
)

embedder, collection = create_collection()

while True:
  user_input = input("질문을 입력하세요: ")
  if user_input == 'exit':
    print("프로그램을 종료합니다.")
    break
  
  retrieved_docs = retrieve_docs(user_input, collection, embedder, top_k=2)
  answer = generate_answer(user_input, retrieved_docs)
  print(answer)