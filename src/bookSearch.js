import React, { useState } from "react";
import axios from "axios";

const bookSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [apiKey, setApiKey] = useState("AIzaSyDayUQL9JZHgC_Yk5rQFtFgfK59208X2JY")

  const handleSearch = async (e) => {
    e.preventDefault();
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`;
    const response = await axios.get(url);
    setBooks(response.data.items);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Books"
        />
        <button type="submit">Search</button>
      </form>
      {books.map((book) => (
        <div key={book.id}>
          <img
            src={book.volumeInfo.imageLinks?.thumbnail}
            alt={`${book.volumeInfo.title} cover`}
          />
          <h2>{book.volumeInfo.title}</h2>
          <p>{book.volumeInfo.subtitle}</p>
          <p>{book.volumeInfo.authors?.join(", ")}</p>
          <p>Price: {book.saleInfo.listPrice?.amount}</p>
        </div>
      ))}
    </div>
  );
};

export default bookSearch;
