from flask import Flask, jsonify
from flask import request as r
import requests
import json

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def hello():
    return "hello"

@app.route('/get', methods=['GET', 'POST'])
def hello_world():
    gen = r.get_json()
    data = {"author": gen["author"], "text": gen["text"]}
    headers = {"Content-Type": 'application/json'}
    print(data)
    url = "http://127.0.0.1:5000/ggg"
    responce = requests.post(url, data=json.dumps(data), headers=headers).json()
    print(responce)
    return jsonify({"ddd": responce["ans"], "rrr": responce["author"]})

if __name__ == '__main__':
    app.run(debug=False, port=3000)
