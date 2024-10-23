import os
import torch
from flask import Flask, request, jsonify
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification
from flask_cors import CORS

app = Flask(__name__)

# Initialize CORS
CORS(app, origins=["http://localhost:3000"])  # Adjust as needed

# Determine the directory where the current script is located
script_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the path to the model file relative to the script directory
model_path = os.path.join(script_dir, 'distilbert.pth')

# Load the tokenizer and model
tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased')

model = DistilBertForSequenceClassification.from_pretrained(
    'distilbert-base-uncased',
    num_labels=3
)

# Load the model state from the relative path
model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
model.eval()

@app.route('/api/', methods=['GET'])
def home():
    return "Hello from the API!"

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        if 'input' not in data:
            return jsonify({'error': "Missing 'input' field in JSON payload."}), 400

        inputs = tokenizer(
            data['input'],
            return_tensors='pt',
            truncation=True,
            padding=True,
            max_length=128
        )

        with torch.no_grad():
            outputs = model(**inputs)
            logits = outputs.logits

        predicted_class = torch.argmax(logits, dim=1).item()

        label_map = {0: 'negative', 1: 'neutral', 2: 'positive'}
        prediction = label_map.get(predicted_class, "unknown")

        # TODO: Send this to the database

        return jsonify({'prediction': prediction})

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
