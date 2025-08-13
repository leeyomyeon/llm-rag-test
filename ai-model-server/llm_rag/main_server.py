from flask import Flask, request
from chatbot import get_chat_message
import json

app = Flask(__name__)

def decode_request(request):
  return json.loads(request.data.decode('utf-8'))

@app.route('/')
def home():
  return "Welcome to the AI Model Server!"

@app.route('/chatbot', methods=['GET', 'POST'])
def chatbot():
  if request.method == 'POST':
    data = decode_request(request)
    return get_chat_message(data['message'])

if __name__ == '__main__':
  app.run(debug=False, use_reloader=False)
