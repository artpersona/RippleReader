import axios from 'axios';

const getApi = () => {
  const baseURL = 'https://tubigpilipinas.gtindustries.ph/';
  // const baseURL = 'http://192.168.1.7:8000';
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
