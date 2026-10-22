import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import '../Styles/entityList.scss';

const Sources = () => {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchSources = async () => {
      try {
        const response = await fetch(
          'http://localhost:3001/api/sources/all',
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch sources');
        }

        const data = await response.json();
        setSources(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error fetching sources:', err);
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchSources();

    return () => controller.abort();
  }, []);

  const filteredSources = sources
    .filter((source) =>
      source.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="entity-list">
      <h1>Sources</h1>

      <p className="entity-list__intro">
        Explore books, writings, and other sources of knowledge,
        and discover their connections to people and concepts.
      </p>

      <input
        type="text"
        className="entity-list__search"
        placeholder="Search sources..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p>Loading sources...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : filteredSources.length === 0 ? (
        <p>No sources found.</p>
      ) : (
        <div className="entity-list__items">
          {filteredSources.map((source) => (
            <Link
              to={`/sources/${source._id}`}
              key={source._id}
              className="entity-list__item"
            >
              <h2>{source.title}</h2>

              {source.description && (
                <p>{source.description}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sources;
