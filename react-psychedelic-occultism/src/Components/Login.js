import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import '../Styles/login.css';

const LoginForm = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      setIsLoggedIn(true);
      setErrorMessage(''); // Clear any previous errors
      navigate('/');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };
  

  return (
    <div id='login'>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <div>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <button 
              type="button" 
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
