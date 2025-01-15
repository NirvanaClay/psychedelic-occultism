// Summary.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Summary = () => {
  const { id1, id2 } = useParams();
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/spirituality/${id1}/summaries/${id2}`)
      .then(response => response.json())
      .then(data => setSummary(data))
      .catch(error => console.error('Error fetching summary:', error));
  }, [id1, id2]);

  // Inside Summary.js

const handleFavorite = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`http://localhost:3001/api/users/favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ itemId: summary._id, itemType: 'summary' }),
    });

    if (response.ok) {
      console.log('Item favorited successfully');
    } else {
      console.error('Error favoriting item');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

  if (!summary) {
    return <div>Loading...</div>;
  }

  return (
    <div className='summary'>
      <h1>{summary.title}</h1>
      <p>{summary.content}</p>
      <i
          onClick={handleFavorite}
          className="fas fa-heart favorite-icon"
          aria-label="Favorite"
          title="Favorite"
        ></i>
    </div>
  );
};

export default Summary;
