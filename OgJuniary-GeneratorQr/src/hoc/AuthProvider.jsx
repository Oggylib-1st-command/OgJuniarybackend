import { createContext, useState } from "react";
import { useLocation } from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/";
  const signin = (newUser, cb) => {
    setUser(newUser);
    cb();
  };
  const signout = (cb) => {
    setUser(null);
    cb();
  };

  const value = { user, signin, signout, fromPage };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
