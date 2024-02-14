from flask import Flask, session, request, jsonify, redirect, url_for
from flask_mysqldb import MySQL

app = Flask(__name__)
app.secret_key = 'your_secret_key'
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'notetakingapp'

mysql = MySQL(app)
notes = []
@app.route('/', methods=['POST'])
def index():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM users WHERE username = %s", (username,))
        user = cur.fetchone()
        print(user)
        cur.close()
        print(user)
        if user:
            if user[2] == password:  # Assuming the password is stored in the third column of the users table
                session['user'] = user[0]
                return jsonify({'message': 'Yes'})
            else:
                return jsonify({'message': 'No - Invalid password or username'})
        else:
            return jsonify({'message': 'No - Invalid password or username'})

@app.route('/notes', methods=['GET'])
def get_notes():
    
    return load_notes()

def load_notes():
    cur = mysql.connection.cursor()
    cur.execute("SELECT note_id, content, background_color, creation_date FROM notes WHERE user_id = %s", (session['user'],))
    notes_data = cur.fetchall()
    cur.close()
    notes = [{'note_id': note[0], 'notes': note[1], 'color': note[2], 'date': str(note[3])} for note in notes_data]
    print(notes)
    return jsonify(notes)

@app.route('/delete_note/<int:note_id>', methods=['POST'])
def delete_note(note_id):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM notes WHERE note_id = %s", (note_id,))
    mysql.connection.commit()
    cur.close()

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
    if 'user' not in session:
        return jsonify({'message': 'No user logged in'})
    user_id = session['user']
   
    note_text = request.form['note_text']
    note_color = request.form['note_color']
    note_date = request.form['note_date']
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO notes (content, background_color, creation_date, user_id) VALUES (%s, %s, %s, %s)", (note_text, note_color, note_date, user_id))
    mysql.connection.commit()
    cur.close()
    return jsonify({'message': 'Note added successfully'})

def save_notes():
    with open('notes.json', 'w') as file:
        json.dump(notes, file, indent=4)

if __name__ == "__main__":
    app.run(debug=True)
