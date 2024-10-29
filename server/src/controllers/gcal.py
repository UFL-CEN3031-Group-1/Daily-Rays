# flask_server.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from gcsa.event import Event
from gcsa.google_calendar import GoogleCalendar
from gcsa.recurrence import Recurrence, DAILY, SU, SA
from dotenv import load_dotenv
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)
port = 5050

@app.after_request
def after_request(response):
    allowed_origins = ['http://localhost:3000', 'http://127.0.0.1:3000', 
                      'http://localhost:8000', 'http://127.0.0.1:8000']
    origin = request.headers.get('Origin')
    if origin in allowed_origins:
        response.headers.add('Access-Control-Allow-Origin', origin)
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

@app.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "Flask server is running!"})

@app.route('/api/getcalendar', methods=['GET'])
def get_calendar():
    try:
        calendar = GoogleCalendar('gayatri.baskaran1@gmail.com')    
        today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
        tomorrow = today + timedelta(days=1)

        events_list = []
        for event in calendar.get_events(time_min=today, time_max=tomorrow):
            event_dict = {
                'summary': event.summary if hasattr(event, 'summary') else None,
                'description': event.description if hasattr(event, 'description') else None,
                'start': event.start.isoformat() if hasattr(event, 'start') else None,
                'end': event.end.isoformat() if hasattr(event, 'end') else None,
                'location': event.location if hasattr(event, 'location') else None
            }
            events_list.append(event_dict)
        return jsonify({
            "status": "success", 
            "events": events_list
        })
    except Exception as e:
        print(f"Error u suck: {str(e)}")  # Debug print
        return jsonify({
            "status": "error",
            "message": str(e),
        }), 400

if __name__ == '__main__':
    app.run(debug=True, port=5050)