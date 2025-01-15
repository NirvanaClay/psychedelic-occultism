import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { jwtDecode } from 'jwt-decode';

import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Tree from './Components/Tree'
import TreeElement from './Components/TreeElement'
import Psychedelics from './Components/Psychedelics'
import Experiences from './Components/Experiences'
import Experience from './Components/Experience'
import SpiritualityList from './Components/SpiritualityList'
import Spirituality from './Components/Spirituality'
import Techniques from './Components/TechniqueList'
import Technique from './Components/Technique'
import Summary from './Components/Summary'
import Book from './Components/Book'
import IdeaExploration from './Components/IdeaExploration'
import CreateSummary from './Components/CreateSummary'
import CreateIdeaExploration from './Components/CreateIdeaExploration'
import Register from './Components/Register'
import Login from './Components/Login'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const isTokenValid = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds
      return decoded.exp > currentTime; // Token is valid if expiration is in the future
    } catch (error) {
      return false; // Invalid token
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && isTokenValid(token)) {
      setIsLoggedIn(true);
      console.log("You are logged in!")
    } else {
      localStorage.removeItem('token'); // Remove invalid token
      setIsLoggedIn(false);
      console.log("You are logged out!")
    }
  }, [isLoggedIn]);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/tree" element={<Tree />} />
        <Route path="/tree/:name" element={<TreeElement />} />
        <Route path="/psychedelics" element={<Psychedelics />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/explore/techniques" element={<Techniques />} />
        <Route path="/explore/techniques/:techniqueId" element={<Technique />} />
        <Route path="/explore/spirituality" element={<SpiritualityList />} />
        <Route path="/spirituality/:id" element={<Spirituality />} />
        <Route path="/spirituality/:id1/summaries/:id2" element={<Summary />} />
        <Route path="/spirituality/:id1/ideaExplorations/:id2" element={<IdeaExploration />} />
        <Route path="/spirituality/:id1/sources/:id2" element={<Book />} />
        <Route path="/spirituality/:id/create-summary" element={<CreateSummary />} />
        <Route path="/spirituality/:id/create-idea" element={<CreateIdeaExploration />} />
        <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </Router>
  );
}

export default App;
