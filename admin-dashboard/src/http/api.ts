import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5513/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = (data: { email: string; password: string }) => {
  return api.post('/users/login', data);
};
