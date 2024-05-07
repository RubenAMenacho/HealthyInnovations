 //NavigationBar.js

 import React, { useState, useEffect } from 'react';
 import { FaUser, FaBars } from 'react-icons/fa';
 import { useNavigate } from 'react-router-dom';
 import { getAuth, signOut } from 'firebase/auth';
 
 const NavigationBar = ({ handleNavigationChange, showSavedWorkoutButton }) => {
     const [isOpen, setIsOpen] = useState(false);
     const [fullName, setFullName] = useState(localStorage.getItem('userFullName') || '');
     const navigate = useNavigate();
     const auth = getAuth();
 
     useEffect(() => {
         const updateFullName = () => {
             setFullName(localStorage.getItem('userFullName'));
         };
 
         window.addEventListener('storage', updateFullName);
         return () => {
             window.removeEventListener('storage', updateFullName);
         };
     }, []);
 
     const handleLogout = () => {
         signOut(auth).then(() => {
             localStorage.removeItem('userFullName');
             navigate('/login');
         }).catch((error) => {
             console.error("Logout failed", error);
         });
     };
 
     return (
         <div className={`navigation-bar ${isOpen ? 'open' : ''}`}>
             <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
                 <FaBars />
             </div>
             <div className="menu-content">
                 <div className="user-info">
                     <FaUser className="user-icon" />
                     <span>{fullName || "Guest"}</span>
                 </div>
                 <div className="menu-items">
                     <button onClick={() => {handleNavigationChange('home'); setIsOpen(false);}}>Home</button>
                     <button onClick={() => {handleNavigationChange('workout'); setIsOpen(false);}}>Workout Plans</button>
                     <button onClick={() => {handleNavigationChange('calories'); setIsOpen(false);}}>Calories Calculator</button>
                     {showSavedWorkoutButton && (
                <button onClick={() => handleNavigationChange('savedWorkout')}>Saved Workouts</button>
                     )}
                     <button onClick={handleLogout} className="logout-button">Logout</button>
                 </div>
             </div>
         </div>
     );
 };
 
 export default NavigationBar;


