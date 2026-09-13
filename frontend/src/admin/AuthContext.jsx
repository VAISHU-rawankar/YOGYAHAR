import { createContext, useContext, useState } from "react";
import { api } from "../lib/apiClient";
import { getToken, setToken, clearToken } from "../lib/apiClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(getToken());

  const login = async (username, password) => {
    const { token } = await api.post("/api/auth/login", { username, password });
    setToken(token);
    setTokenState(token);
  };

  const logout = () => {
    clearToken();
    setTokenState(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
