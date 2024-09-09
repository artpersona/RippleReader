import axios from 'axios';

const getApi = () => {
  const baseURL = 'http://192.168.42.35:8000';
  const api = axios.create({
    baseURL: baseURL,
    responseType: 'json',
  });
  api.interceptors.request.use(config => {
    return config;
  });

  return api;
};

export default getApi;
