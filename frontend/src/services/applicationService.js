import api from './api';

const applicationService = {
  /** Apply to participate in an auction */
  apply: (auctionId, applicationData) =>
    api.post(`/applications/auction/${auctionId}`, applicationData),

  /** Approve an application (Admin/Manager) */
  approve: (applicationId) =>
    api.post(`/applications/${applicationId}/approve`),

  /** Reject an application (Admin/Manager) */
  reject: (applicationId) =>
    api.post(`/applications/${applicationId}/reject`),

  /** Get all applications for a specific auction (Admin/Manager) */
  getByAuction: (auctionId) =>
    api.get(`/applications/auction/${auctionId}`),

  /** Get all applications submitted by the current user */
  getMyApplications: () => api.get('/applications/my-applications'),
};

export default applicationService;
