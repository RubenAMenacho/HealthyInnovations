import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import './App.css';

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Retrieve user data from localStorage
    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');

    // Verify the input password against the stored, hashed password
    if (credentials.email === storedEmail && bcrypt.compareSync(credentials.password, storedPassword)) {
      localStorage.setItem('isLoggedIn', true);
      alert('Login successful! Redirecting...');
      navigate('/landing');
    } else {
      alert('Login failed: Incorrect email or password.');
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


