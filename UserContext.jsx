import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [customerId, setCustomerId] = useState(null);

  const setUser = (name) => {
    setUserName(name);
  };

  const setCustomerID = (cid) => {
    setCustomerId(cid);
  };

  return (
    <UserContext.Provider value={{ userName, setUser, customerId, setCustomerID }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
