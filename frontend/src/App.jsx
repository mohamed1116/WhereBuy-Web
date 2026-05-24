import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Auth from './Auth';
import Home from './Home';
import Stores from './Stores';
import AddStore from './AddStore';
import Favorites from './Favorites';
import Map from './Map';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <Link to="/" className="nav-link">Accueil</Link>
        <Link to="/favorites" className="nav-link">Favoris</Link>
        <Link to="/map" className="nav-link">Carte</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/stores/:productId" element={<Stores />} />
        <Route path="/add-store/:productId" element={<AddStore />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </div>
  );
}

export default App;