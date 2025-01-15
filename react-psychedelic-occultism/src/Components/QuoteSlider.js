import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import '../Styles/quoteslider.css';

const QuoteSlider = () => {
  const [currentQuote, setCurrentQuote] = useState(null);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quotes, setQuotes] = useState([]);
  const [quotesFetched, setQuotesFetched] = useState(false);
  const [fadeState, setFadeState] = useState('');

  const hasMounted = useRef(false);

  const { id: spiritualityId } = useParams();

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/spirituality/${spiritualityId}/quotes`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("Data from fetchQuotes is:")
        console.log(data)
        const quoteTexts = data.map((quote) => quote.text);
        setQuotes(quoteTexts);
        setQuotesFetched(true);
      } catch (err) {
        console.error('Error fetching quotes:', err);
      }
    };
    fetchQuotes();
  }, [spiritualityId]);

  const fetchRandomQuote = useCallback(() => {
    const availableIndices = quotes
      .map((_, index) => index)
      .filter((index) => index !== quoteIndex);

    const newIndex =
      availableIndices[Math.floor(Math.random() * availableIndices.length)];
    setQuoteIndex(newIndex);
  }, [quotes, quoteIndex]);

  // Initial load to set the first quote
  useEffect(() => {
    if (quotesFetched && quotes.length > 0) {
      setCurrentQuote(quotes[quoteIndex]);
      setQuotesFetched(false);
      hasMounted.current = true; // Moved here
    }
  }, [quotesFetched, quoteIndex, quotes]);

  // Fade effect on quote change
  useEffect(() => {
    if (hasMounted.current) {
      setFadeState('fade fade-out');
      const timeoutId = setTimeout(() => {
        setCurrentQuote(quotes[quoteIndex]);
        setFadeState('fade fade-in');
      }, 600);
      return () => clearTimeout(timeoutId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quoteIndex]);

  const fetchNewQuote = () => {
    fetchRandomQuote();
  };

  const handleFavoriteQuote = () => {
    console.log('Quote favorited:', currentQuote);
  };

  return (
    <div className="quote-container">
      <div className="quote">
        <p className={fadeState}>{currentQuote}</p>
      </div>
      <div className="quote-icons">
        <i
          onClick={handleFavoriteQuote}
          className="fas fa-heart favorite-icon"
          aria-label="Favorite Quote"
          title="Favorite Quote"
        ></i>
        <i
          onClick={fetchNewQuote}
          className="fas fa-sync-alt refresh-icon"
          aria-label="New Quote"
          title="New Quote"
        ></i>
      </div>
    </div>
  );
};

export default QuoteSlider;
