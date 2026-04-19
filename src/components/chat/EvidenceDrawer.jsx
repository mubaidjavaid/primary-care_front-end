import Drawer from "../ui/Drawer";

export default function EvidenceDrawer({ open, chunks = [], onClose }) {
  return (
    <Drawer open={open} onClose={onClose}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-2xl">Retrieved Evidence</h3>
      </div>
      <div className="space-y-3 overflow-y-auto">
        {chunks.slice(0, 5).map((chunk) => (
          <article
            key={chunk.id || chunk._id}
            className="rounded-card border border-medical-border bg-white p-3"
          >
            <p className="text-xs text-medical-muted">
              Source: {chunk?.metadata?.source || "Clinical Guideline"}
            </p>
            <p className="mt-1 text-xs">
              Match: {Math.round((chunk.score || 0) * 100)}%
            </p>
            <p className="mt-2 line-clamp-4 text-sm text-slate-700">
              {chunk.content}
            </p>
          </article>
        ))}
      </div>
    </Drawer>
  );
}
