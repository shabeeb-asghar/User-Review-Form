import axios from 'axios';

// Access the base URL from .env
const base_url = process.env.REACT_APP_BASE_URL;

// Create a new team
const createTeam = async (teamData) => {
  const response = await axios.post(`${base_url}/teams`, teamData);
  return response.data;
};

// Get all teams
const getTeams = async () => {
  const response = await axios.get(`${base_url}/teams`);
  return response.data;
};

// Get a specific team by ID
const getTeamById = async (teamId) => {
  const response = await axios.get(`${base_url}/teams/${teamId}`);
  return response.data;
};

// Update an existing team
const updateTeam = async (teamId, teamData) => {
  const response = await axios.put(`${base_url}/teams/${teamId}`, teamData);
  return response.data;
};

// Delete a team by ID
const deleteTeam = async (teamId) => {
  const response = await axios.delete(`${base_url}/teams/${teamId}`);
  return response.data;
};

export const teamService = {
  createTeam,
  getTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
};
