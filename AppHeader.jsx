import React from 'react';

function AppHeader(props) {
  const styles = {
    fontSize: "8em",
    color: "grey",
    justifyContent:"center",
    alignSelf: "center",
    display:"flex",
    margin: 0
  };

  return (
    <div >
      <h1 style={styles}>Take Notes</h1>
    </div>
  );
}

export default AppHeader;
