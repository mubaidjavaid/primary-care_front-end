import { Loader, Mic, Paperclip, Send } from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useChatStore } from "../../store/chatStore";
import MessageBubble from "./MessageBubble";
import WelcomeScreen from "./WelcomeScreen";

export default function ChatWindow({ onSend }) {
  const activeSessionId = useChatStore((state) => state.activeSessionId);
  const messagesMap = useChatStore((state) => state.messages);
  const patientInfo = useChatStore((state) => state.patientInfo);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messages = useMemo(
    () => messagesMap[activeSessionId] || [],
    [messagesMap, activeSessionId],
  );

  const submit = async () => {
    if (!query.trim()) return;
    if (isLoading) return;

    setIsLoading(true);
    try {
      await onSend(query.trim());
      setQuery("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Voice input is not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript || "";
      if (transcript.trim()) {
        setQuery((prev) => `${prev} ${transcript}`.trim().slice(0, 500));
      }
    };
    recognition.onerror = () => {
      toast.error("Unable to capture voice input. Please try again.");
    };
    recognition.start();
  };

  const handleAttachVitals = () => {
    const vitals = patientInfo?.vitals || {};
    const parts = Object.entries(vitals)
      .filter(
        ([, value]) => value !== "" && value !== null && value !== undefined,
      )
      .map(([key, value]) => `${key}: ${value}`);

    if (!parts.length) {
      toast("No vitals saved yet. Please fill Patient Information first.");
      return;
    }

    const summary = `Vitals update - ${parts.join(", ")}`;
    setQuery((prev) => `${prev} ${summary}`.trim().slice(0, 500));
  };

  return (
    <section className="flex h-full flex-col rounded-card border border-medical-border bg-white">
      <header className="flex items-center justify-between border-b border-medical-border px-4 py-3">
        <div>
          <h2 className="font-display text-2xl">Triage Session</h2>
          <p className="text-xs text-medical-muted">
            {patientInfo?.age
              ? `Patient: ${patientInfo.gender}, ${patientInfo.age}y`
              : "No patient profile selected"}
          </p>
        </div>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <WelcomeScreen onSelectStarter={(text) => setQuery(text)} />
        ) : (
          messages.map((message, index) => (
            <MessageBubble key={index} message={message} />
          ))
        )}
      </div>

      <footer className="border-t border-medical-border p-3">
        <div className="mb-2 text-xs text-medical-muted">
          Patient: {patientInfo?.gender || "N/A"}, {patientInfo?.age || "--"}y ·{" "}
          {(patientInfo?.symptoms || []).join(", ") || "No symptoms yet"}
        </div>
        <div className="flex items-end gap-2">
          <textarea
            value={query}
            onChange={(event) => setQuery(event.target.value.slice(0, 500))}
            placeholder="Describe symptoms or ask a question"
            className="input-field min-h-[50px] max-h-[140px] flex-1 resize-y disabled:opacity-50"
            onKeyDown={(event) => {
              if (event.ctrlKey && event.key === "Enter" && !isLoading)
                submit();
            }}
            disabled={isLoading}
          />
          <button
            type="button"
            className="btn-secondary h-11 w-11 disabled:opacity-50"
            aria-label="Voice input"
            onClick={handleVoiceInput}
            disabled={isLoading}
          >
            <Mic size={16} />
          </button>
          <button
            type="button"
            className="btn-secondary h-11 w-11 disabled:opacity-50"
            aria-label="Attach vitals"
            onClick={handleAttachVitals}
            disabled={isLoading}
          >
            <Paperclip size={16} />
          </button>
          <button
            className="btn-primary h-11 min-w-[92px] justify-center disabled:opacity-50"
            onClick={submit}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader size={16} className="animate-spin" />
            ) : (
              <>
                <Send size={16} /> Send
              </>
            )}
          </button>
        </div>
        <p className="mt-1 text-right text-xs text-medical-muted">
          {query.length}/500
        </p>
      </footer>
    </section>
  );
}
