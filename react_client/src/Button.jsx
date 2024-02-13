import React from 'react';

function Button({ buttonName, onClick }) {
  const styles = {
    backgroundColor: "hsl(13, 82%, 45%)",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  };

  return <button style={styles} onClick={onClick}>{buttonName}</button>;
}

export default Button;
