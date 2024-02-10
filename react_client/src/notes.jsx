import React from 'react';
import './notes.css';

function Notes({ note, deleteNote }) {
  return (
    <div className="note-card" style={{ backgroundColor: note.color }}>
      <p className="date">{note.date}</p>
      <p>{note.text}</p>
      <div className="button-wrapper">
        <button className="button" onClick={deleteNote}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Notes;
