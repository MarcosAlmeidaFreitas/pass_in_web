import axios from 'axios';
import requests from './requests';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});

export { api, requests };