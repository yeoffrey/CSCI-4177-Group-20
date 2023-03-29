import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Book() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Books</h1>
      <ul>
        {books.map(book => (
          <li key={book._id}>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Word count: {book.wordCount}</p>
            <p>Status: {book.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Book;