export default function LiveFeedWidget({ events = [] }) {
  return (
    <div className="card p-4">
      <h4 className="mb-3 font-display text-2xl">Live Activity Feed</h4>
      <ul className="space-y-2 text-sm">
        {events.map((event, index) => (
          <li
            key={index}
            className="rounded-input border border-medical-border p-2"
          >
            {event}
          </li>
        ))}
      </ul>
    </div>
  );
}
