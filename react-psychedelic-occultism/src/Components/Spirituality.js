import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';


import Slider from './Slider';
import QuoteSlider from './QuoteSlider';

import '../Styles/spirituality.css';
import '../Styles/slider.css';

const Spirituality = () => {
  const { id: spiritualityId } = useParams(); // Get the id from the URL
  const [spirituality, setSpirituality] = useState(null);
  const [summaries, setSummaries] = useState([]);
  const [summariesFetched, setSummariesFetched] = useState(false);
  const [ideaExplorations, setIdeaExplorations] = useState([]);
  const [ideaExplorationsFetched, setIdeaExplorationsFetched] = useState(false);
  const [sources, setSources] = useState([]);
  const [sourcesFetched, setSourcesFetched] = useState(false);
  const [people, setPeople] = useState([]);
  const [peopleFetched, setPeopleFetched] = useState(false);

  const location = useLocation();

  useEffect(() => {
    fetch(`http://localhost:3001/api/spirituality/${spiritualityId}`)
      .then((response) => response.json())
      .then((data) => setSpirituality(data))
      .catch((error) => console.error('Error fetching spirituality:', error));
  }, [spiritualityId]);

  useEffect(() => {
    const fetchSummaries = async () => {
      if (!spirituality) return; // Avoid fetching summaries until spirituality is loaded
      try {
        const response = await fetch(
          `http://localhost:3001/api/spirituality/${spiritualityId}/summaries`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Data from fetchSummaries is:', data);
        setSummaries(data);
        setSummariesFetched(true);
      } catch (err) {
        console.error('Error fetching summaries:', err);
      }
    };
    fetchSummaries();
  }, [spirituality, spiritualityId]);

  useEffect(() => {
    const fetchIdeaExplorations = async () => {
      if (!spirituality) return; // Avoid fetching idea explorations until spirituality is loaded
      try {
        const response = await fetch(
          `http://localhost:3001/api/spirituality/${spiritualityId}/ideaExplorations`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Data from fetchIdeaExplorations is:', data);
        setIdeaExplorations(data);
        setIdeaExplorationsFetched(true);
      } catch (err) {
        console.error('Error fetching idea explorations:', err);
      }
    };
    fetchIdeaExplorations();
  }, [spirituality, spiritualityId]);

  useEffect(() => {
    const fetchSources = async () => {
      if (!spirituality) return; // Avoid fetching sources until spirituality is loaded
      try {
        const response = await fetch(
          `http://localhost:3001/api/spirituality/${spiritualityId}/sources`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Data from fetchSources is:', data);
        setSources(data);
        setSourcesFetched(true);
      } catch (err) {
        console.error('Error fetching sources:', err);
      }
    };
    fetchSources();
  }, [spirituality, spiritualityId]);

  useEffect(() => {
    const fetchPeople = async () => {
      if (!spirituality) return; // Avoid fetching people until spirituality is loaded
      try {
        const response = await fetch(
          `http://localhost:3001/api/spirituality/${spiritualityId}/people`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Data from fetchPeople is:', data);
        setPeople(data); // Set the fetched people data
        setPeopleFetched(true); // Indicate that people have been fetched
      } catch (err) {
        console.error('Error fetching people:', err);
      }
    };
    fetchPeople();
  }, [spirituality, spiritualityId]);
  

  if (!spirituality) {
    return <div>Loading...</div>;
  }

  return (
    <div className='spirituality'>
      <h1>{spirituality.name}</h1>
      <p>{spirituality.defaultDescription}</p>
      <div className='quotes'>
        <h2>Relevant Quotes</h2>
        <QuoteSlider />
      </div>
      <div className="people-list">
      <h2>Associated People</h2>
      {peopleFetched && people.length > 0 ? (
        <ul>
          {people.map((person) => (
            <li key={person._id}>
              <div className="person">
                <p><Link to={`/people/${person.slug}`}>{person.name}</Link></p>
              </div>
            </li>
          ))}
        </ul>
      ) : peopleFetched ? (
        <p>No people associated with this spirituality.</p>
      ) : (
        <p>Loading people...</p>
      )}
    </div>

      <div className='summaries'>
        <h2>Summaries</h2>
        <ul>
          {(Array.isArray(summaries) ? summaries : []).map((summary, index) => (
            <li key={index}>
              <a href={`${location.pathname}/summaries/${summary._id}`}>
                {summary.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className='ideaExplore'>
        <h2>Exploration of Ideas</h2>
        <ul>
          {(Array.isArray(ideaExplorations) ? ideaExplorations : []).map(
            (ideaExploration, index) => (
              <li key={index}>
                <a
                  href={`${location.pathname}/ideaExplorations/${ideaExploration._id}`}
                >
                  {ideaExploration.title}
                </a>
              </li>
            )
          )}
        </ul>
      </div>
      <h2>Relevant Books</h2>
      <Slider items={Array.isArray(sources) ? sources : []} />
    </div>
  );
};

export default Spirituality;
