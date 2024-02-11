from flask import Flask, session, request, jsonify,redirect,url_for
import json
import os
app = Flask(__name__)

notes = []

app.secret_key = os.urandom(24)

@app.route('/', methods=['GET','POST'])
def index():
    print(request.form['password'])
    print(request.form['username'])
    if request.method == "POST":
        session.pop('user', None)
        if request.form['password'] == "password":
            session['user'] = request.form['username']
            return redirect(url_for('index'))
        else:
            return jsonify({'message': 'Login failed'})
    else:
        return jsonify({'message': 'Login successful'})
    
@app.route('/notes', methods=['GET'])
def get_notes():
    load_notes()
    return jsonify(notes)

def load_notes():
    global notes
    try: 
        with open('notes.json', 'r') as file:
            notes = json.load(file)
    except FileNotFoundError:
            notes = []

@app.route('/delete_note/<int:note_id>', methods=['POST'])
def delete_note(note_id):
    del notes[note_id]
    save_notes()
    return jsonify({'message': 'Note deleted successfully'})

@app.route('/edit_note/<int:note_id>', methods=['POST'])
def edit_note(note_id):
    data = request.get_json()  # Get JSON data from the request
    note_text = data.get('text')
    note_color = data.get('color')
    note_date = data.get('date')
    notes[note_id] = {"text": note_text, "color": note_color, "date": note_date}
    save_notes()
    return jsonify({'message': 'Note edited successfully'})

@app.route('/add_note', methods=['POST'])
def add_note():
    note_text = request.form['note_text']
    note_color = request.form['note_color']
    note_date = request.form['note_date']
    notes.append({"text": note_text, "color": note_color, "date": note_date})
    save_notes()
    return jsonify({'message': 'Note added successfully'})

def save_notes():
    with open('notes.json', 'w') as file:
        json.dump(notes, file, indent=4)

if __name__ == "__main__":
    app.run(debug=True)
