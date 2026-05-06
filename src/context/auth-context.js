import { createContext, useContext } from "react";

const AuthContext = createContext(null);

function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return ctx;
}

export { AuthContext, useAuth };
