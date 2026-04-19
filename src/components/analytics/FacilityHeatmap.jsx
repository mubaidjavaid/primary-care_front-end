export default function FacilityHeatmap({ facilities = [] }) {
  return (
    <div className="card p-4">
      <h4 className="mb-3 font-display text-2xl">Facility Comparison</h4>
      <div className="grid gap-2">
        {facilities.map((facility) => (
          <div
            key={facility.name}
            className="rounded-input border border-medical-border p-2"
          >
            <div className="mb-1 flex justify-between text-sm">
              <span>{facility.name}</span>
              <span>{facility.value}</span>
            </div>
            <div className="h-2 rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-navy-600"
                style={{ width: `${facility.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
