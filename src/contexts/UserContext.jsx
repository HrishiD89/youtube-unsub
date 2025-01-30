/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};
