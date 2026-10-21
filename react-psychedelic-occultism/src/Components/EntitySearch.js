
import { useEffect, useState } from 'react';
import '../Styles/entitySearch.scss';

const API_URL = 'http://localhost:3001/api';

const EntitySearch = ({ onSelect, excludeEntity = null }) => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const search = query.trim();

    if (!search) {
      setResults([]);
      setError('');
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const timeout = setTimeout(async () => {
      setLoading(true);
      setError('');

      try {
        const params = new URLSearchParams({ q: search });

        if (type) {
          params.set('type', type);
        }

        const response = await fetch(
          `${API_URL}/entity-search?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error('Failed to search entities');
        }

        const data = await response.json();

        const filtered = (data.results || []).filter((entity) => {
          if (!excludeEntity) return true;

          return !(
            entity.refModel === excludeEntity.refModel &&
            String(entity.refId) === String(excludeEntity.refId)
          );
        });

        setResults(filtered);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setResults([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 300);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query, type, excludeEntity?.refModel, excludeEntity?.refId]);

  const handleSelect = (entity) => {
    onSelect(entity);
    setQuery('');
    setResults([]);
  };

  return (
    <div className="entity-search">
      <div className="entity-search__controls">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for an entity..."
          aria-label="Search entities"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          aria-label="Filter entity type"
        >
          <option value="">All types</option>
          <option value="Concept">Concepts</option>
          <option value="Source">Sources</option>
          <option value="Person">People</option>
        </select>
      </div>

      {loading && (
        <p className="entity-search__message">Searching...</p>
      )}

      {error && (
        <p className="entity-search__error" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && query.trim() && (
        <div className="entity-search__results">
          {results.length === 0 ? (
            <p className="entity-search__message">
              No matching entities found.
            </p>
          ) : (
            results.map((entity) => (
              <button
                type="button"
                key={`${entity.refModel}-${entity.refId}`}
                className="entity-search__result"
                onClick={() => handleSelect(entity)}
              >
                <span className="entity-search__name">
                  {entity.name}
                </span>

                <span className="entity-search__type">
                  {entity.refModel}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default EntitySearch;
