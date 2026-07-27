import api from './api';

const auctionsService = {
  /** Get all auctions */
  getAll: () => api.get('/auctions'),

  /** Get a single auction by ID */
  getById: (id) => api.get(`/auctions/${id}`),

  /** Create a new auction (Admin/Manager) */
  create: (auctionData) => api.post('/auctions', auctionData),

  /** Update an UPCOMING auction (Admin/Manager) */
  update: (id, auctionData) => api.put(`/auctions/${id}`, auctionData),

  /** Start an UPCOMING auction */
  start: (id) => api.post(`/auctions/${id}/start`),

  /** Pause an ONGOING auction */
  pause: (id) => api.post(`/auctions/${id}/pause`),

  /** Resume a PAUSED auction */
  resume: (id) => api.post(`/auctions/${id}/resume`),

  /** End the auction */
  end: (id) => api.post(`/auctions/${id}/end`),

  /** Set the current player under the hammer */
  setCurrentPlayer: (auctionId, playerId) =>
    api.post(`/auctions/${auctionId}/current-player/${playerId}`),
};

export default auctionsService;
