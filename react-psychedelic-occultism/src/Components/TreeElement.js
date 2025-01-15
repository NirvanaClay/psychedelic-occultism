import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Styles/treeElement.css'; // Update with your SCSS or CSS file

const TreeElement = () => {
  const { name } = useParams(); // Get the name from the URL
  const [element, setElement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchElement = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/tree/${name}`);
        if (!response.ok) throw new Error('TreeElement not found');
        const data = await response.json();
        setElement(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchElement();
  }, [name]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="tree-element">
      <h1>{element.name}</h1>
      <h2>{element.translation}</h2>
      <p>{element.description}</p>
    </div>
  );
};

export default TreeElement;

