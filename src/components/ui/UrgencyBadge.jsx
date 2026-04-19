const map = {
  routine: {
    cls: "urgency-routine",
    text: "Routine — Manage at facility",
    dot: "bg-emerald-500",
  },
  urgent: {
    cls: "urgency-urgent",
    text: "Urgent — Priority attention needed",
    dot: "bg-amber-500",
  },
  emergency: {
    cls: "urgency-emergency",
    text: "EMERGENCY — Immediate referral",
    dot: "bg-red-600",
  },
  insufficient: {
    cls: "urgency-insufficient",
    text: "Insufficient guideline data",
    dot: "bg-slate-400",
  },
};

export default function UrgencyBadge({ level = "Routine" }) {
  const key = String(level || "Routine").toLowerCase();
  const item = map[key] || map.routine;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-badge border px-3 py-1 text-xs font-semibold ${item.cls} ${key === "emergency" ? "animate-pulse" : ""}`}
    >
      <span aria-hidden className={`h-2.5 w-2.5 rounded-full ${item.dot}`} />
      <span>{item.text}</span>
    </span>
  );
}
