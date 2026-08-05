//Grok v3
// useAuth.js
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp > currentTime) {
          setUser(decoded);
        } else {
          localStorage.removeItem('token');
          setUser(null);
        }
      } catch (err) {
        console.error("Invalid token");
        localStorage.removeItem('token');
        setUser(null);
      }
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return { user, loading, login, logout };
};

//This is grok v2

// import { useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";

// export const useAuth = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     console.log("useAuth: Checking token on mount...");   // ← debug log

//     const token = localStorage.getItem('token');
    
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         const currentTime = Date.now() / 1000;

//         if (decoded.exp > currentTime) {
//           console.log("useAuth: Token valid. Setting user:", decoded);   // ← important
//           setUser(decoded);
//         } else {
//           console.log("useAuth: Token expired");
//           localStorage.removeItem('token');
//           setUser(null);
//         }
//       } catch (err) {
//         console.error("useAuth: Invalid token", err);
//         localStorage.removeItem('token');
//         setUser(null);
//       }
//     } else {
//       console.log("useAuth: No token found in localStorage");
//       setUser(null);
//     }

//     setLoading(false);
//   }, []);   // empty array = run once on mount

//   const login = (token) => {
//     console.log("useAuth: login() called with token");
//     localStorage.setItem('token', token);
//     const decoded = jwtDecode(token);
//     setUser(decoded);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   return { user, loading, login, logout };
// };

//This is new grok version

// import { useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";

// export const useAuth = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);   // ← important addition

//   // Load user from token on mount + when token changes in localStorage
//   useEffect(() => {
//     const checkAuth = () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           setUser(null);
//           setLoading(false);
//           return;
//         }

//         const decoded = jwtDecode(token);
//         const currentTime = Date.now() / 1000;

//         if (decoded.exp > currentTime) {
//           setUser(decoded);        // decoded contains id, username, etc.
//         } else {
//           localStorage.removeItem('token');
//           setUser(null);
//         }
//       } catch (error) {
//         console.error("Invalid token:", error);
//         localStorage.removeItem('token');
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAuth();

//     // Listen for changes in other tabs
//     window.addEventListener('storage', checkAuth);

//     return () => window.removeEventListener('storage', checkAuth);
//   }, []);   // ← empty dependency array is correct here

//   const login = (token) => {
//     localStorage.setItem('token', token);
//     const decoded = jwtDecode(token);
//     setUser(decoded);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   return { 
//     user, 
//     loading,           // ← very useful
//     login, 
//     logout,
//     getUserFromToken: () => getUserFromToken() // optional
//   };
// };

// // Optional helper (kept for compatibility)
// const getUserFromToken = () => {
//   try {
//     const token = localStorage.getItem('token');
//     if (!token) return null;
//     const decoded = jwtDecode(token);
//     const currentTime = Date.now() / 1000;
//     return decoded.exp > currentTime ? decoded : null;
//   } catch {
//     return null;
//   }
// };

//This is the original

// import { useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";

// const getUserFromToken = () => {
//   try {
//     const token = localStorage.getItem('token');
//     if (!token) return null;

//     const decoded = jwtDecode(token);
//     const currentTime = Date.now() / 1000;
//     return decoded.exp > currentTime ? decoded : null;
//   } catch (error) {
//     return null;
//   }
// };

// export const useAuth = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const checkAuth = () => {
//       const loggedInUser = getUserFromToken();
//       if (JSON.stringify(loggedInUser) !== JSON.stringify(user)) {
//         if (typeof setUser === 'function') {
//           setUser(loggedInUser);
//         } else {
//           console.error('setUser is not a function:', setUser);
//         }
//       }
//     };

//     checkAuth();
//     window.addEventListener('storage', checkAuth);

//     return () => window.removeEventListener('storage', checkAuth);
//   }, [user, setUser]);

//   const logout = () => {
//     localStorage.removeItem('token');
//     if (typeof setUser === 'function') {
//       setUser(null);
//     } else {
//       console.error('setUser is not a function in logout:', setUser);
//     }
//   };

//   return { user, setUser, logout, getUserFromToken };
// };
