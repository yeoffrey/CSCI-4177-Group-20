import { useState } from "react";
import axios from "axios";
//adding link component
import { Link } from "react-router-dom";
import "./bookSearch.css";

const BookSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [apiKey, setApiKey] = useState("AIzaSyDayUQL9JZHgC_Yk5rQFtFgfK59208X2JY")

  const HandleSearch = async (e) => {
    e.preventDefault();
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`;
    const response = await axios.get(url);
    setBooks(response.data.items);
  };

  const handleBorrow = (book) => {
    setBorrowedBooks([...borrowedBooks, book]);
  };

  return (
    <div>
      <h3>Borrowed books</h3>
      <ul>
        {borrowedBooks.map((book) => (
          <li key={book.id}>{book.volumeInfo.title}</li>
        ))}
      </ul>

      <form onSubmit={HandleSearch} style={{textAlign: "center"}}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Books"
        />
        <button type="submit">Search</button>
      </form>
      {books.map((book) => (
        <div key={book.id} className="book-card">
          {/* use link componment to the new page*/}
          <Link to={`/books/${book.id}`} key={book.id} className="book-card">
            <img
              src={book.volumeInfo.imageLinks?.thumbnail}
              alt={`${book.volumeInfo.title} cover`}
            />
            <h2>{book.volumeInfo.title}</h2>
          </Link>
          <p>{book.volumeInfo.subtitle}</p>
          <p>{book.volumeInfo.authors?.join(", ")}</p>
          <p>Price: {book.saleInfo.listPrice?.amount}</p>
          <button onClick={() => handleBorrow(book)}>Borrow</button>
        </div>
      ))}
    </div>
  );
};

export default BookSearch;