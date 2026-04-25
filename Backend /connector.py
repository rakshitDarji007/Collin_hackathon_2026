import os
import re
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as gemini

app = Flask(__name__)
CORS(app)

gemini.configure(api_key="AIzaSyB27HxpKxkFZU7QAbIskeMyxX5Zhs7_FtI")

model = gemini.GenerativeModel('gemini-1.5-flash')

def clean_json_response(raw_text):
    clean_text = re.sub(r'```json|```', '', raw_text).strip()
    return json.loads(clean_text)

@app.route('/reshuffle', methods=['POST'])
def reshuffle():
    try:
        data = request.json
        tasks = data.get('tasks', [])
        
        system_instruction = (
            "Return ONLY a raw JSON array of objects. "
            "Re-prioritize and reshuffle these tasks to avoid time overlaps. "
            "Required keys: id, title, time, priority."
        )
        
        prompt = f"{system_instruction}\n\nTask List: {json.dumps(tasks)}"
        
        response = model.generate_content(prompt)
        updated_tasks = clean_json_response(response.text)
        
        return jsonify({"status": "success", "tasks": updated_tasks})
    
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)