import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

const NavContext = createContext();

export const NavProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]); // Added addresses state
  const [orders, setOrders] = useState([]); // Added orders state
  // Check if user has valid token on mount

  useEffect(() => {
    const getAddresses = async () => {
      try {
        const response = await axios.get(
          "https://bakery-backend-two.vercel.app/user/get-addresses",
          {
            withCredentials: true,
          }
        );
        setAddresses(response.data.addresses);
      } catch (error) {}
    };
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(
          "https://bakery-backend-two.vercel.app/auth/verify",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Not authenticated:", error);
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
    getAddresses();
  }, []);

  const logout = async () => {
    try {
      await axios.post(
        "https://bakery-backend-two.vercel.app/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setIsLoggedIn(false);
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error("Logout failed:", error);
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const updateAddresses = (newAddresses) => {
    setAddresses(newAddresses);
  };

  const deleteAddress = async (id) => {
    try {
      await axios.delete(
        `https://bakery-backend-two.vercel.app/user/delete-address/${id}`,
        {
          withCredentials: true,
        }
      );
      setAddresses((prev) => prev.filter((addr) => addr._id !== id));
    } catch (error) {
      console.error("Error deleting address:", error);
      throw new Error("Failed to delete address. Please try again.");
    }
  };

  const editAddress = async (id, updatedData) => {
    try {
      const response = await axios.patch(
        `https://bakery-backend-two.vercel.app/user/update-address/${id}`,
        updatedData,
        {
          withCredentials: true,
        }
      );
      setAddresses((prev) =>
        prev.map((addr) =>
          addr._id === id ? { ...updatedData, _id: id } : addr
        )
      );
    } catch (error) {
      console.error("Error updating address:", error);
      throw new Error("Failed to update address. Please try again.");
    }
  };

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    loading,
    logout,
    updateUser,
    addresses, // Expose addresses state
    updateAddresses, // Expose updateAddresses function
    deleteAddress, // Expose deleteAddress function
    editAddress, // Expose editAddress function
    orders,
    setOrders,
  };

  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
};

// Custom hook to use the context
export const useAuth = () => {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error("useAuth must be used within NavProvider");
  }
  return context;
};

export default NavContext;
