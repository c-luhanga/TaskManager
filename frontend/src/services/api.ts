import axios from 'axios';

const API_URL = 'http://localhost:3001'; // Update backend URL

export const register = (username: string, password: string) =>
  axios.post(`${API_URL}/auth/register`, { username, password });

export const login = (username: string, password: string) =>
  axios.post(`${API_URL}/auth/login`, { username, password });

export const fetchTasks = (token: string) =>
  axios.get(`${API_URL}/tasks`, { headers: { Authorization: `Bearer ${token}` } });

export const createTask = (token: string, title: string, description?: string) =>
  axios.post(`${API_URL}/tasks`, { title, description }, { headers: { Authorization: `Bearer ${token}` } });

export const updateTask = (token: string, id: number, isComplete: boolean) =>
  axios.put(`${API_URL}/tasks/${id}`, { isComplete }, { headers: { Authorization: `Bearer ${token}` } });

export const deleteTask = async (token: string, id: number): Promise<void> => {
  await axios.delete(`${API_URL}/tasks/${id}`, {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
};
