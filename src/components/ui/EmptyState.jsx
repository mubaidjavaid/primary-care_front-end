export default function EmptyState({ title, description, action }) {
  return (
    <div className="card p-8 text-center">
      <h3 className="font-display text-2xl">{title}</h3>
      <p className="mt-2 text-sm text-medical-muted">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
