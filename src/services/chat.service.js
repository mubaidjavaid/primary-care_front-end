import api from "./api";

export const chatService = {
  getSessions: () => api.get("/chat/sessions"),
  createSession: (payload) => api.post("/chat/sessions", payload),
  getSession: (id) => api.get(`/chat/sessions/${id}`),
  deleteSession: (id) => api.delete(`/chat/sessions/${id}`),
};
