import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // For persisting user state

type AuthContextType = {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load persisted state from AsyncStorage
  useEffect(() => {
    const loadAuthState = async () => {
      const token = await AsyncStorage.getItem("authToken");
      if (token){
        setIsAuthenticated(true);
      }
    };
    loadAuthState();
  }, []);

  const login = async (token: string) => {
    await AsyncStorage.setItem("authToken", token); // Persist token
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("authToken"); // Clear token
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
