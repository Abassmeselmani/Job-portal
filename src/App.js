import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Navbar from './navbar/navbar';
import Section from './pages/section';
import Findjob from './pages/findjob';
import Postjob from './pages/postjob';
import Moredetails from './pages/moredetails';
import { AuthProvider } from './context';
import Login from './pages/login';
import Signup from './pages/signup';

function App() {
  return (
     <AuthProvider>
    <div>
     
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/section" element={<Section />} />
        <Route path="/findjob" element={<Findjob />} />
        <Route path="/postjob" element={<Postjob />} />
        <Route path="/moredetails/:id" element={<Moredetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />


      </Routes>
    </div>
    </AuthProvider>
  );
}

export default App;
