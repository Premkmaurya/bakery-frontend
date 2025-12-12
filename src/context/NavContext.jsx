import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

const NavContext = createContext();

export const NavProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  // Check if user has valid token on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('http://localhost:3000/auth/verify');
      setUser(response.data.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Not authenticated:', error);
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:3000/auth/logout', {}, {
        withCredentials: true,
      });
      setIsLoggedIn(false);
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error('Logout failed:', error);
      return { success: false, error: error.response?.data?.message || error.message };
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const updateOrders = (newOrders) => {
    setOrders(newOrders);
  }

  const value = {
    isLoggedIn,
    user,
    loading,
    logout,
    updateUser,
  };

  return (
    <NavContext.Provider value={value}>
      {children}
    </NavContext.Provider>
  );
};

// Custom hook to use the context
export const useAuth = () => {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error('useAuth must be used within NavProvider');
  }
  return context;
};

export default NavContext;