// Form.jsx
import React from 'react';

function Form({ noteText, setNoteText, noteColor, setNoteColor, noteDate, setNoteDate, addNote }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    addNote();
    setNoteText('');
    setNoteColor('#FFFFF');
    setNoteDate(new Date().toISOString().split('T')[0]);
  };

  const styles = {
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // Center the form horizontally
      marginBottom: '20px',
    },
    inputGroup: {
      display: 'flex',
      marginBottom: '10px',
    },
    firstthreeOption: {
      padding: "20px",
      display:"flex",
      justifyContent:"center",
      gap: '10px', // Add small gap between elements
    },
    input: {
      padding: '5px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#45a049',
    },
    textInput: {
      width: '400px', // Set width to 400px
      height: '100px',
      padding: '5px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px',
      overflowY: 'scroll',
    },
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.inputGroup}>
        <div style={styles.firstthreeOption}>
          <input type="color" value={noteColor} onChange={(e) => setNoteColor(e.target.value)} style={{ ...styles.input, width: '50px' }} /> {/* Adjust width of color input */}
          <input type="date" value={noteDate} onChange={(e) => setNoteDate(e.target.value)} style={{ ...styles.input, width: '100px' }} /> {/* Adjust width of date input */}
          <button type="submit" style={styles.button}>Add Note</button>
        </div>
      </div>
      <textarea 
        value={noteText} 
        onChange={(e) => setNoteText(e.target.value)} 
        placeholder="Enter note text" 
        style={styles.textInput} 
      />
    </form>
  );
}

export default Form;
