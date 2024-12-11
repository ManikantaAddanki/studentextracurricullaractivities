import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/register';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Activities from './pages/Activities';
import Sports from './pages/sports';
import Club from './pages/Club';
import Profile from './pages/profile'
import Test from './pages/text';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/clubs" element={<Club />} />
        <Route path="/myprofile" element={<Profile />} />
        <Route path="/test" element={<Test/>} />
        
        
      </Routes>
    </Router>
  );
};

export default App;
