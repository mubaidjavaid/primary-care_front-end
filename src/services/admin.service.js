import api from "./api";

export const adminService = {
  getStats: () => api.get("/admin/stats"),
  getLogs: (params) => api.get("/admin/logs", { params }),
  getUsers: () => api.get("/admin/users"),
  getFacilities: () => api.get("/admin/facilities"),
  getAuditTrail: () => api.get("/admin/audit-trail"),
  updateUserStatus: (userId, isActive) =>
    api.patch(`/admin/users/${userId}/status`, { isActive }),
  updateUserRole: (userId, role) =>
    api.patch(`/admin/users/${userId}/role`, { role }),
};
