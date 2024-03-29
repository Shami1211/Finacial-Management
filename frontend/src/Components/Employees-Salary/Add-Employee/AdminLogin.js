import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router'; // Import navigate from '@reach/router'

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Check if username is 'admin' and password is '123'
    if (username === 'admin' && password === '123') {
      showAlert("Admin Logged successfully!");
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  const showAlert = (message) => {
    alert(message);
  };

  useEffect(() => {
    // If credentials are valid, navigate to employeedetails page
    if (username === 'admin' && password === '123') {
      navigate("/employeedetails"); // Navigate to employeedetails page
    }
  }, [username, password]);

  return (
    <div>
      <h1>Admin Login</h1>
      <label>Username:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
