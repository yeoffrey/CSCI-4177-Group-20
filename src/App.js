import React, { useState, useEffect } from 'react';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('https://www.googleapis.com/books/v1/volumes?q=harry+potter')
      .then(response => response.json())
      .then(data => {
        setBooks(data.items.map(book => {
          return {
            title: book.volumeInfo.title,
            cover: book.volumeInfo.imageLinks.thumbnail,
            price: book.saleInfo.listPrice.amount
          };
        }));
      });
  }, []);

  return (
    <div>
      <h1>Books</h1>
      <ul>
        {books.map(book => (
          <li key={book.title}>
            <img src={book.cover} alt={book.title} />
            <h2>{book.title}</h2>
            <p>{book.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
