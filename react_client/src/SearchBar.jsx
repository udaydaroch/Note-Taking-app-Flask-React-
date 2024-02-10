import React, { useState } from 'react';
import Notes from './notes';
import './SearchBar.css';

function SearchBar({ allNotes, loadNote, deleteNote }) {
  const [searchDate, setSearchDate] = useState(new Date().toISOString().split('T')[0]);
  const [filteredNotes, setFilteredNotes] = useState(allNotes); // Initially, display all notes
  const [currentPage, setCurrentPage] = useState(1);
  const [notesPerPage] = useState(3);

  const handleSearch = () => {
    const filtered = allNotes.filter(note => note.date === searchDate);
    setFilteredNotes(filtered);
    setCurrentPage(1);
  };

  const handleDeleteNote = (index) => {
    deleteNote(index);
    setFilteredNotes(filteredNotes.filter((_, i) => i !== index));
    loadNote();
  };

  const handleSearchButtonClick = () => {
    handleSearch();
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            <Notes note={note} deleteNote={() => handleDeleteNote(index)} />
          </li>
        ))}
      </ul>

      {filteredNotes.length > notesPerPage ? (
        <ul className="pagination">
          {Array.from({ length: Math.ceil(filteredNotes.length / notesPerPage) }, (_, i) => i + 1).map((page) => (
            <li key={page}>
              <button onClick={() => paginate(page)} className={page === currentPage ? 'active' : ''}>
                {page}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default SearchBar;
