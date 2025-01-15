// IdeaExploration.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const IdeaExploration = () => {
  const { id1, id2 } = useParams();
  const [idea, setIdea] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/spirituality/${id1}/ideaExplorations/${id2}`)
      .then(response => response.json())
      .then(data => setIdea(data))
      .catch(error => console.error('Error fetching idea:', error));
  }, [id1, id2]);

  if (!idea) {
    return <div>Loading...</div>;
  }

  return (
    <div className='idea'>
      <h1>{idea.title}</h1>
      <p>{idea.content}</p>
    </div>
  );
};

export default IdeaExploration;
