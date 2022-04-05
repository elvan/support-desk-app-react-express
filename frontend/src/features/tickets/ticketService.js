import axios from 'axios';

const API_URL =
  process.env.REACT_APP_BACKEND_API || 'http://localhost:5000/api';

const list = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/tickets', config);

  return response.data;
};

const get = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + `/tickets/${id}`, config);

  return response.data;
};

const create = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + '/tickets', ticketData, config);

  return response.data;
};

const close = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + `/tickets/${id}/close`,
    {
      status: 'closed',
    },
    config
  );

  return response.data;
};

const reopen = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + `/tickets/${id}/reopen`,
    {
      status: 'open',
    },
    config
  );

  return response.data;
};

const ticketService = {
  list,
  get,
  create,
  close,
  reopen,
};

export default ticketService;
