import axios from 'axios';

const API_URL = '/api/users/register';

const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem(
      'support-desk-app-user',
      JSON.stringify(response.data.user)
    );

    return response.data;
  }
};

const logout = () => {
  localStorage.removeItem('support-desk-app-user');

  return 'Logged out successfully';
};

const authService = {
  register,
  logout,
};

export default authService;
