import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

import '../Styles/spirituality.css'

const Techniques = () => {
  const [techniques, setTechniques] = useState([]);

  const TechniqueList = () => {
    useEffect(() => {
        fetch('http://localhost:3001/api/techniques/all')
            .then(res => res.json())
            .then(data => setTechniques(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);
  }

  useEffect(() => {
    console.log(techniques)
  }, [techniques])

  TechniqueList()

  return (
    <div className='techniques'>
      <h1>Techniques</h1>
      {/* <button onClick={handlePopulate}>Populate Database</button> */}
      <ul>
      {techniques.map(technique => (
        <li key={technique._id}>
          <h2><Link to={`/techniques/${technique._id}`}>{technique.name}</Link></h2>
          <p>{technique.summary}</p>
        </li>
      ))}
      </ul>
    </div>
  )
}

export default Techniques;
