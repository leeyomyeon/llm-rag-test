from openai import OpenAI

client = OpenAI(
  base_url="http://127.0.0.1:1234/v1",
  api_key="not-needed"  # LM Studio does not require an API key
)

def get_llm_chat_message(message):
  result = client.chat.completions.create(
    model="google/gemma-3-1b",
    messages=[
      {"role": "system", "content": "당신은 대학 교수이며 질문에 대해 한국어로 상세히 답변합니다."},
      {"role": "user", "content": message}
    ]
  )
  return result.choices[0].message.content
