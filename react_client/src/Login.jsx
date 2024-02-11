import React from 'react';
import "./Login.css";

function Login(props) {
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-header">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={props.username}
          onChange={(e) => props.setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={props.password}
          onChange={(e) => props.setPassword(e.target.value)}
          className="login-input"
        />
        <button onClick={props.handleLogin} className="login-button">Login</button>
        {props.errorMessage && <div className="login-error">{props.errorMessage}</div>}
      </div>
    </div>
  );
}

export default Login;
