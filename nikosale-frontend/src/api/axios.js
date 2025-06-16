import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/', // измени при необходимости
  withCredentials: true, // если используешь куки для аутентификации
});

export default api;
