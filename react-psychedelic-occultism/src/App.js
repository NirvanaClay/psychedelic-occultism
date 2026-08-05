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
import SourceList from './Components/SourceList'
import Source from './Components/Source'
import PersonList from './Components/PersonList'
import Person from './Components/Person'
import IdeaExploration from './Components/IdeaExploration'
import CreateSummary from './Components/CreateSummary'
import CreateIdeaExploration from './Components/CreateIdeaExploration'
import WebList from './Components/WebList'
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
  console.log("user is:", user);

  if (user) {
    setIsLoggedIn(true);
  } else {
    setIsLoggedIn(false);
  }
}, [user, isLoggedIn]); // or just [user] if that ends up working in your app

  // useEffect(() => {
  //   checkLogin()
  //   console.log("user is:")
  //   console.log(user)
  //   if(user){
  //     setIsLoggedIn(true)
  //     console.log("user is:", user)
  //   }
  //   else{
  //     setIsLoggedIn(false)
  //     console.log("There is no user.")
  //   }
  // }, [user, isLoggedIn])
  
  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/tree" element={<Tree />} />
        <Route path="/tree/:name" element={<TreeElement />} />
        <Route path="/psychedelics" element={<Psychedelics />} />
        <Route path="/sources" element={<SourceList />} />
        <Route path="/sources/:id" element={<Source />} />
        <Route path="/people" element={<PersonList />} />
        <Route path="/people/:slug" element={<Person activeDropdownId={activeDropdownId} setActiveDropdownId={setActiveDropdownId} />} />
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
        <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
