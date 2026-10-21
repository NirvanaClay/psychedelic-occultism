import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import '../Styles/quoteslider.css';

import { fetchWebs, updateWeb } from '../api/webs.js';

import AddToWebButton from './AddToWebButton';

const QuoteSlider = ({ quotes = [] }) => {
  const [currentQuote, setCurrentQuote] = useState(null);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [fadeState, setFadeState] = useState('');

  const [webs, setWebs] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const hasMounted = useRef(false);

  useEffect(() => {
    fetchWebs()
      .then(setWebs)
      .catch((error) => {
        console.error('Error fetching webs:', error);
      });
  }, []);

  useEffect(() => {
    if (quotes.length === 0) {
      setCurrentQuote(null);
      setQuoteIndex(0);
      return;
    }

    setQuoteIndex(0);
    setCurrentQuote(quotes[0]);
    hasMounted.current = true;
  }, [quotes]);

  const handleAddToWeb = async (webId) => {
    if (!currentQuote) return;

    try {
      const selectedWeb = webs.find((web) => web._id === webId);

      if (!selectedWeb) {
        console.error('Web not found');
        return;
      }

      const quoteAlreadyAdded = selectedWeb.nodes.some(
        (node) =>
          node.refModel === 'Quote' &&
          String(node.refId) === String(currentQuote._id)
      );

      if (quoteAlreadyAdded) {
        alert(`This quote is already in ${selectedWeb.title}.`);
        setShowDropdown(false);
        return;
      }

      const updatedWeb = {
        ...selectedWeb,
        nodes: [
          ...selectedWeb.nodes,
          {
            refModel: 'Quote',
            refId: currentQuote._id,
          },
        ],
      };

      const savedWeb = await updateWeb(webId, updatedWeb);

      setWebs((previousWebs) =>
        previousWebs.map((web) =>
          web._id === webId ? savedWeb || updatedWeb : web
        )
      );

      alert(`Quote added to ${selectedWeb.title} successfully!`);
      setShowDropdown(false);
    } catch (error) {
      console.error('Error adding quote to web:', error);
    }
  };

  const fetchRandomQuote = useCallback(() => {
    if (quotes.length <= 1) return;

    const availableIndices = quotes
      .map((_, index) => index)
      .filter((index) => index !== quoteIndex);

    const newIndex =
      availableIndices[
        Math.floor(Math.random() * availableIndices.length)
      ];

    setQuoteIndex(newIndex);
  }, [quotes, quoteIndex]);

  useEffect(() => {
    if (!hasMounted.current || !quotes[quoteIndex]) return;

    setFadeState('fade fade-out');

    const timeoutId = setTimeout(() => {
      setCurrentQuote(quotes[quoteIndex]);
      setFadeState('fade fade-in');
    }, 600);

    return () => clearTimeout(timeoutId);
  }, [quoteIndex, quotes]);

  return (
    <div className="quote-container">
      {currentQuote ? (
        <>
          <div className="quote">
            <p className={fadeState}>{currentQuote.text}</p>

            {currentQuote.person?.name && (
              <p>{currentQuote.person.name}</p>
            )}

            {currentQuote.source?.title && (
              <p>{currentQuote.source.title}</p>
            )}
          </div>

          <div className="quote-icons">
            <AddToWebButton
              refModel="Quote"
              refId={currentQuote._id}
              className="dropdown-trigger"
              title="Add quote to web"
            >
              <img src="/images/Web.png" alt="" />
            </AddToWebButton>
            {/* <div className="dropdown-container">
              <button
                type="button"
                className="dropdown-trigger"
                onClick={() => setShowDropdown((previous) => !previous)}
                aria-label="Add quote to web"
                title="Add quote to web"
              >
                <img src="/images/Web.png" alt="" />
              </button>

              {showDropdown && (
                <div className="dropdown-menu">
                  <p>Select a web:</p>

                  {webs.length > 0 ? (
                    <ul>
                      {webs.map((web) => (
                        <li key={web._id}>
                          <button
                            type="button"
                            onClick={() => handleAddToWeb(web._id)}
                          >
                            {web.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No webs available.</p>
                  )}
                </div>
              )}
            </div> */}

            <button
              type="button"
              onClick={fetchRandomQuote}
              className="refresh-button"
              aria-label="New quote"
              title="New quote"
              disabled={quotes.length <= 1}
            >
              <i className="fas fa-sync-alt refresh-icon"></i>
            </button>
          </div>
        </>
      ) : (
        <div>No quotes available.</div>
      )}
    </div>
  );
};

export default QuoteSlider;
