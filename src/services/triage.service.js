import api from "./api";

export const triageService = {
  runQuery: (payload) => api.post("/triage/query", payload),
  getLogs: (params) => api.get("/triage/logs", { params }),
  getLogById: (id) => api.get(`/triage/logs/${id}`),
};
