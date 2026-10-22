
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import '../Styles/entityList.scss';

const Concepts = () => {
  const [concepts, setConcepts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchConcepts = async () => {
      try {
        const response = await fetch(
          'http://localhost:3001/api/concepts/all',
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch concepts');
        }

        const data = await response.json();
        setConcepts(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error fetching concepts:', err);
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchConcepts();

    return () => controller.abort();
  }, []);

  const filteredConcepts = concepts
    .filter((concept) =>
      concept.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="concepts">
      <h1>Concepts</h1>

      <p className="concepts__intro">
        Explore concepts, their meanings, and their connections
        to other ideas, people, and sources.
      </p>

      <input
        type="text"
        className="concepts__search"
        placeholder="Search concepts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p>Loading concepts...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : filteredConcepts.length === 0 ? (
        <p>No concepts found.</p>
      ) : (
        <div className="concepts__list">
          {filteredConcepts.map((concept) => (
            <Link
              to={`/concepts/${concept.slug}`}
              key={concept._id}
              className="concepts__item"
            >
              <h2>{concept.name}</h2>

              {concept.summary && (
                <p>{concept.summary}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Concepts;
