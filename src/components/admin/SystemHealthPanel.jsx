export default function SystemHealthPanel() {
  const items = [
    ["MongoDB", "Connected", "24ms latency"],
    ["Groq API", "Operational", "1.2s avg"],
    ["Vector Search", "Indexed", "384-dim"],
    ["Email Service", "Active", "Nodemailer"],
    ["Socket.io", "Connected", "4 clients"],
  ];

  return (
    <div className="card p-4">
      <h4 className="mb-3 font-display text-2xl">System Health</h4>
      <ul className="space-y-2 text-sm">
        {items.map(([name, status, detail]) => (
          <li
            key={name}
            className="flex items-center justify-between rounded-input border border-medical-border px-3 py-2"
          >
            <span>{name}</span>
            <span className="text-emerald-600">● {status}</span>
            <span className="text-xs text-medical-muted">{detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
