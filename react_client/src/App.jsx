import React, { useState } from 'react';
import AppHeader from './AppHeader.jsx';
import Login from './Login.jsx';
import HomePage from './HomePage.jsx';
function App() {
  const [loggedin, isLoggedin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    fetch("/", {
      method: 'POST',
      body: formData,
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.message === 'Yes') {
          isLoggedin(true);
          setErrorMessage('');
        } else if (data && data.message === 'No - Invalid password or username') {
          setErrorMessage('Invalid password or username');
        } else if (data && data.message === 'No - Invalid password or username') {
          setErrorMessage('Invalid username or username');
        } else {
          setErrorMessage('Unknown error occurred');
        }
      })
      .catch(error => {
        console.error('Error logging in:', error);
        setErrorMessage('Error logging in: Please try again later');
      });
};

  return (
 
      <div className="background">
        {loggedin ? (
          <>
            <AppHeader />
             <HomePage />
            
          
          </>
        ) : (
          <Login
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            errorMessage={errorMessage}
          />
        )}
      </div>

  );
}

export default App;
