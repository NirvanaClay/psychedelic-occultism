import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';


import Slider from './Slider';
import QuoteSlider from './QuoteSlider';
import Associations from './Associations';

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
  const [quotes, setQuotes] = useState([]);
  const [quotesFetched, setQuotesFetched] = useState(false); // optional — add if you want consistency
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();

  useEffect(() => {
    console.log("Quotes are:")
    console.log(quotes)
    console.log("People are:")
    console.log(people)
    console.log("Sources are:")
    console.log(sources)
  }, [quotes, sources, people])

  useEffect(() => {
  if (!spiritualityId) return;

  const fetchSpiritualityDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      const [
        spiritualityResponse,
        quotesResponse,
        summariesResponse,
        ideaExplorationsResponse,
        sourcesResponse,
        peopleResponse,
      ] = await Promise.all([
        fetch(`http://localhost:3001/api/spirituality/${spiritualityId}`),
        fetch(`http://localhost:3001/api/spirituality/${spiritualityId}/quotes`),          // ← added this
        fetch(`http://localhost:3001/api/spirituality/${spiritualityId}/summaries`),
        fetch(`http://localhost:3001/api/spirituality/${spiritualityId}/ideaExplorations`),
        fetch(`http://localhost:3001/api/spirituality/${spiritualityId}/sources`),
        fetch(`http://localhost:3001/api/spirituality/${spiritualityId}/people`),
      ]);

      // Check all responses at once
      const failedFetch = [
        { name: 'spirituality', res: spiritualityResponse },
        { name: 'quotes', res: quotesResponse },
        { name: 'summaries', res: summariesResponse },
        { name: 'idea explorations', res: ideaExplorationsResponse },
        { name: 'sources', res: sourcesResponse },
        { name: 'people', res: peopleResponse },
      ].find(({ res }) => !res.ok);

      if (failedFetch) {
        throw new Error(`Failed to fetch ${failedFetch.name}`);
      }

      const [
        spiritualityData,
        quotesData,
        summariesData,
        ideaExplorationsData,
        sourcesData,
        peopleData,
      ] = await Promise.all([
        spiritualityResponse.json(),
        quotesResponse.json(),
        summariesResponse.json(),
        ideaExplorationsResponse.json(),
        sourcesResponse.json(),
        peopleResponse.json(),
      ]);

      setSpirituality(spiritualityData);
      setQuotes(quotesData);                      // ← new
      setSummaries(summariesData);
      setIdeaExplorations(ideaExplorationsData);
      setSources(sourcesData);
      setPeople(peopleData);

      // If you still use these flags, set them here
      setSummariesFetched(true);
      setIdeaExplorationsFetched(true);
      setSourcesFetched(true);
      setPeopleFetched(true);
      // add setQuotesFetched(true) if you have it

    } catch (error) {
      console.error('Error fetching spirituality details:', error);
      setError(error.message || 'Failed to load spirituality content');
    } finally {
      setLoading(false);
    }
  };

  fetchSpiritualityDetails();
}, [spiritualityId]);

  if (!spirituality) {
    return <div>Loading...</div>;
  }

  return (
    <div className='spirituality'>
      <h1>{spirituality.name}</h1>
      <p>{spirituality.defaultDescription}</p>
      <div className='quotes'>
        <h2>Relevant Quotes</h2>
        <QuoteSlider quotes={quotes} />
      </div>
      <h2>Relevant Sources</h2>

      <Slider
        items={Array.isArray(sources) ? sources : []}
        renderItem={(source) => (
          <>
            <Link to={`/sources/${source._id}`}>
              <img src={source.image} alt={source.title} />
            </Link>

            <Link to={`/sources/${source._id}`}>
              <h3>{source.title}</h3>
            </Link>

            <p>{source.description}</p>
          </>
        )}
      />
      <div className="people-list">
      <h2>Associated People</h2>
      {peopleFetched && people.length > 0 ? (
        <Slider
          items={Array.isArray(people) ? people : []}
          renderItem={(person) => (
            <>
              <Link to={`/people/${person.slug}`}>
                {person.image && (
                  <img src={person.image} alt={person.name} />
                )}
              </Link>

              <Link to={`/people/${person.slug}`}>
                <h3>{person.name}</h3>
              </Link>

              {person.bio && <p>{person.bio}</p>}
            </>
          )}
        />
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
      <h2>Techniques</h2>
      <Associations
        refModel="Spirituality"
        refId={spirituality._id}
      />
    </div>
  );
};

export default Spirituality;
