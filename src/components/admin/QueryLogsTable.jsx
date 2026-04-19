export default function QueryLogsTable({ rows = [] }) {
  return (
    <div className="card overflow-auto p-0">
      <table className="w-full min-w-[820px] text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-medical-muted">
          <tr>
            <th className="p-3">Time</th>
            <th>Doctor</th>
            <th>Patient</th>
            <th>Urgency</th>
            <th>Condition</th>
            <th>Response</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-t border-slate-100">
              <td className="p-3">{row.time}</td>
              <td>{row.doctor}</td>
              <td>{row.patient}</td>
              <td>{row.urgency}</td>
              <td>{row.condition}</td>
              <td>{row.response}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
