import api from './api';

const ENDPOINT = '/rule-templates';

const ruleTemplateService = {
  /** Get all rule templates (Admin & Manager) */
  getAll: () => api.get(ENDPOINT),

  /** Get only active templates (Admin & Manager) */
  getActive: () => api.get(`${ENDPOINT}/active`),

  /** Get the default template (Admin & Manager) */
  getDefault: () => api.get(`${ENDPOINT}/default`),

  /** Get a single template by ID */
  getById: (id) => api.get(`${ENDPOINT}/${id}`),

  /** Create a new rule template (Admin only) */
  create: (templateData) => api.post(ENDPOINT, templateData),

  /** Update an existing template (Admin only) */
  update: (id, templateData) => api.put(`${ENDPOINT}/${id}`, templateData),

  /** Delete a template (Admin only) */
  delete: (id) => api.delete(`${ENDPOINT}/${id}`),

  /** Set a template as the default (Admin only) */
  setDefault: (id) => api.patch(`${ENDPOINT}/${id}/default`),
};

export default ruleTemplateService;
