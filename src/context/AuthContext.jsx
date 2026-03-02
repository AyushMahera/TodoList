import React, { createContext } from "react";
import { useState } from "react";
const AuthContext = createContext();
export { AuthContext };

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("auth") === "true";
  });

  const loggedUser = Number(localStorage.getItem("loggedUser"));

  function login() {
    localStorage.setItem("auth", "true");
    setIsAuthenticated(true);
  }

  function logout() {
    setIsAuthenticated(false);
    localStorage.removeItem("auth");
    localStorage.removeItem("loggedUser");
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, loggedUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
