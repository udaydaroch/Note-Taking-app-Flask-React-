import React from 'react';
//
function Notes({ notes, deleteNote }) {
  console.log(notes);
  const styles = {
    noteList: {
      listStyleType: 'none',
      padding: 0,
      display: 'flex', 
      flexDirection: 'row',
      flexWrap: 'wrap', 
    },
    noteItem: {
      margin:'auto',
    },
    noteCard: {
      width: "600px",
      height: "200px",
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    button: {
      marginTop: 'auto',
    }
  };

  return (
    <ul style={styles.noteList}>
      {notes.map((note, index) => (
        <li key={index} style={styles.noteItem}>
          <div style={{ ...styles.noteCard, backgroundColor: note.color }}>
            <p>{note.text}</p>
            <p>{note.date}</p>
            <button style={styles.button} onClick={()=>deleteNote(index)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Notes;
