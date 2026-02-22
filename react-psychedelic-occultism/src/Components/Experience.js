import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AddToWebButton from "./AddToWebButton"

import '../Styles/experience.css'

const Experience = () => {
  const { id: experienceId } = useParams();

  const [experience, setExperience] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/experiences/${experienceId}`)
        .then((response) => response.json())
        .then((data) => setExperience(data))
        .catch((error) => console.error('Error fetching experience:', error));
  }, [experienceId]);

  useEffect(() =>{
    console.log("experience is:", experience)
  }, [experience])

  if (!experience) {
    return <div>Loading...</div>;
  }

  return (
    <div id='experience'>
      <h1>{experience.title}</h1>
      <p>{experience.content}</p>
      <AddToWebButton refModel="Experience" refId={experience._id} />
    </div>
  )
}

export default Experience
