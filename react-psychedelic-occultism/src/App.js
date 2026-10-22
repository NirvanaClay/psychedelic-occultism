import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

import { useAuth } from "./Hooks/useAuth";

import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Tree from './Components/Tree'
import TreeElement from './Components/TreeElement'
import Psychedelics from './Components/Psychedelics'
import ExperienceList from './Components/ExperienceList'
import Experience from './Components/Experience'
import ExperienceShare from './Components/ExperienceShare'
import SpiritualityList from './Components/SpiritualityList'
import Spirituality from './Components/Spirituality'
import Techniques from './Components/TechniqueList'
import Technique from './Components/Technique'
import Summary from './Components/Summary'
import Source from './Components/Source'
import Sources from './Components/Sources'
import People from './Components/People'
import Person from './Components/Person'
import Concept from './Components/Concept'
import Concepts from './Components/Concepts'
import IdeaExploration from './Components/IdeaExploration'
import CreateSummary from './Components/CreateSummary'
import CreateIdeaExploration from './Components/CreateIdeaExploration'
import WebList from './Components/WebList'
import Web from './Components/Web'
import WebCreate from './Components/WebCreate';
import Register from './Components/Register'
import Login from './Components/Login'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState()
  const [activeDropdownId, setActiveDropdownId] = useState(null);

  const { logout } = useAuth(user, setUser);

  const checkLogin = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      return;
    }

    try {
      const res = await axios.get(
        "http://localhost:3001/api/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data);
    } catch (err) {
      console.error("Error checking login:", err);

      localStorage.removeItem("token");
      setUser(null);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);
  
  useEffect(() => {
    const handleAuthLogout = () => {
      setUser(null);
    };

    window.addEventListener('auth:logout', handleAuthLogout);

    return () => {
      window.removeEventListener('auth:logout', handleAuthLogout);
    };
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);
  
  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/tree" element={<Tree />} />
        <Route path="/tree/:name" element={<TreeElement />} />
        <Route path="/psychedelics" element={<Psychedelics />} />
        <Route path="/sources" element={<Sources />} />
        <Route path="/sources/:id" element={<Source />} />
        <Route path="/people" element={<People />} />
        <Route path="/people/:slug" element={<Person activeDropdownId={activeDropdownId} setActiveDropdownId={setActiveDropdownId} />} />
        <Route path="/concept/:slug" element={<Concept />} />
        <Route path="/concepts" element={<Concepts />} />
        <Route path="/experiences" element={<ExperienceList />} />
        <Route path="/experiences/:id" element={<Experience />} />
        <Route path="/techniques" element={<Techniques />} />
        <Route path="/techniques/:slug" element={<Technique />} />
        <Route path="/spirituality" element={<SpiritualityList />} />
        <Route path="/spirituality/:id" element={<Spirituality />} />
        <Route path="/spirituality/:id1/summaries/:id2" element={<Summary />} />
        <Route path="/spirituality/:id1/ideaExplorations/:id2" element={<IdeaExploration />} />
        <Route path="/spirituality/:id1/sources/:id2" element={<Source />} />
        <Route path="/spirituality/:id/create-summary" element={<CreateSummary />} />
        <Route path="/spirituality/:id/create-idea" element={<CreateIdeaExploration />} />
        <Route path="/experiences/create" element={<ExperienceShare />} />
        <Route path="/my-space/webs" element={<WebList />} />
        <Route path="/webs/create" element={<WebCreate />} />
        <Route path="/webs/:id" element={<Web />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
