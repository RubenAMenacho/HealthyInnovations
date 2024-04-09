// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import LandingPage from './LandingPage';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          {/* Removed EntryForm from here to avoid it displaying on every route */}
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/" element={<LandingPage />} />
            {/* Add Route for EntryForm if needed */}
          </Routes>
            <br />
        </div>
      </Router>
    );
  }
}

export default App;

