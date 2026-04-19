import api from "./api";

export const authService = {
  publicRegister: (payload) => api.post("/auth/public-register", payload),
  createUser: (payload) => api.post("/auth/register", payload),
  login: (payload) => api.post("/auth/login", payload),
  logout: () => api.post("/auth/logout"),
  forgotPassword: (payload) => api.post("/auth/forgot-password", payload),
  verifyResetOtp: (payload) => api.post("/auth/verify-reset-otp", payload),
  resetPassword: (payload) => api.post("/auth/reset-password", payload),
  me: () => api.get("/auth/me"),
};
