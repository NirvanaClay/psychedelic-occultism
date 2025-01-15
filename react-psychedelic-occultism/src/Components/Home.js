import React from 'react'
import '../Styles/home.css'

import axios from 'axios';

const Home = () => {
  const authTest = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the JWT from localStorage
  
      if (!token) {
        console.error('No token found. Please log in first.');
        alert('No token found. Please log in first.');
        return;
      }
  
      const response = await axios.get('http://localhost:3001/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}` // Pass the token in the Authorization header
        },
      });
  
      console.log('Profile Route Response:', response.data);
      alert(response.data.message); // Show the welcome message
    } catch (error) {
      console.error('Error accessing profile route:', error.response?.data?.message || error.message);
      alert('Error accessing profile route.');
    }
  };

  return (
    <div>
      <h1>Psychedelic Occultism</h1>
      <button onClick={authTest}>Auth test</button>
    </div>
  )
}

export default Home
