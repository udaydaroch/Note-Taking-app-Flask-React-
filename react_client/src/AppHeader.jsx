import React from 'react';

function AppHeader({ ShowBack, handleBackToHome }) {
  const styles = {
    fontSize: "7em",
    color: "",
    justifyContent: "center",
    alignSelf: "center",
    display: "flex",
    margin: 0
  };

  return (
    <div>
      {ShowBack && <button buttonName="Back" onClick={handleBackToHome}>Back</button>}
      <h1 style={styles}>Take Notes</h1>
    </div>
  );
}

export default AppHeader;
