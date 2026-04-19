export default function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex rounded-badge border px-3 py-1 text-xs font-semibold ${className}`}
    >
      {children}
    </span>
  );
}
