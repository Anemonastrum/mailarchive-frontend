import axios from './axios';

export const getCategoriesApi = () =>
  axios.get('category');

export const createCategoryApi = (name) =>
  axios.post('category', { name });

export const updateCategoryApi = (id, name) =>
  axios.put(`category/${id}`, { name });

export const deleteCategoryApi = (id) =>
  axios.delete(`category/${id}`);