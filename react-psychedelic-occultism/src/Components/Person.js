import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import AddToWebButton from './AddToWebButton';

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
      {quotes.length > 0 ? (
        <ul className='quotes-list'>
          {quotes.map((quote) => (
            <li key={quote._id} className='quote-item'>
              <span className='quote-text'>{quote.text}</span>

              <AddToWebButton
                refModel='Quote'
                refId={quote._id}
                isOpen={activeDropdownId === quote._id}
                onToggle={() => {
                  setActiveDropdownId(
                    activeDropdownId === quote._id ? null : quote._id
                  );
                }}
                className='quote-add-button'
                title='Add quote to web'
              >
                <i className='fas fa-plus'></i>
              </AddToWebButton>
            </li>
          ))}
        </ul>
      ) : (
        <p>No quotes found for this person.</p>
      )}

      <h2>Sources</h2>
      {sources.length > 0 ? (
        <ul>
          {sources.map((source) => (
            <li key={source._id}>
              <Link to={`/sources/${source._id}`}>{source.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No sources found for this person.</p>
      )}

      <AddToWebButton refModel='Person' refId={person._id} />
    </div>
  );
};

export default Person;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// import AddToWebButton from "./AddToWebButton"

// import '../Styles/person.css'

// const Person = () => {
//   const { slug } = useParams();
//   const [person, setPerson] = useState(null);
//   const [quotes, setQuotes] = useState([]);
//   const [sources, setSources] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!slug) return;

//     const fetchPersonDetails = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         // Fetch person, quotes, and sources in parallel
//         const [personResponse, quotesResponse, sourcesResponse] = await Promise.all([
//           fetch(`http://localhost:3001/api/people/${slug}`),
//           fetch(`http://localhost:3001/api/people/${slug}/quotes`),
//           fetch(`http://localhost:3001/api/people/${slug}/sources`),
//         ]);

//         // Handle HTTP errors for any response
//         if (!personResponse.ok || !quotesResponse.ok || !sourcesResponse.ok) {
//           throw new Error(
//             `Failed to fetch: ${
//               !personResponse.ok
//                 ? 'person data'
//                 : !quotesResponse.ok
//                 ? 'quotes'
//                 : 'sources'
//             }`
//           );
//         }

//         // Parse JSON responses
//         const personData = await personResponse.json();
//         const quotesData = await quotesResponse.json();
//         const sourcesData = await sourcesResponse.json();

//         // Update state
//         setPerson(personData);
//         setQuotes(quotesData);
//         setSources(sourcesData);
//       } catch (error) {
//         console.error('Error fetching person details:', error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPersonDetails();
//   }, [slug]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!person) {
//     return <div>Person not found.</div>;
//   }

//   return (
//     <div className='person'>
//       <h1>{person.name}</h1>
//       <img src={person.image} alt={person.name} />
//       <p>{person.bio}</p>

//       <h2>Quotes</h2>
//       {quotes.length > 0 ? (
//         <ul>
//           {quotes.map((quote) => (
//             <li key={quote._id}>{quote.text}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>No quotes found for this person.</p>
//       )}

//       <h2>Sources</h2>
//       {sources.length > 0 ? (
//         <ul>
//           {sources.map((source) => (
//             <li key={source._id}>
//               <a href={`/books/${source._id}`}>{source.title}</a>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No sources found for this person.</p>
//       )}
//       <AddToWebButton refModel="Person" refId={person._id} />
//     </div>
//   );
// };

// export default Person;
