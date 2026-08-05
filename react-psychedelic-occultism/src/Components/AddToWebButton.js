import { useState, useEffect, useRef } from 'react';
import { fetchWebs, updateWeb } from "../api/webs.js";
import "../Styles/addToWebButton.scss";

const DROPDOWN_TOGGLE_EVENT = 'add-to-web-dropdown-toggle';  // ← new constant

const AddToWebButton = ({ refModel, refId, className, title, children }) => {
  const [webs, setWebs] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({ top: 0, left: 0 });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const buttonRef = useRef(null);
  const containerRef = useRef(null);  // ← new ref for click-outside

  useEffect(() => {
    fetchWebs().then(setWebs);
  }, []);

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
      // Position calculation (your original code)
      if (!buttonRef.current) return;
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

      // Tell all other buttons to close
      window.dispatchEvent(
        new CustomEvent(DROPDOWN_TOGGLE_EVENT, { detail: { refId } })
      );
    }

    setShowDropdown(willBeOpen);
    setErrorMessage('');
    setSuccessMessage('');
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

// const AddToWebButton = ({ refModel, refId }) => {
//   const [webs, setWebs] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [dropdownStyle, setDropdownStyle] = useState({ top: 0, left: 0 });
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const buttonRef = useRef(null);

//   const clearMessages = () => {
//     setTimeout(() => {
//       setErrorMessage('');
//       setSuccessMessage('');
//     }, 5000);
//   };

//   useEffect(() => {
//     fetchWebs().then(setWebs);
//   }, []);

// const handleAddToWeb = async (webId) => {
//   try {
//     const newNode = { refModel, refId };
//     console.log("→ Sending request to add to web", webId);
    
//     const response = await updateWeb(webId, newNode);
//     console.log("→ Raw response:", response);           // ← most important
//     console.log("→ response.error exists?", !!response?.error);
//     console.log("→ error value:", response?.error);

//     if (response.error) {
//       console.log("Entering error branch. Setting message to:", response.error);
//       setErrorMessage(response.error);
//       return;
//     }

//     console.log("Success path");
//     setSuccessMessage('Added to Web successfully!');
//     setShowDropdown(false);
//     } catch (err) {
//     console.error("→ Caught error:", err);
//     console.error("→ Full error object:", JSON.stringify(err, null, 2));
//     console.error("→ err.response?.data?", err?.response?.data);

//     let message = 'Something went wrong while adding to the web.';

//     if (err?.response?.status === 401) {
//       message = 'Please log in to add items to a web.';
//       // Optional next steps you can add later:
//       // setShowLoginModal(true);
//       // or navigate('/login') if using react-router
//       // or localStorage.removeItem('token'); // if you want to force re-login
//     } else if (err?.response?.status === 400) {
//       // Catch backend validation / duplicate errors
//       message = err?.response?.data?.error || 'Invalid request – check the details.';
//     } else if (err?.response) {
//       // Other server errors with message
//       message = err.response.data?.error || err.response.data?.message || `Server error (${err.response.status})`;
//     } else {
//       // Network / timeout / no response
//       message = err.message || 'Network issue – please check your connection.';
//     }

//     setErrorMessage(message);
//   }
// }

//   // const handleAddToWeb = async (webId) => {
//   //   try {
//   //     const newNode = { refModel, refId };
//   //     const response = await updateWeb(webId, newNode);

//   //     if (response.error) {
//   //       console.log("response.error is:")
//   //       console.log(response.error)
//   //       setErrorMessage(response.error);
//   //       return;
//   //     }

//   //     setSuccessMessage('Added to Web successfully!');
//   //     setShowDropdown(false);
//   //   } catch (err) {
//   //     // show exactly what your backend sends for the duplicate case
//   //     setErrorMessage(err?.response?.data?.error || err?.message || 'Something went wrong while adding to the web.');
//   //   } 
//   // };

  

//   const toggleDropdown = () => {
//     const buttonRect = buttonRef.current.getBoundingClientRect();
//     const dropdownWidth = 180;
//     const dropdownHeight = 120;

//     let top = buttonRect.height + 5;
//     let left = buttonRect.width / 2 - dropdownWidth / 2;

//     if (left < 10) left = 10;
//     if (left + dropdownWidth > window.innerWidth - 10) left = window.innerWidth - dropdownWidth - 10;
//     if (buttonRect.top + top + dropdownHeight > window.innerHeight) {
//       top = -dropdownHeight - 10;
//     }

//     setDropdownStyle({ top, left });
//     setShowDropdown(!showDropdown);
//     setErrorMessage('');
//     setSuccessMessage('');
//   };

//   return (
//     <div className="add-to-web-container">
//       <button ref={buttonRef} onClick={toggleDropdown} className="add-to-web-button">
//         Add to Web
//       </button>

//       {showDropdown && (
//         <div className="dropdown-menu show" style={{ top: `${dropdownStyle.top}px`, left: `${dropdownStyle.left}px` }}>
//           <p>Select a web:</p>
//           {errorMessage && (
//             <div className="error-message dropdown-error">{errorMessage}</div>
//           )}
//           <ul>
//             {webs.map((web) => (
//               <li key={web._id} onClick={() => handleAddToWeb(web._id)}>
//                 {web.title}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {showDropdown && <div className="dropdown-spacer"></div>} {/* Spacer for bottom space */}

//       {successMessage && (
//         <div className="success-message">{successMessage}</div>
//       )}
//     </div>
//   );
// };

// export default AddToWebButton;