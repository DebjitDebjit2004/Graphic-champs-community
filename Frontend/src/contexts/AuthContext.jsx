import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/auth.service';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const user = await authService.login(credentials);
      setCurrentUser(authService.getCurrentUser());
      return { success: true };
    } catch (error) {
      return { success: false, message: error };
    }
  };

  const register = async (userData) => {
    try {
      await authService.register(userData);
      setCurrentUser(authService.getCurrentUser());
      return { success: true };
    } catch (error) {
      return { success: false, message: error };
    }
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export { AuthContext };
