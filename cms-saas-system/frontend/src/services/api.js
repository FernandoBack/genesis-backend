import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080' // A porta onde o Java está rodando
});

// Interceptador: Toda vez que o React chamar o Java, ele verifica se tem o Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('genesis_token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export default api;