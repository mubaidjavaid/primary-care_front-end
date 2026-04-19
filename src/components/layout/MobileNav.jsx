import { Activity, BarChart3, History, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const items = [
  {
    to: "/triage",
    icon: Activity,
    key: "nav.triage",
    roles: ["doctor", "viewer"],
  },
  {
    to: "/dashboard",
    icon: BarChart3,
    key: "nav.dashboard",
    roles: ["doctor", "viewer"],
  },
  {
    to: "/admin",
    icon: History,
    key: "nav.history",
    roles: ["admin", "superadmin"],
  },
  {
    to: "/superadmin",
    icon: Settings,
    key: "nav.settings",
    roles: ["superadmin"],
  },
];

export default function MobileNav() {
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);
  const filteredItems = items.filter(
    (item) => !item.roles || item.roles.includes(user?.role),
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-medical-border bg-white px-2 py-2 shadow-nav md:hidden">
      <ul
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${filteredItems.length || 1}, minmax(0, 1fr))`,
        }}
      >
        {filteredItems.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex min-h-11 flex-col items-center justify-center rounded-lg text-[11px] ${isActive ? "bg-navy-700 text-white" : "text-slate-600"}`
                }
              >
                <Icon size={16} />
                <span>{t(item.key)}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
