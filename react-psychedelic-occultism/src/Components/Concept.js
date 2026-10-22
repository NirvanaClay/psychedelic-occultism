
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Associations from './Associations';

import '../Styles/concept.scss';

const Concept = () => {
  const { slug } = useParams();

  const [concept, setConcept] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchConcept = async () => {
      setLoading(true);
      setError(null);
      setConcept(null);

      try {
        const response = await fetch(
          `http://localhost:3001/api/concepts/${encodeURIComponent(slug)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch concept');
        }

        const data = await response.json();
        setConcept(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error fetching concept:', err);
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchConcept();

    return () => controller.abort();
  }, [slug]);

  if (loading) return <div>Loading concept...</div>;
  if (error) return <div>{error}</div>;
  if (!concept) return <div>Concept not found.</div>;

  return (
    <div className="concept">
      <header className="concept__header">
        <h1>{concept.name}</h1>

        {concept.summary && (
          <p className="concept__summary">
            {concept.summary}
          </p>
        )}
      </header>

      <Associations
        refModel="Concept"
        refId={concept._id}
      />
    </div>
  );
};

export default Concept;
