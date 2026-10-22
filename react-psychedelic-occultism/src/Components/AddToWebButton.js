import { useState, useEffect, useRef, useParams } from 'react';
import { fetchWebs, updateWeb, createWeb } from "../api/webs.js";
import "../Styles/addToWebButton.scss";

const DROPDOWN_TOGGLE_EVENT = 'add-to-web-dropdown-toggle';  // ← new constant

const AddToWebButton = ({ refModel, refId, className, title, children }) => {
  const [creatingWeb, setCreatingWeb] = useState(false);
  const [newWebTitle, setNewWebTitle] = useState('');
  const [webs, setWebs] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({ top: 0, left: 0 });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const buttonRef = useRef(null);
  const containerRef = useRef(null);  // ← new ref for click-outside

  // useEffect(() => {
  //   fetchWebs()
  //     .then((data) => {
  //       console.log('Fetched webs:', data);
  //       setWebs(data);
  //     })
  //     .catch((err) => {
  //       console.error('Error fetching webs:', err);
  //     });
  // }, []);

  // Listen for other dropdowns opening → close this one
  useEffect(() => {
    const handleOtherToggle = (e) => {
      const openedRefId = e.detail?.refId;
      if (openedRefId !== refId && showDropdown) {
        setShowDropdown(false);
        setErrorMessage('');
        setSuccessMessage('');
      }
    };

    window.addEventListener(DROPDOWN_TOGGLE_EVENT, handleOtherToggle);

    return () => {
      window.removeEventListener(DROPDOWN_TOGGLE_EVENT, handleOtherToggle);
    };
  }, [showDropdown, refId]);  // deps ok here

  const toggleDropdown = () => {
    const willBeOpen = !showDropdown;

    if (willBeOpen) {
      // Position calculation
      if (!buttonRef.current) return;

      const buttonRect = buttonRef.current.getBoundingClientRect();
      const dropdownWidth = 180;
      const dropdownHeight = 120;

      let top = buttonRect.height + 5;
      let left = buttonRect.width / 2 - dropdownWidth / 2;

      if (left < 10) left = 10;
      if (left + dropdownWidth > window.innerWidth - 10) {
        left = window.innerWidth - dropdownWidth - 10;
      }
      if (buttonRect.top + top + dropdownHeight > window.innerHeight) {
        top = -dropdownHeight - 10;
      }

      setDropdownStyle({ top, left });

      // Tell all other buttons to close
      window.dispatchEvent(
        new CustomEvent(DROPDOWN_TOGGLE_EVENT, { detail: { refId } })
      );
    }

    setShowDropdown(willBeOpen);
    setErrorMessage('');
    setSuccessMessage('');

    if (willBeOpen) {
      const token = localStorage.getItem('token');

      if (!token) {
        setErrorMessage('Please log in or create an account to add items to a Web.');
        return;
      }

      fetchWebs()
        .then(setWebs)
        .catch((err) => {
          console.error('Error fetching webs:', err);
          setErrorMessage('Failed to load Webs.');
        });
    }
  };

  // Optional: close on click outside (bonus polish)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && containerRef.current && !containerRef.current.contains(event.target)) {
        setShowDropdown(false);
        setErrorMessage('');
        setSuccessMessage('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

      const handleCreateWeb = async () => {
      const title = newWebTitle.trim();

      if (!title) {
        setErrorMessage('Please enter a web title.');
        return;
      }

      try {
        setErrorMessage('');

        const newWeb = await createWeb({
          title,
          description: '',
          nodes: [],
        });

        if (!newWeb) {
          setErrorMessage('Failed to create web.');
          return;
        }

        const response = await updateWeb(newWeb._id, {
          refModel,
          refId,
        });

        if (response?.error) {
          setErrorMessage(response.error);
          return;
        }
        console.log(response)
        setWebs((currentWebs) => [...currentWebs, newWeb]);
        setNewWebTitle('');
        setCreatingWeb(false);
        setShowDropdown(false);
        setSuccessMessage('Web created and item added successfully!');
      } catch (err) {
        console.error('Error creating web:', err);

        setErrorMessage(
          err?.response?.data?.error ||
          err?.response?.data?.message ||
          err.message ||
          'Something went wrong while creating the web.'
        );
      }
    };

  // Your handleAddToWeb stays 100% unchanged
  const handleAddToWeb = async (webId) => {
    try {
      const newNode = { refModel, refId };
      console.log("→ Sending request to add to web", webId);
      
      const response = await updateWeb(webId, newNode);
      console.log("→ Raw response:", response);
      console.log("→ response.error exists?", !!response?.error);
      console.log("→ error value:", response?.error);

      if (response.error) {
        console.log("Entering error branch. Setting message to:", response.error);
        setErrorMessage(response.error);
        return;
      }

      console.log("Success path");
      setSuccessMessage('Added to Web successfully!');
      setShowDropdown(false);  // closes this dropdown on success
    } catch (err) {
      console.error("→ Caught error:", err);
      console.error("→ Full error object:", JSON.stringify(err, null, 2));
      console.error("→ err.response?.data?", err?.response?.data);

      let message = 'Something went wrong while adding to the web.';

      if (err?.response?.status === 401) {
        message = 'Please log in to add items to a web.';
      } else if (err?.response?.status === 400) {
        message = err?.response?.data?.error || 'Invalid request – check the details.';
      } else if (err?.response) {
        message = err.response.data?.error || err.response.data?.message || `Server error (${err.response.status})`;
      } else {
        message = err.message || 'Network issue – please check your connection.';
      }

      setErrorMessage(message);
    }
  };

  return (
    <div className="add-to-web-container" ref={containerRef}>
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className={`add-to-web-button ${className || ''}`}
        title={title}
      >
        {children || 'Add to Web'}  {/* ← preserves plus icon or text */}
      </button>

      {showDropdown && (
        <div className="dropdown-menu show" style={{ top: `${dropdownStyle.top}px`, left: `${dropdownStyle.left}px` }}>
          <p>Select a web:</p>
          {errorMessage && (
            <div className="error-message dropdown-error">{errorMessage}</div>
          )}
          <ul>
            {webs.map((web) => (
              <li key={web._id} onClick={() => handleAddToWeb(web._id)}>
                {web.title}
              </li>
            ))}
          </ul>
          {webs.length === 0 && (
            <p>You haven't created any webs yet.</p>
          )}

          {creatingWeb ? (
            // <div className="create-web-form">
            <form
              className="create-web-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateWeb();
              }}
            >
              <input
                type="text"
                value={newWebTitle}
                onChange={(e) => setNewWebTitle(e.target.value)}
                placeholder="Web title"
              />

              <button
                type="submit"
              >
                Create
              </button>

              <button
                type="button"
                onClick={() => {
                  setCreatingWeb(false);
                  setNewWebTitle('');
                  setErrorMessage('');
                }}
              >
                Cancel
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setCreatingWeb(true)}
            >
              + Create new web
            </button>
          )}
        </div>
      )}

      {showDropdown && <div className="dropdown-spacer"></div>}

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </div>
  );
};

export default AddToWebButton;