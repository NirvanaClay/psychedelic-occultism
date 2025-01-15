import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Book = () => {
  const { id1, id2 } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/spirituality/${id1}/sources/${id2}`)
      .then(response => response.json())
      .then((data) => {
        console.log('Fetched Data:', data); // Log the data for debugging
        setBook(data); // Update the state only after confirming data is correct
      })
      .catch(error => console.error('Error fetching summary:', error));
  }, [id1, id2]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div id='book'>
      <h1>{book.title}</h1>
      <p>{book.description}</p>
    </div> 
  )
}

export default Book
