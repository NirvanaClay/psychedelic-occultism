import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AddToWebButton from "./AddToWebButton"

// import '../Styles/technique.css'; // Create this SCSS or CSS file for styling

const Technique = () => {
  const { slug } = useParams(); // Get the name parameter from the route
  const [technique, setTechnique] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTechnique = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/techniques/${slug}`);
        if (!response.ok) throw new Error('Technique not found');
        const data = await response.json();
        setTechnique(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTechnique();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="technique">
      <h1 className="technique__name">{technique.name}</h1>
      <p className="technique__description">{technique.description}</p>
      <AddToWebButton refModel="Technique" refId={technique._id} />
    </div>
  );
};

export default Technique;
