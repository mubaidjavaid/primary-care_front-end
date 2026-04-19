export default function Input({ label, id, error, ...props }) {
  return (
    <label className="block space-y-1" htmlFor={id}>
      {label && (
        <span className="text-sm font-medium text-slate-700">{label}</span>
      )}
      <input id={id} className="input-field" {...props} />
      {error && <span className="text-xs text-emergency-text">{error}</span>}
    </label>
  );
}
