import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/auth.service';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setCurrentUser(payload);
        setUser(payload);
      } catch (error) {
        localStorage.removeItem('token');
        setCurrentUser(null);
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      if (response.token) {
        localStorage.setItem('token', response.token);
        setCurrentUser(response.user);
        setUser(response.user);
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (error) {
      return { success: false, message: error };
    }
  };

  const googleLogin = async (token) => {
    try {
      const response = await authService.googleAuth(token);
      if (response.token) {
        localStorage.setItem('token', response.token);
        setCurrentUser(response.user);
        setUser(response.user);
        return { success: true, message: response.message };
      }
      return { success: false, message: response.message };
    } catch (error) {
      return { success: false, message: error };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      return { success: true, ...response };
    } catch (error) {
      return { success: false, message: error };
    }
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
    setUser(null);
  };

  const value = {
    currentUser,
    user,
    isAuthenticated: !!currentUser,
    login,
    googleLogin,
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
