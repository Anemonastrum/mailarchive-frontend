import axios from './axios';

export const getDisposisiTotal = () =>
  axios.get('stats/disposisi');

export const getTotalMail = () =>
  axios.get('stats/total');

export const getMailMonthly = (year) =>
  axios.get(`/stats/bulanan/${year}`);

export const getMailCategoryStats = () =>
  axios.get('stats/kategori');