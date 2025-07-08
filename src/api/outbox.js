import axios from './axios';

// Create Outbox (Surat Keluar)
export const createOutboxApi = (formData) =>
  axios.post('outbox', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

export const getOutboxApi = (params) =>
  axios.get('outbox', { params });

export const getOutboxByIdApi = (id) =>
  axios.get(`outbox/${id}`);

export const updateOutboxApi = (id, formData) =>
  axios.put(`outbox/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

export const deleteOutboxApi = (id) =>
  axios.delete(`outbox/${id}`);

export const getOutboxVerificationApi = () =>
  axios.get('outbox/verifikasi');

export const getOutboxDisposisiApi = (params) =>
  axios.get('outbox/verifikasi', { params });

export const updateOutboxStatus = (id) =>
  axios.put(`outbox/verifikasi/${id}`);

