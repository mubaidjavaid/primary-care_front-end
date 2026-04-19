import { Bell, Menu, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import LanguageToggle from "../ui/LanguageToggle";

export default function Navbar({ onOpenSidebar }) {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const handleNotifications = () => {
    if (user?.role === "superadmin") {
      navigate("/superadmin");
      return;
    }
    if (user?.role === "admin") {
      navigate("/admin");
      return;
    }
    navigate("/dashboard");
    toast("No new notifications right now");
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-medical-border bg-white px-3 shadow-nav md:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Open navigation"
          className="rounded-md border border-medical-border p-2 xl:hidden"
          onClick={onOpenSidebar}
        >
          <Menu size={18} />
        </button>
        <div className="hidden items-center gap-2 lg:flex">
          <ShieldCheck className="text-navy-700" size={18} />
          <span className="font-ui text-sm text-slate-600">
            Pakistan Primary Care Decision Support
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <LanguageToggle />
        <button
          type="button"
          aria-label="Notifications"
          className="rounded-md border border-medical-border p-2 text-slate-600"
          onClick={handleNotifications}
        >
          <Bell size={18} />
        </button>
        <div className="hidden text-right md:block">
          <p className="font-ui text-sm font-semibold text-slate-900">
            {user?.name || "Clinical User"}
          </p>
          <p className="font-mono text-xs uppercase text-medical-muted">
            {user?.role || "doctor"}
          </p>
        </div>
      </div>
    </header>
  );
}
