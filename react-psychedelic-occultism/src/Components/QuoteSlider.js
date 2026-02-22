import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import '../Styles/quoteslider.css';

import { fetchWebs, updateWeb } from '../api/webs.js';

const QuoteSlider = () => {
  const [currentQuote, setCurrentQuote] = useState(null);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quotes, setQuotes] = useState([]);
  const [quotesFetched, setQuotesFetched] = useState(false);
  const [fadeState, setFadeState] = useState('');

  const [webs, setWebs] = useState([]);  // List of webs
  const [showDropdown, setShowDropdown] = useState(false);  // Controls dropdown visibility

  const hasMounted = useRef(false);
  const { id: spiritualityId } = useParams();

  useEffect(() => {
    fetchWebs().then(setWebs); // Fetch webs on mount
  }, []);

  const handleAddToWeb = async (webId) => {
    try {
      const selectedWeb = webs.find(web => web._id === webId);
      if (!selectedWeb) {
        console.error("Web not found");
        return;
      }

      // Update web with new quote
      const updatedWeb = {
        ...selectedWeb,
        nodes: [
          ...selectedWeb.nodes,
          { refModel: "Quote", refId: currentQuote._id }
        ]
      };

      await updateWeb(webId, updatedWeb);

      alert(`Quote added to ${selectedWeb.title} successfully!`);
      setShowDropdown(false); // Hide dropdown after selection
    } catch (error) {
      console.error("Error adding quote to web:", error);
    }
  };

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/spirituality/${spiritualityId}/quotes`
        );
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        setQuotes(data);
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
      .filter(index => index !== quoteIndex);

    const newIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    setQuoteIndex(newIndex);
  }, [quotes, quoteIndex]);

  useEffect(() => {
    if (quotesFetched && quotes.length > 0) {
      setCurrentQuote(quotes[quoteIndex]);
      setQuotesFetched(false);
      hasMounted.current = true;
    }
  }, [quotesFetched, quoteIndex, quotes]);

  useEffect(() => {
    if (hasMounted.current) {
      setFadeState('fade fade-out');
      const timeoutId = setTimeout(() => {
        setCurrentQuote(quotes[quoteIndex]);
        setFadeState('fade fade-in');
      }, 600);
      return () => clearTimeout(timeoutId);
    }
  }, [quoteIndex]);

  const fetchNewQuote = () => fetchRandomQuote();

  return (
    <div className="quote-container">
      {currentQuote ? (
        <>
          <div className="quote">
            <p className={fadeState}>{currentQuote.text}</p>
            <p>{currentQuote.person?.name || 'Unknown Author'}</p>
          </div>
          <div className="quote-icons">
            {/* Web selection button */}
            <div className="dropdown-container">
              <img
                src="/images/Web.png"
                onClick={() => setShowDropdown(!showDropdown)}
                className="dropdown-trigger"
              />

              {/* Dropdown list */}
              {showDropdown && (
                <div className="dropdown-menu">
                  <p>Select a web:</p>
                  <ul>
                    {webs.map((web) => (
                      <li key={web._id} onClick={() => handleAddToWeb(web._id)}>
                        {web.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* New Quote Button */}
            <i
              onClick={fetchNewQuote}
              className="fas fa-sync-alt refresh-icon"
              aria-label="New Quote"
              title="New Quote"
            ></i>
          </div>
        </>
      ) : (
        <div>Loading quote...</div>
      )}
    </div>
  );
};

export default QuoteSlider;
