import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  login: (user, token) =>
    set({ user, accessToken: token, isAuthenticated: true }),
  setAccessToken: (token) =>
    set((state) => ({
      accessToken: token,
      isAuthenticated: Boolean(token) && Boolean(state.user),
    })),
  logout: () => set({ user: null, accessToken: null, isAuthenticated: false }),
  updateUser: (data) => set((state) => ({ user: { ...state.user, ...data } })),
}));
