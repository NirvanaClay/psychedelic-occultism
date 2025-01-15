import React from 'react'
import { Link } from 'react-router-dom'

import '../Styles/experiences.css'

const Experiences = () => {
  return (
    <div id='experiences'>
      <h3>Experience Type 1</h3>
        <ul>
          <li><Link to='/experience'>Name of Experience</Link></li>
          <li><Link to='/experience'>Name of Experience</Link></li>
          <li><Link to='/experience'>Name of Experience</Link></li>
          <li><Link to='/experience'>Name of Experience</Link></li>
        </ul>
      <h3>Experience Type 2</h3>
      <ul>
          <li><Link to='/experience'>Name of Experience</Link></li>
          <li><Link to='/experience'>Name of Experience</Link></li>
          <li><Link to='/experience'>Name of Experience</Link></li>
          <li><Link to='/experience'>Name of Experience</Link></li>
        </ul>
      <h3>Experience Type 3</h3>
      <ul>
          <li><Link>Name of Experience</Link></li>
          <li><Link>Name of Experience</Link></li>
          <li><Link>Name of Experience</Link></li>
          <li><Link>Name of Experience</Link></li>
        </ul>
    </div>
  )
}

export default Experiences
