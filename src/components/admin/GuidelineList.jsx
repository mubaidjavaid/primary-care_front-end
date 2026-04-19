export default function GuidelineList({ items = [] }) {
  return (
    <div className="card p-4">
      <h4 className="mb-3 font-display text-2xl">Guidelines</h4>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li
            key={item.id}
            className="rounded-input border border-medical-border p-2"
          >
            {item.filename} · {item.chunks} chunks
          </li>
        ))}
      </ul>
    </div>
  );
}
