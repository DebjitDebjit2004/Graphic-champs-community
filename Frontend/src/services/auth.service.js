import { api } from '../config/api';

export const authService = {
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      // Check for duplicate email error (status code 409 or specific message)
      if (error.response?.status === 409 || 
          error.response?.data?.message?.toLowerCase().includes('already exists')) {
        throw 'An account with this email already exists. Please use a different email or login instead.';
      }
      throw error.response?.data?.message || 'Registration failed. Please try again.';
    }
  },

  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Login failed';
    }
  },

  async googleAuth(token) {
    try {
      const response = await api.post('/auth/google', { token });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Google authentication failed';
    }
  },

  async requestOtp(email) {
    try {
      const response = await api.post('/auth/request-otp', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to send OTP';
    }
  },

  async verifyOtp(email, otp) {
    try {
      const response = await api.post('/auth/verify-otp', { email, otp });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'OTP verification failed';
    }
  },

  logout() {
    localStorage.removeItem('token');
  },

  getCurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (error) {
      return null;
    }
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
};

// All exports are named
