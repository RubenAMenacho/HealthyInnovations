
//Login.js


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css'; 

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/login.php', credentials);
      if (response.data.success) {
        navigate('/landing');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="App">
      <div className="branding">
        <h1 className="logo"> Login To Your Healthy Innovations Account!</h1>
        <p className="tagline">We are excited to help you achieve your health goals!</p>
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="login-input" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="login-input" />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default Login;


