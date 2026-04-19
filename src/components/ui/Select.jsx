export default function Select({ label, id, options = [], ...props }) {
  return (
    <label className="block space-y-1" htmlFor={id}>
      {label && (
        <span className="text-sm font-medium text-slate-700">{label}</span>
      )}
      <select id={id} className="input-field" {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
