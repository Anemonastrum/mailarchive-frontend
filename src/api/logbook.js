import axios from './axios';

export const getAllMailsApi = (params) => {
  return axios.get('/logbook/all', { params });
};

export const getLogbookInbox = (params) => {
  return axios.get('/logbook/inbox', { params });
};

export const getLogbookOutbox = (params) => {
  return axios.get('/logbook/outbox', { params });
};

export const getAllMailWaitApi = (params) => {
  return axios.get('/logbook/wait', { params });
};
