import { formatDistanceToNow } from "date-fns";
import { ChevronRight, LogOut, Plus, Settings } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/auth.service";
import { chatService } from "../../services/chat.service";
import { useAuthStore } from "../../store/authStore";
import { useChatStore } from "../../store/chatStore";
import UrgencyBadge from "../ui/UrgencyBadge";

export default function Sidebar({ compact = false }) {
  const navigate = useNavigate();
  const sessions = useChatStore((state) => state.sessions);
  const activeSessionId = useChatStore((state) => state.activeSessionId);
  const setActiveSession = useChatStore((state) => state.setActiveSession);
  const setSessions = useChatStore((state) => state.setSessions);
  const createSession = useChatStore((state) => state.createSession);
  const setSessionMessages = useChatStore((state) => state.setSessionMessages);
  const setPatientInfo = useChatStore((state) => state.setPatientInfo);
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const isClinicalUser = ["doctor", "viewer"].includes(user?.role);

  useEffect(() => {
    if (!isClinicalUser) {
      setSessions([]);
      setActiveSession(null);
      return;
    }

    let mounted = true;

    const hydrateSessions = async () => {
      try {
        const { data } = await chatService.getSessions();
        if (!mounted) return;
        const allSessions = Array.isArray(data) ? data : [];
        setSessions(allSessions);

        if (!allSessions.length) return;
        const first = allSessions[0];
        setActiveSession(first._id);
        const detail = await chatService.getSession(first._id);
        if (!mounted) return;
        setSessionMessages(first._id, detail.data?.messages || []);
      } catch {
        // Ignore hydration errors in UI and allow manual flow.
      }
    };

    hydrateSessions();

    return () => {
      mounted = false;
    };
  }, [isClinicalUser, setActiveSession, setSessionMessages, setSessions]);

  const handleNewSession = () => {
    (async () => {
      try {
        const { data } = await chatService.createSession({
          title: "New Consultation",
        });
        createSession({
          ...data,
          messageCount: 0,
          urgencyLevel: "Routine",
        });
        setSessionMessages(data._id, []);
      } catch {
        createSession({
          _id: crypto.randomUUID(),
          title: "New Consultation",
          updatedAt: new Date().toISOString(),
          messageCount: 0,
          urgencyLevel: "Routine",
        });
      } finally {
        setPatientInfo({});
        navigate("/triage");
      }
    })();
  };

  const handleOpenSession = async (sessionId) => {
    setActiveSession(sessionId);
    navigate("/triage");
    try {
      const { data } = await chatService.getSession(sessionId);
      setSessionMessages(sessionId, data?.messages || []);
    } catch {
      setSessionMessages(sessionId, []);
    }
  };

  const handleSettings = () => {
    try {
      if (user?.role === "superadmin") {
        navigate("/superadmin");
        return;
      }
      if (user?.role === "admin") {
        navigate("/admin");
        return;
      }
      navigate("/dashboard");
    } catch (error) {
      toast.error("Unable to navigate. Please try again.");
      console.error("Navigation error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch {
      // Clear local auth state even if server-side logout call fails.
    } finally {
      logout();
      navigate("/login", { replace: true });
    }
  };

  return (
    <aside
      className={`relative h-full border-r border-medical-border bg-white ${compact ? "w-16 p-2" : "w-[280px] p-4"}`}
    >
      <div className="mb-4">
        <div className="mb-3 flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-navy-700 text-white">
            +
          </div>
          {!compact && (
            <div>
              <h1 className="font-display text-xl text-navy-900">Triage AI</h1>
              <p className="text-xs text-medical-muted">
                {isClinicalUser ? "Clinical workspace" : "Admin workspace"}
              </p>
            </div>
          )}
        </div>

        {!compact && isClinicalUser && (
          <button
            type="button"
            className="btn-primary w-full justify-center gap-2"
            onClick={handleNewSession}
          >
            <Plus size={16} /> New Triage Session
          </button>
        )}
      </div>

      {!compact && isClinicalUser && (
        <div className="mb-3 text-xs font-semibold uppercase text-medical-muted">
          Chat History
        </div>
      )}
      {isClinicalUser && (
        <div className="space-y-2 overflow-y-auto pb-16">
          {sessions.map((session) => (
            <button
              key={session._id}
              type="button"
              className={`w-full rounded-xl border p-3 text-left ${activeSessionId === session._id ? "border-navy-600 bg-blue-50" : "border-transparent hover:border-medical-border hover:bg-slate-50"}`}
              onClick={() => handleOpenSession(session._id)}
            >
              {!compact && (
                <>
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {session.title || "Triage Session"}
                  </p>
                  <p className="mt-1 text-xs text-medical-muted">
                    {formatDistanceToNow(
                      new Date(session.updatedAt || Date.now()),
                      { addSuffix: true },
                    )}{" "}
                    · {session.messageCount || 0} queries
                  </p>
                  <div className="mt-2">
                    <UrgencyBadge level={session.urgencyLevel || "Routine"} />
                  </div>
                </>
              )}
              {compact && (
                <ChevronRight size={16} className="mx-auto text-slate-500" />
              )}
            </button>
          ))}
        </div>
      )}

      {!compact && !isClinicalUser && (
        <div className="space-y-2">
          <button
            type="button"
            className="btn-primary w-full justify-center"
            onClick={() =>
              navigate(user?.role === "superadmin" ? "/superadmin" : "/admin")
            }
          >
            Open {user?.role === "superadmin" ? "Super Admin" : "Admin"}{" "}
            Dashboard
          </button>
        </div>
      )}

      {!compact && (
        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <button
            type="button"
            className="btn-secondary w-full justify-start gap-2"
            onClick={handleSettings}
          >
            <Settings size={14} /> Settings
          </button>
          <button
            type="button"
            className="btn-secondary w-full justify-start gap-2"
            onClick={handleLogout}
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      )}
    </aside>
  );
}
