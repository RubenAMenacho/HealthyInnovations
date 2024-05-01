import React, { useState } from 'react';
import { FaUser, FaBars } from 'react-icons/fa'; // Import FontAwesome icons

const NavigationBar = ({ handleNavigationChange }) => {
    const [isOpen, setIsOpen] = useState(false); // State to manage the menu visibility
    const fullName = localStorage.getItem('userFullName'); // Get user's full name from localStorage

    return (
        <div className={`navigation-bar ${isOpen ? 'open' : ''}`}>
            <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
                <FaBars /> {/* Icon to toggle menu */}
            </div>
            <div className="menu-content">
                <div className="user-info">
                    <FaUser className="user-icon" />
                    <span>{fullName}</span>
                </div>
                <div className="menu-items">
                    <button onClick={() => {handleNavigationChange('home'); setIsOpen(false);}}>Home</button>
                    <button onClick={() => {handleNavigationChange('workout'); setIsOpen(false);}}>Workout Plans</button>
                    <button onClick={() => {handleNavigationChange('calories'); setIsOpen(false);}}>Calories Calculator</button>
                </div>
            </div>
        </div>
    );
};

export default NavigationBar;

