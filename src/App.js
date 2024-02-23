
//App.js// 

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import LandingPage from './LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;


