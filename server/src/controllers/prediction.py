import os
import torch
from flask import Flask, request, jsonify
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification
from flask_cors import CORS
from google.cloud import firestore
from google.oauth2 import service_account
from datetime import datetime
from dotenv import load_dotenv

app = Flask(__name__)

# Initialize CORS
CORS(app, resources={r"/api/*": {"origins": "http://localhost:8000"}})  # Adjust as needed

load_dotenv()

service_account_info = {
  "type": "service_account",
  "project_id": os.getenv("FIREBASE_PROJECT_ID"),
  "private_key_id": os.getenv("FIREBASE_PRIVATE_KEY_ID"),
  "private_key": os.getenv("FIREBASE_PRIVATE_KEY").replace('\\n', '\n'),
  "client_email": os.getenv("FIREBASE_CLIENT_EMAIL"),
  "client_id": os.getenv("FIREBASE_CLIENT_ID"),
  "auth_uri": os.getenv("FIREBASE_AUTH_URI"),
  "token_uri": os.getenv("FIREBASE_TOKEN_URI"),
  "auth_provider_x509_cert_url": os.getenv("FIREBASE_AUTH_PROVIDER_X509_CERT_URL"),
  "client_x509_cert_url": os.getenv("FIREBASE_CLIENT_X509_CERT_URL")
}

creds = service_account.Credentials.from_service_account_info(service_account_info)

db = firestore.Client(credentials=creds, project=os.getenv("FIREBASE_PROJECT_ID"))

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

@app.route('/api/predict', methods=['POST', 'GET'])
def predict():
    if request.method == 'GET':
        return jsonify({'error': 'Please use POST to submit the prediction request.'}), 405
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

        if prediction == 'positive':
          db.collection('affirmations').add({
            'message': data['input'],
            'time-created': datetime.utcnow()
          })
          return jsonify({'prediction': prediction})
        else:
          return jsonify({'error': 'Please enter a new affirmation'})
        

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5050)
