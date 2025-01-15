import React from 'react'
import { Link } from 'react-router-dom';

import '../Styles/psychedelics.css'

const Psychedelics = () => {
  return (
    <div id='psychedelics'>
      <ul>
        <li><Link to='/experiences'>Experiences</Link></li>
        <li><Link to='/techniques'>Techniques And Approaches</Link></li>
        <li><Link to='/summaries'>Summaries</Link></li>
      </ul>
    </div>
  )
}

export default Psychedelics
