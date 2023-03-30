import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    // Fetch book details
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((error) => console.log(error));

    // Fetch reviews
    fetch(`http://localhost:8080/api/reviews/${id}`)
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.log(error));
  }, [id]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const review = { name, review: body, bookId: id };
    fetch("http://localhost:8080/api/reviews/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    })
      .then(() => {
        setReviews([...reviews, review]);
        setName("");
        setBody("");
      })
      .catch((error) => console.log(error));
  };

  if (!book) {
    return <div>Loading book details...</div>;
  }

  const { volumeInfo } = book;

  return (
    <div>
      <h2>{volumeInfo.title}</h2>
      <p>{volumeInfo.authors && volumeInfo.authors.join(", ")}</p>
      <p>{volumeInfo.publishedDate}</p>
      <img
        src={volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail}
        alt={volumeInfo.title}
      />
      <p>{volumeInfo.description}</p>
      <h1>Add Review</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Enter your name"
            onChange={handleNameChange}
          />
        </div>
        <div className="form-input">
          <textarea
            name="body"
            cols="30"
            rows="10"
            value={body}
            placeholder="Enter your review"
            onChange={handleBodyChange}
          ></textarea>
        </div>

        <button>Submit</button>
      </form>

      <h1>Reviews</h1>
      <ul>
        {reviews.map((review) => (
          <li key={review._id}>
            <p>{review.name}</p>
            <p>{review.review}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookDetails;