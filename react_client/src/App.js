
import React, { useState, useEffect } from 'react';
import Form from './Form';
import AppHeader from './AppHeader';
import SearchBar from './SearchBar.jsx';
import Login from './Login.jsx';
import './App.css';
function App() {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [noteColor, setNoteColor] = useState('#FFFFFF'); 
  const currentDate = new Date(Date.now());
  const formattedDate = currentDate.toISOString().split('T')[0];
  const [noteDate, setNoteDate] = useState(formattedDate);
  const [loggedin, isLoggedin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = () => {
    fetch("/notes", {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        setNotes(data);
      })
      .catch(error => {
        console.error('Error fetching notes:', error);
      });
  };

  const addNote = () => {
    const formData = new FormData();
    formData.append('note_text', noteText);
    formData.append('note_color', noteColor);
    formData.append('note_date', noteDate); 
    fetch("/add_note", {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
     
    })
    .catch(error => {
      console.error('Error adding note:', error);
    });
  };

  /* const editNote = (noteId, updatedNoteData) => {
    fetch(`/edit_note/${noteId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedNoteData)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        loadNotes();
    })
    .catch(error => {
        console.error('Error editing note:', error);
    });
}; */
  
  const deleteNote = (noteId) => {
    fetch(`/delete_note/${noteId}`, {
      method: 'POST'
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      loadNotes();
    })
    .catch(error => {
      console.error('Error deleting note:', error);
    });
  };

  const handleLogin = () => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    fetch("/", {
        method: 'POST',
        body: formData,
        credentials: 'same-origin'
    })
    .then(res => {
        if (res.ok) {
            isLoggedin(true);
            setErrorMessage('');
        } else {
            return res.json();
        }
    })
    .then(data => {
       console.log(data)
        if (data && data.message) {
            setErrorMessage(data.message);
        } else {
            setErrorMessage('Unknown error occurred');
        }
    })
    .catch(error => {
        console.error('Error logging in:', error);
        setErrorMessage('Error logging in: Please try again later');
    });
};



  return (
    <div className="background">
      {loggedin ? (
        <>
          <AppHeader/>
          <Form 
            noteText={noteText} 
            setNoteText={setNoteText} 
            noteColor={noteColor} 
            setNoteColor={setNoteColor} 
            noteDate={noteDate} 
            setNoteDate={setNoteDate} 
            addNote={addNote} 
            loadNotes={loadNotes}
          /> 
          <SearchBar allNotes={notes} loadNote={loadNotes} deleteNote={deleteNote} />
        </>
      ) : (
       <Login username={username} setUsername={setUsername} password= {password} setPassword={setPassword}
       handleLogin={handleLogin} errorMessage={errorMessage} />
      )}
    </div>
  );
}

export default App;