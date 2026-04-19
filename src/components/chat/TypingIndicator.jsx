export default function TypingIndicator() {
  return (
    <div className="inline-flex items-center gap-2 rounded-badge border border-medical-border bg-white px-3 py-2 text-xs text-medical-muted">
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-navy-600 [animation-delay:0ms]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-navy-600 [animation-delay:120ms]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-navy-600 [animation-delay:240ms]" />
      AI is preparing a response...
    </div>
  );
}
