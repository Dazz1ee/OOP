from flask import Flask, jsonify, request
from flask_restful import Api, Resource
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
app = Flask(__name__)
api = Api(app)

tokenizer = AutoTokenizer.from_pretrained("./TrainModel")
model = AutoModelForCausalLM.from_pretrained("./TrainModel", use_cache=False)

@app.route("/", methods=['GET', 'POST'])
def hello():
    return "Test"

@app.route("/ggg", methods=['GET', 'POST'])
def ggg():
    generation_request = request.get_json()
    author = generation_request['author']
    text = generation_request['text']
    count = int(generation_request['count'])
    print(author)
    print(text)
    text = f"<s>{author} : " + text + " "
    input_ids = tokenizer.encode(text, return_tensors="pt").to("cpu")
    with torch.no_grad():
        out = model.generate(input_ids,
                             top_k=10,
                             top_p=0.85,
                             num_beams=count,
                             num_return_sequences=count,
                             do_sample=True,
                             no_repeat_ngram_size=3,
                             temperature=2.2,
                             early_stopping=True,
                             repetition_penalty=2.,
                             # length_penalty=1.0,
                             bos_token_id=tokenizer.bos_token_id,
                             eos_token_id=tokenizer.eos_token_id,
                             max_length=60
                             )
    ans = []
    for beam_output in out:
        ans.append(tokenizer.decode(beam_output, skip_special_tokens=True))
    return jsonify(ans)
    # return jsonify({
    #     "ans": text, "author": author
    # })

if __name__ == '__main__':
    app.run(debug=False, host="0.0.0.0")
