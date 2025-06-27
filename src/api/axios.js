import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // otomatis ambil dari .env
  withCredentials: true,
});

export default instance;