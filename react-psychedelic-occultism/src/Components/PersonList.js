import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// import '../Styles/people.css';

const PersonList = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/people/all')
      .then((res) => res.json())
      .then((data) => setPeople(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    console.log(people);
  }, [people]);

  return (
    <div id="people">
      <h3>People</h3>
      <ul>
        {people.map((person) => (
          <li key={person._id}>
            <h2>
              <Link to={`/people/${person.slug}`}>{person.name}</Link>
            </h2>
            <p>{person.bio}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonList;


