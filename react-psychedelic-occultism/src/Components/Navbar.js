import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/navbar.css';

import { useAuth } from "../Hooks/useAuth";
// const { user, logout } = useAuth();

const NavBar = ({ isLoggedIn, setIsLoggedIn, user, setUser }) => {
  const { logout } = useAuth(user, setUser);
  const navigate = useNavigate();

  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isMySpaceOpen, setIsMySpaceOpen] = useState(false);

  const handleLogout = () => {
    // localStorage.removeItem('token'); // Remove the token
    logout()
    setUser(); // Update login state
    navigate('/'); // Redirect to home or another page
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">PsyOcc</Link>
      </div>
      <ul className="navbar-links">
        <li
          className="dropdown"
          onMouseEnter={() => setIsExploreOpen(true)}
          onMouseLeave={() => setIsExploreOpen(false)}
        >
          {/* <span className="dropdown-title">Explore ▼</span> */}
          <span className="dropdown-title">Explore ▼</span>
          {isExploreOpen && (
            <ul className="dropdown-menu">
              <li><Link to="/spirituality">Spiritual Systems</Link></li>
              <li><Link to="/people">People</Link></li>
              <li><Link to="/sources">Sources</Link></li>
              <li><Link to="/techniques">Techniques</Link></li>
              <li><Link to="/experiences">Experiences</Link></li>
              <li><Link to="/webs">Webs</Link></li>
              {/* <li><Link to="/quotes">Quotes</Link></li>
              <li><Link to="/people">People</Link></li>
              <li><Link to="/idea-explorations">Idea Explorations</Link></li>
              <li><Link to="/spiritual-systems">Spiritual Systems</Link></li>
              <li><Link to="/techniques">Techniques</Link></li>
              <li><Link to="/personal-experiences">Personal Experiences</Link></li> */}
            </ul>
          )}
        </li>

        <li
          className="dropdown"
          onMouseEnter={() => setIsCreateOpen(true)}
          onMouseLeave={() => setIsCreateOpen(false)}
        >
          <span className="dropdown-title">Create ▼</span>
          {isCreateOpen && (
            <ul className="dropdown-menu">
              <li><Link to="/webs/create">New Web</Link></li>
              <li><Link to="/experiences/create">Share Experience</Link></li>
              <li><Link to="/frameworks/create">Contribute Framework</Link></li>
            </ul>
          )}
        </li>
        {isLoggedIn && (
        <li
        className="dropdown"
        onMouseEnter={() => setIsMySpaceOpen(true)}
        onMouseLeave={() => setIsMySpaceOpen(false)}
      >
        <span className="dropdown-title">My Space ▼</span>
        {isMySpaceOpen && (
          <ul className="dropdown-menu">
            <li><Link to="/my-space/webs">My Webs</Link></li>
            <li><Link to="/my-space/saved">Saved Items</Link></li>
            <li><Link to="/my-space/drafts">Drafts</Link></li>
            <li><Link to="/my-space/contributions">Contributions</Link></li>
          </ul>
        )}
      </li>
        )}
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
          />
          <button className="search-button">🔍</button>
        </div>

        {isLoggedIn ? (
          <li>
            <span onClick={handleLogout}>Logout</span>
          </li>
        ) : (
          <>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;


        {/* <li><Link to="/">Home</Link></li>
        <li><Link to="/tree">Tree</Link></li>
        <li><Link to="/psychedelics">Psychedelics</Link></li>
        <li><Link to="/spirituality">Spirituality</Link></li>  */}

