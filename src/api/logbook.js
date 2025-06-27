import axios from './axios';

export const getAllMailsApi = (params) => {
  return axios.get('/logbook/all', { params });
};

export const getLogbookInbox = () =>
  axios.get('logbook/inbox');

export const getLogbookOutbox = () =>
  axios.get('logbook/outbox');
