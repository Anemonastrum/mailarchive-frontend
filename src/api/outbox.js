import axios from './axios';

// Create Outbox (Surat Keluar)
export const createOutboxApi = (formData) =>
  axios.post('outbox', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

// Get all outbox (with optional params: page, limit, category, createdBy)
export const getOutboxApi = (params) =>
  axios.get('outbox', { params });

// Get outbox by ID
export const getOutboxByIdApi = (id) =>
  axios.get(`outbox/${id}`);

// Update outbox (edit, multipart)
export const updateOutboxApi = (id, formData) =>
  axios.put(`outbox/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

// Delete outbox
export const deleteOutboxApi = (id) =>
  axios.delete(`outbox/${id}`);


