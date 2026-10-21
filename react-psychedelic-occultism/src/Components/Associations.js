
import { useCallback, useEffect, useState } from 'react';
import EntitySearch from './EntitySearch';
import '../Styles/associations.scss';

import { Link } from 'react-router-dom';
import { getEntityUrl } from '../config/entityRoutes';

const API_URL = 'http://localhost:3001/api';

const Associations = ({ refModel, refId }) => {
  const [associations, setAssociations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const getHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

  const fetchAssociations = useCallback(async (signal) => {
    if (!refModel || !refId) {
      setAssociations([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${API_URL}/associations/${encodeURIComponent(refModel)}/${encodeURIComponent(refId)}`,
        {
          headers: getHeaders(),
          signal,
        }
      );

      if (!response.ok) {
        throw new Error('Failed to load associations');
      }

      const data = await response.json();
      setAssociations(data.associations || []);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, [refModel, refId]);

  useEffect(() => {
    const controller = new AbortController();

    fetchAssociations(controller.signal);

    return () => controller.abort();
  }, [fetchAssociations]);

  const getAssociatedEntity = (association) => {
    const isEntityA =
      association.entityA.refModel === refModel &&
      String(association.entityA.refId) === String(refId);

    return isEntityA
      ? association.entityB
      : association.entityA;
  };

  const handleAdd = async (entity) => {
    if (saving) return;

    setSaving(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/associations`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          subject: {
            refModel,
            refId,
          },
          association: {
            refModel: entity.refModel,
            refId: entity.refId,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add association');
      }

      await fetchAssociations();
      setShowSearch(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async (entity) => {
    if (saving) return;

    setSaving(true);
    setError('');

    try {
      const response = await fetch(
        `${API_URL}/associations/${encodeURIComponent(refModel)}/${encodeURIComponent(refId)}`,
        {
          method: 'DELETE',
          headers: getHeaders(),
          body: JSON.stringify({
            associationRefModel: entity.refModel,
            associationRefId: entity.refId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to remove association');
      }

      await fetchAssociations();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="associations">
      <div className="associations__header">
        <h2>Associations</h2>

        <button
          type="button"
          onClick={() => setShowSearch((current) => !current)}
          disabled={saving || !refId}
        >
          {showSearch ? 'Cancel' : 'Add Association'}
        </button>
      </div>

      {showSearch && (
        <div className="associations__search">
          <EntitySearch
            onSelect={handleAdd}
            excludeEntity={{ refModel, refId }}
          />
          {saving && <p>Saving association...</p>}
        </div>
      )}

      {error && (
        <p className="associations__error" role="alert">
          {error}
        </p>
      )}

      {loading ? (
        <p>Loading associations...</p>
      ) : associations.length === 0 ? (
        <p className="associations__empty">
          No associations yet.
        </p>
      ) : (
        <ul className="associations__list">
          {associations.map((association) => {
            const entity = getAssociatedEntity(association);
            const entityUrl = getEntityUrl(entity);

            return (
              <li
                key={association._id}
                className="associations__item"
              >
                <div className="associations__details">
                {entityUrl ? (
                  <Link to={entityUrl} className="associations__name">
                    {entity.name || 'Unnamed entity'}
                  </Link>
                ) : (
                  <span className="associations__name">
                    {entity.name || 'Unnamed entity'}
                  </span>
                )}

                  <span className="associations__type">
                    {entity.refModel}
                  </span>
                </div>

                <button
                  type="button"
                  className="associations__remove"
                  onClick={() => handleRemove(entity)}
                  disabled={saving}
                  aria-label={`Remove association with ${entity.name || entity.refModel}`}
                >
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default Associations;
