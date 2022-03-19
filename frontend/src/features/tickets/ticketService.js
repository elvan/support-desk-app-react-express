import axios from 'axios';

const API_URL = '/api/tickets';

const create = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, ticketData, config);

  return response.data;
};

const ticketService = {
  create,
};

export default ticketService;