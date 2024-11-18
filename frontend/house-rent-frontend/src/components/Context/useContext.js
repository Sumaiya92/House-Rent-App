// UserContext.js
import React, { createContext, useState, useContext } from 'react';

// Create Context
const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: '' });

  const updateUser = (name) => {
    setUser({ name });
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context
export const useUser = () => useContext(UserContext);
