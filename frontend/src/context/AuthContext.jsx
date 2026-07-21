/* eslint-disable react-refresh/only-export-components */
// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// Dummy starter users
const DUMMY_USERS = [
  { email: "admin@test.com", password: "admin123", role: "admin" },
  { email: "client@test.com", password: "client123", role: "client" },
  { email: "manager@test.com", password: "manager123", role: "manager" },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    const found = DUMMY_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      setUser({ email: found.email, role: found.role });
      return true;
    }
    return false;
  };

  const signup = (email, password, role) => {
    // Very simple – just add to the array and log in
    DUMMY_USERS.push({ email, password, role });
    setUser({ email, role });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);