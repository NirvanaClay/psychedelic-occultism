import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AddToWebButton from "./AddToWebButton"

import '../Styles/source.css'

const Source = () => {
  const { id } = useParams();
  const [source, setSource] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/sources/${id}`)
      .then(response => response.json())
      .then((data) => {
        console.log('Fetched Data:', data); // Log the data for debugging
        setSource(data); // Update the state only after confirming data is correct
      })
      .catch(error => console.error('Error fetching summary:', error));
  }, [id]);

  console.log("Source is:", source)

  if (!source) {
    return <div>Loading...</div>;
  }

  return (
    <div id='source'>
      <h1>{source.title}</h1>
      <img src={source.image} />
      <p>{source.description}</p>
      <AddToWebButton refModel="Source" refId={source._id} />
    </div> 
  )
}

export default Source
