// NavigationBar.js

import React from 'react';

const NavigationBar = ({ handleNavigationChange }) => {
  return (
    <div className="navigation-bar">
        <button onClick={() => handleNavigationChange('home')}>Home</button>
        <button onClick={() => handleNavigationChange('workout')}>Workout Plans</button>
        <button onClick={() => handleNavigationChange('calories')}>Calories Calculator</button>
    </div>
  );
};

export default NavigationBar;