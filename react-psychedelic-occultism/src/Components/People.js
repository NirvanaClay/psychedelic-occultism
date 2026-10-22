
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import '../Styles/entityList.scss';

const People = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchPeople = async () => {
      try {
        const response = await fetch(
          'http://localhost:3001/api/people/all',
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch people');
        }

        const data = await response.json();
        setPeople(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error fetching people:', err);
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchPeople();

    return () => controller.abort();
  }, []);

  const filteredPeople = people
    .filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="entity-list">
      <h1>People</h1>

      <p className="entity-list__intro">
        Explore thinkers, philosophers, mystics, and other
        influential figures and their connections to ideas,
        traditions, and sources.
      </p>

      <input
        type="text"
        className="entity-list__search"
        placeholder="Search people..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p>Loading people...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : filteredPeople.length === 0 ? (
        <p>No people found.</p>
      ) : (
        <div className="entity-list__items">
          {filteredPeople.map((person) => (
            <Link
              to={`/people/${person.slug}`}
              key={person._id}
              className="entity-list__item"
            >
              <h2>{person.name}</h2>

              {person.bio && <p>{person.bio}</p>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default People;
