import { motion } from "framer-motion";
import TriageCard from "./TriageCard";

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <motion.article
      initial={{ opacity: 0, x: isUser ? 20 : -20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`max-w-3xl ${isUser ? "ml-auto" : ""}`}
    >
      {isUser ? (
        <div className="rounded-[18px] rounded-br-sm bg-navy-600 px-4 py-3 text-sm text-white shadow-card">
          {message.content}
        </div>
      ) : (
        <div className="rounded-[18px] rounded-bl-sm border border-medical-border bg-white p-3 shadow-card">
          {message.triageData ? (
            <TriageCard data={message.triageData} />
          ) : (
            <p className="text-sm text-slate-700">{message.content}</p>
          )}
        </div>
      )}
      <time className="mt-1 block text-xs text-medical-muted">
        {new Date(message.timestamp || Date.now()).toLocaleTimeString()}
      </time>
    </motion.article>
  );
}
