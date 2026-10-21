import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import AddToWebButton from './AddToWebButton';
import QuoteSlider from './QuoteSlider';
import Slider from './Slider';
import Associations from './Associations';

import '../Styles/person.scss';

const Person = ({ activeDropdownId, setActiveDropdownId }) => {
  const { slug } = useParams();
  const [person, setPerson] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchPersonDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const [personResponse, quotesResponse, sourcesResponse] = await Promise.all([
          fetch(`http://localhost:3001/api/people/${slug}`),
          fetch(`http://localhost:3001/api/people/${slug}/quotes`),
          fetch(`http://localhost:3001/api/people/${slug}/sources`),
        ]);

        if (!personResponse.ok || !quotesResponse.ok || !sourcesResponse.ok) {
          throw new Error(
            `Failed to fetch: ${
              !personResponse.ok
                ? 'person data'
                : !quotesResponse.ok
                ? 'quotes'
                : 'sources'
            }`
          );
        }

        const personData = await personResponse.json();
        const quotesData = await quotesResponse.json();
        const sourcesData = await sourcesResponse.json();

        setPerson(personData);
        setQuotes(quotesData);
        setSources(sourcesData);
      } catch (error) {
        console.error('Error fetching person details:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonDetails();
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!person) {
    return <div>Person not found.</div>;
  }

  return (
    <div className='person'>
      <h1>{person.name}</h1>
      <img src={person.image} alt={person.name} />
      <p>{person.bio}</p>

      <h2>Quotes</h2>
        <QuoteSlider quotes={quotes} />
      <h2>Sources</h2>

      {sources.length > 0 ? (
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
      ) : (
        <p>No sources found for this person.</p>
      )}
      <AddToWebButton refModel='Person' refId={person._id} />
        <Associations
          refModel="Person"
          refId={person._id}
        />
    </div>
  );
};

export default Person;