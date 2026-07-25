import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [role, setRole] = useState(() => localStorage.getItem('role') || null);
  const [loading, setLoading] = useState(true);

  // Auto Login / Load user on page refresh
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const response = await api.get('/auth/me');
          if (response.data && response.data.success && response.data.data) {
            const userData = response.data.data;
            setUser(userData);
            const userRole = userData.role || 'ROLE_USER';
            setRole(userRole);
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('role', userRole);
          }
        } catch (error) {
          console.error('Session validation failed:', error);
          // If token is invalid/expired, clear local storage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('role');
          setToken(null);
          setUser(null);
          setRole(null);
        }
      }
      setLoading(false);
    };

    fetchCurrentUser();
  }, []);

  // Login handler
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data && response.data.success && response.data.data) {
        const authData = response.data.data;
        const authToken = authData.token;
        const userRole = authData.role || 'ROLE_USER';
        const userObj = {
          userId: authData.userId,
          name: authData.name,
          role: userRole,
        };

        // Save into LocalStorage
        localStorage.setItem('token', authToken);
        localStorage.setItem('user', JSON.stringify(userObj));
        localStorage.setItem('role', userRole);

        // Update state
        setToken(authToken);
        setUser(userObj);
        setRole(userRole);

        toast.success('Logged in successfully!');
        return { success: true, role: userRole };
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage =
        error.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Register handler
  const register = async (formData) => {
    try {
      const response = await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'ROLE_USER', // Always default to ROLE_USER from frontend
      });

      if (response.data && response.data.success) {
        toast.success('Registration successful! Please log in.');
        return { success: true };
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage =
        error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    setToken(null);
    setUser(null);
    setRole(null);
    toast.success('Logged out successfully.');
  };

  const value = {
    user,
    token,
    role,
    isAuthenticated: !!token && !!user,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
