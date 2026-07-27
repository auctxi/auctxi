import api from './api';

const invitationService = {
  /** Invite a client to an auction (Admin/Manager) */
  invite: (auctionId, clientId) =>
    api.post(`/invitations/auction/${auctionId}/invite/${clientId}`),

  /** Accept an invitation and register a team */
  accept: (invitationId, teamData) =>
    api.post(`/invitations/${invitationId}/accept`, teamData),

  /** Decline an invitation */
  decline: (invitationId) =>
    api.post(`/invitations/${invitationId}/decline`),

  /** Get all invitations for a specific auction (Admin/Manager) */
  getByAuction: (auctionId) =>
    api.get(`/invitations/auction/${auctionId}`),

  /** Get all invitations received by the current user */
  getMyInvitations: () => api.get('/invitations/my-invitations'),
};

export default invitationService;
