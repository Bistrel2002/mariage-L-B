import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RSVP from './pages/RSVP';
import Wishlist from './pages/Wishlist';
import Accommodations from './pages/Accommodations';
import MapPage from './pages/MapPage';
import Footer from './components/Footer';
import DressCode from './pages/DressCode';
import Agenda from './pages/Agenda';
import BackgroundMusic from './components/BackgroundMusic';

function App() {
  return (
    <>
      <Navbar />
      <BackgroundMusic />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rsvp" element={<RSVP />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/hebergement" element={<Accommodations />} />
        <Route path="/carte" element={<MapPage />} />
        <Route path="/dresscode" element={<DressCode />} />
        <Route path="/agenda" element={<Agenda />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
