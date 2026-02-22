import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const getUserFromToken = () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime ? decoded : null;
  } catch (error) {
    return null;
  }
};

export const useAuth = (user, setUser) => {

  useEffect(() => {
    const checkAuth = () => {
      const loggedInUser = getUserFromToken();
      if (JSON.stringify(loggedInUser) !== JSON.stringify(user)) {
        if (typeof setUser === 'function') {
          setUser(loggedInUser);
        } else {
          console.error('setUser is not a function:', setUser);
        }
      }
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);

    return () => window.removeEventListener('storage', checkAuth);
  }, [user, setUser]);

  const logout = () => {
    localStorage.removeItem('token');
    if (typeof setUser === 'function') {
      setUser(null);
    } else {
      console.error('setUser is not a function in logout:', setUser);
    }
  };

  return { user, setUser, logout, getUserFromToken };
};
