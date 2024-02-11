import React, { useState } from 'react';
import "./Form.css";

function Form({ noteText, setNoteText, noteColor, setNoteColor, noteDate, setNoteDate, addNote, loadNotes }) {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [selectedFont, setSelectedFont] = useState('Arial'); // State for selected font

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote();
    setNoteText('');
    setNoteColor('#FFFFFF'); // Set the default color to white
    setNoteDate(new Date().toISOString().split('T')[0]);
    setShowSuccessMessage(true);

    // Hide the success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
    loadNotes();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="inputGroup">
        <div className="firstthreeOption">
          <input type="color" className="colorInput" value={noteColor} onChange={(e) => setNoteColor(e.target.value)} style={{ width: '50px' }} />
          <input type="date" className="dateInput" value={noteDate} onChange={(e) => setNoteDate(e.target.value)} style={{ width: '100px' }} />
        
           <select
          className="fontSelect"
          value={selectedFont}
          onChange={(e) => setSelectedFont(e.target.value)}
        >
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
        </select>
        <button type="submit" className="button">Add Note</button>
        </div>
      </div>
      <div className="inputGroup">

        <textarea
          className="textInput"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Enter note text"
          style={{ fontFamily: selectedFont }} // Apply selected font to textarea
        />
       
      </div>
      {showSuccessMessage && <div className="successMessage">Note successfully added to the database!</div>}
    </form>
  );
}

export default Form;
