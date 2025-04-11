import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Navbar from './navbar/navbar';
import Section from './pages/section';
import Findjob from './pages/findjob';
import Postjob from './pages/postjob';
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/section" element={<Section />} />
        <Route path="/findjob" element={<Findjob />} />
        <Route path="/postjob" element={<Postjob />} />
      </Routes>
    </div>
  );
}

export default App;
