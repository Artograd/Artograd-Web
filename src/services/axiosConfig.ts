import axios from 'axios';

const idToken = localStorage.getItem('id_token');

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: 10000
});

api.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${idToken}`;
    return config;
  }
)


export default api;