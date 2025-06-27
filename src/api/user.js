import axios from './axios';

export const getUserApi = () => axios.get('auth/user');

export const updateUserSelfApi = (formData) =>
  axios.put('user/me', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const changePasswordApi = (data) => axios.put('user/password', data);

export const registerUserApi = (data) => axios.post('/user/add', data);

export const getUserListApi = ({ page, limit, search }) =>
  axios.get('/user/list', {
    params: { page, limit, search }
  });

export const manageUserApi = (id, data) =>
  axios.put(`/user/manage/${id}`, data);

export const getUserByIdApi = (id) => axios.get(`/user/${id}`)