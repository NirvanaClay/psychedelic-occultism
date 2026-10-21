import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import AddToWebButton from './AddToWebButton';
import QuoteSlider from './QuoteSlider';
import Associations from './Associations';

import '../Styles/source.scss';

const Source = () => {
  const { id: sourceId } = useParams();

  const [source, setSource] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sourceId) return;

    const fetchSourceDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const [sourceResponse, quotesResponse] = await Promise.all([
          fetch(`http://localhost:3001/api/sources/${sourceId}`),
          fetch(`http://localhost:3001/api/sources/${sourceId}/quotes`),
        ]);

        if (!sourceResponse.ok || !quotesResponse.ok) {
          throw new Error(
            `Failed to fetch: ${
              !sourceResponse.ok ? 'source data' : 'quotes'
            }`
          );
        }

        const sourceData = await sourceResponse.json();
        const quotesData = await quotesResponse.json();

        setSource(sourceData);
        setQuotes(quotesData);
      } catch (error) {
        console.error('Error fetching source details:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSourceDetails();
  }, [sourceId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!source) {
    return <div>Source not found.</div>;
  }

  return (
    <div id='source'>
      <h1>{source.title}</h1>
      <h2>
        {source.people.map((person, index) => (
          <React.Fragment key={person._id}>
            {index > 0 && ', '}
            <Link to={`/people/${person.slug}`}>
              {person.name}
            </Link>
          </React.Fragment>
        ))}
      </h2>

      {source.image && (
        // <img src={source.image} alt={source.title} />
        <img
          className="source-image"
          src={source.image}
          alt={source.title}
        />
      )}

      <p>{source.description}</p>

      <h2>Quotes</h2>
      <QuoteSlider quotes={quotes} />

      <AddToWebButton refModel='Source' refId={source._id} />
      <Associations
        refModel="Source"
        refId={source._id}
      />
    </div>
  );
};

export default Source;
