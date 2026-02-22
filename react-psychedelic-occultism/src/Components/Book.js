import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AddToWebButton from "./AddToWebButton"

import '../Styles/book.css'

const Book = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/books/${id}`)
      .then(response => response.json())
      .then((data) => {
        console.log('Fetched Data:', data); // Log the data for debugging
        setBook(data); // Update the state only after confirming data is correct
      })
      .catch(error => console.error('Error fetching summary:', error));
  }, [id]);

  console.log("book is:", book)

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div id='book'>
      <h1>{book.title}</h1>
      <img src={book.image} />
      <p>{book.description}</p>
      <AddToWebButton refModel="Book" refId={book._id} />
    </div> 
  )
}

export default Book
