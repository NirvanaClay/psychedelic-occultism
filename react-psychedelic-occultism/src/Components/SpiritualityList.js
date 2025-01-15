import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

import '../Styles/spirituality.css'

const Spirituality = () => {
  const [spiritualities, setSpiritualities] = useState([]);

  const SpiritualityList = () => {
    useEffect(() => {
        fetch('http://localhost:3001/api/spirituality/all')
            .then(res => res.json())
            .then(data => setSpiritualities(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);
  }

  useEffect(() => {
    console.log(spiritualities)
  }, [spiritualities])

  SpiritualityList()

  return (
    <div className='spirituality'>
      <h1>Spirituality</h1>
      {/* <button onClick={handlePopulate}>Populate Database</button> */}
      <ul>
      {spiritualities.map(spirituality => (
        <li key={spirituality._id}>
          <h2><Link to={`/spirituality/${spirituality._id}`}>{spirituality.name}</Link></h2>
          <p>{spirituality.summary}</p>
        </li>
      ))}
      </ul>
    </div>
  )
}

export default Spirituality
