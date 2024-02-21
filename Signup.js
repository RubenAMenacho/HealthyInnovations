//Signup.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Signup() {
    const [user, setUser] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.password !== user.confirmPassword) {
            alert("Passwords do not match.");
            return; // Prevent form from being submitted
        }
        try {
            const response = await axios.post('http://localhost:8000/Users/ramlifting/my-app/my-app/src', user);
            if (response.data.success) {
                navigate('/login'); // Redirect to login page
            } else {
                alert(response.data.message); // Handle failure
            }
        } catch (error) {
            console.error('Error during signup', error);
        }
    };



    return (
        <div className="App">
            <div className="branding">
                <h1 className="logo">Please Create Your Healthy Innovations Account</h1>
                <p className="tagline">We are excited to help you achieve your health goals!</p>
            </div>
            <form onSubmit={handleSubmit} className="login-form">
                <input name="email" type="email" placeholder="Email" onChange={handleChange} className="login-input" required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} className="login-input" required />
                <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} className="login-input" required />
                <button type="submit" className="login-button">Sign Up</button>
            </form>
        </div>
    );

}

export default Signup;
