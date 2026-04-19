export default function ProgressBar({ value = 0 }) {
  return (
    <div className="h-2 w-full rounded-full bg-slate-200">
      <div
        className="h-full rounded-full bg-navy-600 transition-default duration-default ease-default"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}
