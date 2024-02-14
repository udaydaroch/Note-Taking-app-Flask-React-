import React, { useState } from 'react';
import Notes from './notes';
import './SearchBar.css';

function SearchBar({ allNotes, loadNote, deleteNote }) {
  const [searchDate, setSearchDate] = useState(new Date().toISOString().split('T')[0]);
  const [filteredNotes, setFilteredNotes] = useState(allNotes); // Initially, display all notes
  const [currentPage, setCurrentPage] = useState(1);
  const [notesPerPage] = useState(3);

  const handleSearch = () => {
    loadNote();
    console.log(searchDate);
    console.log(allNotes)
    const filtered = allNotes.filter(note => String(note.date) === String(searchDate));
    setFilteredNotes(filtered);
    setCurrentPage(1);
  };

  const handleDeleteNote = (index) => {
    deleteNote(allNotes[index].note_id);
    setFilteredNotes(filteredNotes.filter((_, i) => i !== index));
    loadNote();
  };

  const handleSearchButtonClick = () => {
    handleSearch();
  };



  const handleInputChange = (e) => {
    let page = parseInt(e.target.value);
    console.log(page);
    const maxPage = Math.ceil(filteredNotes.length / notesPerPage);
  
  
    if (page < 1) {
      page = 1;
    } else if (page > maxPage) {
      page = maxPage;
    }
  
    setCurrentPage(page);
  };
  
  
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(filteredNotes.length / notesPerPage))
    );
  };

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);

  return (
    <div>
      <div className="input-container">
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <button onClick={handleSearchButtonClick}>Search</button>
      </div>

      <ul className="note-list">
        {currentNotes.map((note, index) => (
          <li key={index} className="note-item">
            console.log("note being added");
            <Notes note={note} deleteNote={() => handleDeleteNote(index)} />
          </li>
        ))}
      </ul>

      {filteredNotes.length > notesPerPage ? (
        <div className="pagination">
          <button onClick={handlePreviousPage}>&#8249;</button>
          <input 
            type="number"
            value={currentPage}
            onChange={handleInputChange}
            min="0"
            max={Math.ceil(filteredNotes.length / notesPerPage)}
          />
          <button onClick={handleNextPage}>&#8250;</button>
        </div>
      ) : null}
    </div>
  );
}

export default SearchBar;
