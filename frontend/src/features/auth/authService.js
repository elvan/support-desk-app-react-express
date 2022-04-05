import axios from 'axios';

const API_URL =
  process.env.REACT_APP_BACKEND_API || 'http://localhost:5000/api';

const register = async (userData) => {
  const response = await axios.post(API_URL + '/users/register', userData);

  if (response.data.user) {
    localStorage.setItem(
      'support-desk-app-user',
      JSON.stringify(response.data.user)
    );
  }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + '/users/login', userData);

  if (response.data.user) {
    localStorage.setItem(
      'support-desk-app-user',
      JSON.stringify(response.data.user)
    );
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('support-desk-app-user');

  return 'Logged out successfully';
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
