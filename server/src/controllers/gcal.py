# flask_server.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from gcsa.event import Event
from gcsa.google_calendar import GoogleCalendar
from gcsa.recurrence import Recurrence, DAILY, SU, SA
from dotenv import load_dotenv
from datetime import datetime, timedelta
import pytz
import random

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

def find_open_times():
    import random
from datetime import datetime, timedelta
from flask import jsonify

@app.route('/api/getmindful', methods=['GET'])
def get_open_time_slots():
    calendar = GoogleCalendar('gayatri.baskaran1@gmail.com')
    today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
    tomorrow = today + timedelta(days=1)
    events = calendar.get_events(time_min=today, time_max=tomorrow)
    tz = pytz.timezone('America/New_York')
    
    # Sort events by start time
    events = sorted(events, key=lambda event: event.start)

    # 10 am to 10 pm (or when button clicked)
    current_hour = datetime.now().hour 
    if (current_hour > 10):
        work_start = tz.localize(today.replace(hour=current_hour, minute=0))
    else:   
        work_start = tz.localize(today.replace(hour=10, minute=0))

    work_end = tz.localize(today.replace(hour=22, minute=0))

    open_slots = []
    last_end_time = work_start

    for event in events:
        event_start = event.start if event.start.tzinfo else tz.localize(event.start)
        event_end = event.end if event.end.tzinfo else tz.localize(event.end)

        if last_end_time < event.start:
            open_slots.append((last_end_time, event.start))
        last_end_time = max(last_end_time, event.end)

    if last_end_time < work_end:
        open_slots.append((last_end_time, work_end))

    potential_slots = []
    for start, end in open_slots:
        while (end - start) >= timedelta(minutes=10):  # Ensure at least 10S mins
            potential_slots.append(start)
            start += timedelta(minutes=10)  # Increment by 10 mins

    recommended_relaxation_slots = random.sample(potential_slots, min(2, len(potential_slots)))

    return jsonify({
        "status": "success",
        "open_slots": [(start.isoformat(), end.isoformat()) for start, end in open_slots],
        "recommended_relaxation_slots": [slot.isoformat() for slot in recommended_relaxation_slots]
    })

if __name__ == '__main__':
    app.run(debug=True, port=5050)