import axios from './axios';

export const getInboxApi = (params) =>
  axios.get('inbox', { params });

export const getInboxByIdApi = (id) =>
  axios.get(`inbox/${id}`);

export const createInboxApi = (formData) =>
  axios.post('inbox', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

export const updateInboxApi = (id, formData) =>
  axios.put(`inbox/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

export const deleteInboxApi = (id) =>
  axios.delete(`inbox/${id}`);

export const getInboxDisposisiApi = (params) =>
  axios.get('inbox/disposisi', { params });

export const updateInboxActionApi = (id, body) => axios.put(`/inbox/disposisi/${id}`, body);