import React, { useState, useEffect } from 'react';
import Form from './Form';
import SearchBar from './SearchBar.jsx';

function NoteTakingPage() {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [noteColor, setNoteColor] = useState('#FFFFFF');
  const currentDate = new Date(Date.now());
  const formattedDate = currentDate.toISOString().split('T')[0];
  const [noteDate, setNoteDate] = useState(formattedDate);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = () => {
    fetch("/notes", {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        console.log("loadingData")
        console.log(data);
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
      loadNotes();
    })
    .catch(error => {
      console.error('Error adding note:', error);
    });
  };

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
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
</div>

  );
}

export default NoteTakingPage;
