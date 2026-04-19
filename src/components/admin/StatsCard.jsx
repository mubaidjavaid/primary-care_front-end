export default function StatsCard({
  icon: Icon,
  iconClassName = "",
  label,
  value,
  hint,
}) {
  return (
    <article className="card p-4">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
        {Icon ? <Icon size={18} className={iconClassName} /> : null}
      </div>
      <p className="mt-2 text-xs uppercase text-medical-muted">{label}</p>
      <p className="mt-1 font-display text-3xl">{value}</p>
      <p className="text-xs text-slate-500">{hint}</p>
    </article>
  );
}
