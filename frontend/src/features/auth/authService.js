import axios from 'axios';

const API_URL = '/api/users';

const register = async (userData) => {
  const response = await axios.post(API_URL + '/register', userData);

  if (response.data.user) {
    localStorage.setItem(
      'support-desk-app-user',
      JSON.stringify(response.data.user)
    );
  }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + '/login', userData);

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
