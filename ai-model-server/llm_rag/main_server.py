from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot import get_chat_message
import json
app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "http://10.122.118.201:3000"])  # CORS 설정

class ResponseData :
  def __init__(self):
    self.payload = {}
    self.resultCode = 1
    self.message = ""

  def setValue(self, target, value):
    self.payload[target] = value
  
  def setMessage(self, message):
    self.message = message
    
  def sendData(self):
    return jsonify({
      "resultCode": self.resultCode,
      "message": self.message,
      "payload": self.payload
    })
  
def decode_request(request):
  return json.loads(request.data.decode('utf-8'))

@app.route('/')
def home():
  return "Welcome to the AI Model Server!"

@app.route('/chat', methods=['POST'])
def chat():
  data = decode_request(request)
  print("사용자 질문 : ", data['message'])
  resData = ResponseData()
  resData.setValue("message", get_chat_message(data['message']))
  return resData.sendData()

if __name__ == '__main__':
  app.run(debug=False, use_reloader=False)
