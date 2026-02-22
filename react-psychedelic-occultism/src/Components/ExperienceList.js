import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

import '../Styles/experiences.css'

const Experiences = () => {

  const [experiences, setExperiences] = useState([]);

  const ExperienceList = () => {
    useEffect(() => {
        fetch('http://localhost:3001/api/experiences/all')
            .then(res => res.json())
            .then(data => setExperiences(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);
  }

  useEffect(() => {
    console.log(experiences)
  }, [experiences])

  ExperienceList()

  return (
    <div id='experiences'>
      <h3>Experiences</h3>
      <ul>
      {experiences.map(experience => (
        <li key={experience._id}>
          <h2><Link to={`/experiences/${experience._id}`}>{experience.title}</Link></h2>
          <p>{experience.content}</p>
        </li>
      ))}
      </ul>
    </div>
  )
}

export default Experiences
