import React, { useState } from 'react';
import Button from './Button'; 
import './HomePage.css'; 
import NoteTakingPage from './NoteTakingPage';

function HomePage() {
  const [activePage, setActivePage] = useState(null);

  const handleTakeNotes = () => {
    setActivePage('noteTaking');
  };

  const handleAskForHelp = () => {
    setActivePage('askForHelp');
  };

  const handleUpdateInfo = () => {
    setActivePage('updateInfo');
  };

  const handleBackToHome = () => {
    setActivePage(null);
  };

  return (
    <div className="home-page">
      {!activePage && (
        <>
          <div className="card" onClick={handleTakeNotes}>
            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="260" fill="currentColor" className="bi bi-book-half" viewBox="0 0 16 16">
              <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
            </svg>
            <h1 className="card-title">Add notes</h1>
            <br/>
            <Button buttonName="TakeNotes" />
          </div>
          <div className="card" onClick={handleAskForHelp}>
            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="260" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
              <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
            </svg>
            <h1 className="card-title">Ask for help</h1>
            <br/>
            <Button buttonName="Contact-friend" />
          </div>
          <div className="card" onClick={handleUpdateInfo}>
            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="260" fill="currentColor" className="bi bi-person-badge-fill" viewBox="0 0 16 16">
              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm4.5 0a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6m5 2.755C12.146 12.825 10.623 12 8 12s-4.146.826-5 1.755V14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1z"/>
            </svg>
            <h1 className="card-title">Update info</h1>
            <br/>
            <Button buttonName="Account Setting" />
          </div>
        </>
      )}

      {activePage === 'noteTaking' && (
       <div className="backcard">
        
          <button buttonName="Back" onClick={handleBackToHome} >Back</button>
          <NoteTakingPage ></NoteTakingPage>
     
       </div>


      )}

      {activePage === 'askForHelp' && (
        <div className="card">
          {/* Content for the "Ask for help" page */}
          <h1>Ask for help page content</h1>
          <button buttonName="Back" onClick={handleBackToHome} >Back</button>
        </div>
      )}

      {activePage === 'updateInfo' && (
        <div className="card">
          {/* Content for the "Update info" page */}
          <h1>Update info page content</h1>
          <button buttonName="Back" onClick={handleBackToHome} >Back</button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
