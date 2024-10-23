import torch
from flask import Flask, request, jsonify
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification

app = Flask(__name__)

model_path = 'distilbert.pth'
tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased')

model = DistilBertForSequenceClassification.from_pretrained('distilbert-base-uncased', num_labels=3)
model.load_state_dict(torch.load(model_path))
model.eval()

@app.route('/')
def home():
  return "Hello"

@app.route('/predict', methods=['POST'])
def predict():
  try:
    data = request.get_json()
    inputs = tokenizer(data['input'], return_tensors='pt', truncation=True, padding=True, max_length=128)
    
    with torch.no_grad():
      outputs = model(**inputs)
      logits = outputs.logits

    predicted_class = torch.argmax(logits, dim=1).item()

    label_map = {0: 'negative', 1: 'neutral', 2: 'positive'}
    prediction = label_map[predicted_class]

    # NEED TO SEND THIS TO DATABASE
    return jsonify({'prediction': prediction})

  except Exception as e:
    return jsonify({'error': str(e)}), 400
  
if __name__ == '__main__':
  app.run(debug=True)