import './App.css'
import React, { useState, useEffect } from 'react';
function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const fetchQuote = async () => {
    const res = await fetch("https://corsproxy.io/?https://zenquotes.io/api/random");
    const data = await res.json();
    setQuote(data[0].q);
    setAuthor(data[0].a);
  };
  useEffect(() => {
    fetchQuote();
  }, []);
  return (
    <div className="All">
      <div className="quote-box" id="quote-box">
        <h1 className="title">Random Quote Machine</h1> 
        {quote && (
          <p className="quote-text" id="text">{quote}</p>
          )}
        {author && (
          <p className="quote-author" id="author">{author}</p>
          )}
        <div className="buttons">
          <button className="new-quote" id="new-quote" onClick={fetchQuote}>New Quote</button>
          <a
            className="tweet-quote"
            id="tweet-quote"
            href={`https://twitter.com/intent/tweet?text="${quote}" - ${author}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-twitter"></i> Tweet Quote
          </a> 
        </div>

      </div>
    </div>
  )
}

export default App
