import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// import '../Styles/sources.css';

const Sources = () => {
  const [sources, setSources] = useState([]);

  // Fetch sources directly inside useEffect
  useEffect(() => {
    fetch('http://localhost:3001/api/sources/all')
      .then(res => res.json())
      .then(data => setSources(data))
      .catch(error => console.error('Error fetching sources:', error));
  }, []); // Empty dependency array ensures this runs only once on component mount

  useEffect(() => {
    console.log("sources are:", sources)
  }, [sources])

  return (
    <div id='sources'>
      <h3>Sources</h3>
      <ul>
        {sources.map(source => (
          <li key={source._id}>
            <h2>
              <Link to={`/sources/${source._id}`}>{source.title}</Link>
            </h2>
            <p>{source.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sources;
