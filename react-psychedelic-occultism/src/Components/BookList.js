import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// import '../Styles/books.css';

const Books = () => {
  const [books, setBooks] = useState([]);

  // Fetch books directly inside useEffect
  useEffect(() => {
    fetch('http://localhost:3001/api/books/all')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error));
  }, []); // Empty dependency array ensures this runs only once on component mount

  useEffect(() => {
    console.log("books are:", books)
  }, [books])

  return (
    <div id='books'>
      <h3>Books</h3>
      <ul>
        {books.map(book => (
          <li key={book._id}>
            <h2>
              <Link to={`/books/${book._id}`}>{book.title}</Link>
            </h2>
            <p>{book.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;
