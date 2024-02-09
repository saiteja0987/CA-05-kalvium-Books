import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Components/HomePage.css";

function BooksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [result, setResult] = useState("");

  useEffect(() => {
    axios
      .get("https://reactnd-books-api.udacity.com/books", {
        headers: {
          Authorization: "whatever-you-want",
        },
      })
      .then((response) => {
        setBooks(response.data.books);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  const filteredData = books.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value === "") {
      setResult("");
    } else {
      setResult(filteredData.length > 0 ? "Show the results" : "no result found");
    }
  };

  return (
    <div className="mainpage">
      <div className="header">
        <img
          className="logo"
          src="https://kalvium.com/wp-content/uploads/2022/07/Logo-nav.png"
          alt="Kalvium Logo"
        />
        <Link to="/register">
          <button className="button">Register</button>
        </Link>
      </div>
      <input
        id="searchbox"
        type="text"
        placeholder="Search your books"
        value={searchTerm}
        onChange={handleInputChange}
      />

      <p className="results">{result}</p>
      <div className="Books">
        {filteredData.map((item) => (
          <div key={item.id} className="book">
            <img src={item.imageLinks.thumbnail} alt={item.title} />
            <h4>{item.title}</h4>
            <p>
              <span>
                <h3>{item.averageRating || "UR"}</h3>
                <h3 className="cost">Free</h3>
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BooksPage;
