export default function AuditTrailTable({ rows = [] }) {
  return (
    <div className="card p-4">
      <h4 className="mb-3 font-display text-2xl">Audit Trail</h4>
      <ul className="space-y-2 text-sm">
        {rows.map((row, idx) => (
          <li
            key={idx}
            className="rounded-input border border-medical-border p-2"
          >
            {row}
          </li>
        ))}
      </ul>
    </div>
  );
}
