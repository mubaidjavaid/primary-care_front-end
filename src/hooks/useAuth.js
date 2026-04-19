import { useEffect, useState } from "react";
import { authService } from "../services/auth.service";
import { useAuthStore } from "../store/authStore";

export function useAuth() {
  const { user, accessToken, isAuthenticated, login, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);

  // Restore from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        login(parsedUser, savedToken);
        setLoading(false);
        return;
      } catch {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  // Validate token with server
  useEffect(() => {
    if (!accessToken) {
      setLoading(false);
      return;
    }

    authService
      .me()
      .then(({ data }) => {
        if (data?.user) {
          login(data.user, accessToken);
        }
      })
      .catch(() => {
        logout();
      })
      .finally(() => setLoading(false));
  }, []);

  const signIn = async (email, password) => {
    const { data } = await authService.login({ email, password });
    login(data.user, data.accessToken);
    // Persist to localStorage
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data;
  };

  const signOut = async () => {
    try {
      await authService.logout();
    } finally {
      logout();
      // Clear localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    }
  };

  return { user, isAuthenticated, accessToken, loading, signIn, signOut };
}
