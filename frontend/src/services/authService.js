import api from './api';

// Login API request
export const login = async (email, password) => {
  try {
    const response = await api.post('login', { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Logout API request
export const logout = () => {
  localStorage.removeItem('authToken');
};

// Any other auth-related functions can go here (e.g., register, forgot password)
