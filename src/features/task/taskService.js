import axios from 'axios';

// Access the base URL from .env
const base_url = process.env.REACT_APP_BASE_URL;

// Create a new task
const createTask = async (taskData) => {
  const response = await axios.post(`${base_url}/tasks`, taskData);
  return response.data;
};

// Get all tasks for a specific team
const getTasks = async (teamId) => {
  const response = await axios.get(`${base_url}/tasks/${teamId}`);
  return response.data;
};

// Update task status (e.g., pending, done, backlog)
const updateTaskStatus = async (taskId, status) => {
  const response = await axios.put(`${base_url}/tasks/${taskId}`, { status });
  return response.data;
};

// Delete a task by ID
const deleteTask = async (taskId) => {
  const response = await axios.delete(`${base_url}/tasks/${taskId}`);
  return response.data;
};

export const taskService = {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
};