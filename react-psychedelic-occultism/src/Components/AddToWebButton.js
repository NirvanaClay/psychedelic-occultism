import { useState, useEffect, useRef } from 'react';
import { fetchWebs, updateWeb } from "../api/webs.js";
import "../Styles/addToWebButton.scss"; // SCSS file


const AddToWebButton = ({ refModel, refId }) => {
  const [webs, setWebs] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({ top: 0, left: 0 });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const buttonRef = useRef(null);

  const clearMessages = () => {
    setTimeout(() => {
      setErrorMessage('');
      setSuccessMessage('');
    }, 5000);
  };

  useEffect(() => {
    fetchWebs().then(setWebs);
  }, []);

  const handleAddToWeb = async (webId) => {
    try {
      const newNode = { refModel, refId };
      const response = await updateWeb(webId, newNode);

      if (response.error) {
        setErrorMessage(response.error);
        clearMessages();
        return;
      }

      setSuccessMessage('Added to Web successfully!');
      setShowDropdown(false);
      clearMessages();
    } catch (err) {
      // show exactly what your backend sends for the duplicate case
      setErrorMessage(err?.response?.data?.error || err?.message || 'Something went wrong while adding to the web.');
    } finally {
      clearMessages();
    }
  };

  const toggleDropdown = () => {
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const dropdownWidth = 180;
    const dropdownHeight = 120;

    let top = buttonRect.height + 5;
    let left = buttonRect.width / 2 - dropdownWidth / 2;

    if (left < 10) left = 10;
    if (left + dropdownWidth > window.innerWidth - 10) left = window.innerWidth - dropdownWidth - 10;
    if (buttonRect.top + top + dropdownHeight > window.innerHeight) {
      top = -dropdownHeight - 10;
    }

    setDropdownStyle({ top, left });
    setShowDropdown(!showDropdown);
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <div className="add-to-web-container">
      <button ref={buttonRef} onClick={toggleDropdown} className="add-to-web-button">
        Add to Web
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
        </div>
      )}

      {showDropdown && <div className="dropdown-spacer"></div>} {/* Spacer for bottom space */}

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </div>
  );
};

export default AddToWebButton;