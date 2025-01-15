import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import Slider from './Slider'
import QuoteSlider from './QuoteSlider'

import '../Styles/spirituality.css';
import '../Styles/slider.css'

const Spirituality = () => {
  const { id: spiritualityId } = useParams(); // Get the id from the URL
  const [spirituality, setSpirituality] = useState(null);
  const [summaries, setSummaries] = useState([]);
  const [summariesFetched, setSummariesFetched] = useState(false);
  const [ideaExplorations, setIdeaExplorations] = useState([]);
  const [ideaExplorationsFetched, setIdeaExplorationsFetched] = useState(false);
  const [sources, setSources] = useState([]);
  const [sourcesFetched, setSourcesFetched] = useState(false);

  const location = useLocation()

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
              console.log('Data from fetchSummaries is:');
              console.log(data);
              // const summaryTexts = data.map((summary) => summary.content);
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
        if (!spirituality) return; // Avoid fetching summaries until spirituality is loaded
        try {
            const response = await fetch(
                `http://localhost:3001/api/spirituality/${spiritualityId}/ideaExplorations`
            );
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Data from fetchIdeaExplorations is:');
            console.log(data);
            // const summaryTexts = data.map((summary) => summary.content);
            setIdeaExplorations(data);
            setIdeaExplorationsFetched(true);
        } catch (err) {
            console.error('Error fetching summaries:', err);
        }
    };
    fetchIdeaExplorations();
}, [spirituality, spiritualityId]);

useEffect(() => {
  const fetchSources = async () => {
      if (!spirituality) return; // Avoid fetching summaries until spirituality is loaded
      try {
          const response = await fetch(
              `http://localhost:3001/api/spirituality/${spiritualityId}/sources`
          );
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log('Data from fetchSources is:');
          console.log(data);
          setSources(data);
          setSourcesFetched(true);
      } catch (err) {
          console.error('Error fetching summaries:', err);
      }
  };
  fetchSources();
}, [spirituality, spiritualityId])

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
          <div className='summaries'>
            <h2>Summaries</h2>
            <ul>
              {summaries.map((summary, index) => (
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
              {ideaExplorations.map((ideaExploration, index) => (
                <li key={index}>
                  <a href={`${location.pathname}/ideaExplorations/${ideaExploration._id}`}>
                    {ideaExploration.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <h2>Relevant Books</h2>
          <Slider items={sources} />
        </div>
    );
};

export default Spirituality;

