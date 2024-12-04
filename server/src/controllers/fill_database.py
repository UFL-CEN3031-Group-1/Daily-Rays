import os
import pandas as pd
from google.cloud import firestore
from google.oauth2 import service_account
from datetime import datetime
from dotenv import load_dotenv

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

data = pd.read_csv('server/src/controllers/possitive_affirmation.csv', usecols=[0])
print(data.head())
data = data['Affirmation'].tolist()

''' Commented so it doesnt accidentally run
for i in range(len(data)):
  db.collection('affirmations').add({
    'message': data[i],
    'time-created': datetime.utcnow()
  })
'''