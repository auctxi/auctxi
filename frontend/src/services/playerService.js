import api from './api';

const playerService = {
  /** Get all players with filtering and pagination (visibility is server-enforced) */
  getAll: (params = {}) => {
    const queryParams = new URLSearchParams();
    if (params.search) queryParams.append('search', params.search);
    if (params.role) queryParams.append('role', params.role);
    if (params.category) queryParams.append('category', params.category);
    if (params.status) queryParams.append('status', params.status);
    if (params.page !== undefined) queryParams.append('page', params.page);
    if (params.size) queryParams.append('size', params.size);
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortDir) queryParams.append('sortDir', params.sortDir);
    return api.get(`/players?${queryParams.toString()}`);
  },

  /** Get a single player by ID */
  getById: (id) => api.get(`/players/${id}`),

  /** Create a new player (Admin creates GLOBAL, Manager creates PRIVATE) */
  create: (playerData) => api.post('/players', playerData),

  /** Update an existing player */
  update: (id, playerData) => api.put(`/players/${id}`, playerData),

  /** Delete a player */
  delete: (id) => api.delete(`/players/${id}`),
};

export default playerService;
