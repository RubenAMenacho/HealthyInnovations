import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
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

    const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return password.length > 7 && hasUpperCase && hasSpecialChar;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.password !== user.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        
        if (!validatePassword(user.password)) {
            alert("Password must be longer than 7 characters, include at least one uppercase letter, and contain at least one special character.");
            return;
        }

        // Hash the password with bcrypt
        const hashedPassword = bcrypt.hashSync(user.password, 10);

        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('userPassword', hashedPassword); // Store hashed password securely

        alert('Signup successful! Redirecting to login...');
        navigate('/login'); // Redirect to login page
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
