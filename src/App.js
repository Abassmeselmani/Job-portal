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
import Savedjobs from './pages/savedjobs';
import Myjobs from './pages/myjobs';
import Notlogged from './pages/secure';
import Loading from './pages/loadingpage';
import Posterjob from './pages/posterjob';
import Moredetails2 from './pages/moredetals2';

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
        <Route path="/savedjobs" element={<Savedjobs />} />
        <Route path="/myjobs" element={<Myjobs />} />
        <Route path="/secure" element={<Notlogged />} />
        <Route path="/loadingpage" element={<Loading />} />
        <Route path="/posterjob" element={<Posterjob />} />
        <Route path="/moredetails2/:id" element={<Moredetails2 />} />



      </Routes>
    </div>
    </AuthProvider>
  );
}

export default App;
