import axios from 'axios';

const getApi = () => {
  const baseURL = 'https://tubigpilipinas.gtindustries.ph/';
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
