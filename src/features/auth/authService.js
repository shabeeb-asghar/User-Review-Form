import axios from 'axios';

// Access the base URL from .env
const base_url = process.env.REACT_APP_BASE_URL;

// Register a new user
const registerUser = async (userData) => {
  const response = await axios.post(`${base_url}/register`, userData);
  if (response.data) {
    localStorage.setItem('myUser', JSON.stringify(response.data));  // Store user in localStorage
  }
  return response.data;
};

// Log in a user
const logUser = async (userData) => {
  const response = await axios.post(`${base_url}/login`, userData);
  if (response.data) {
    localStorage.setItem('myUser', JSON.stringify(response.data));  // Store logged-in user in localStorage
  }
  return response.data;
};

// Get a list of all users (admin access)
const getUsers = async () => {
  const response = await axios.get(`${base_url}/get-users`);
  return response.data;
};

export const authService = {
  registerUser,
  logUser,
  getUsers,
};
