import axios from 'axios';

// Una instancia comparte dirección base y tiempo máximo entre solicitudes.
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000
});
