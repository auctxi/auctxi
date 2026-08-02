import api from './api';

const teamService = {
  /** Get all teams */
  getAll: () => api.get('/teams'),

  /** Get a single team by ID */
  getById: (id) => api.get(`/teams/${id}`),

  /** Update an existing team */
  update: (id, teamData) => api.put(`/teams/${id}`, teamData),

  /** Delete a team */
  delete: (id) => api.delete(`/teams/${id}`),
};

export default teamService;
