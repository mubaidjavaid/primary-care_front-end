import { useRef, useEffect } from 'react';
import { useChat } from '../../context/ChatContext';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

export default function ChatWindow() {
  const { messages, isLoading } = useChat();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto py-4 space-y-4">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center px-6">
          <span className="text-5xl mb-4">🩺</span>
          <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-2">
            Primary Care Triage Assistant
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
            Enter patient information in the form and click "Run Triage" to get an evidence-based assessment based on clinical guidelines for Pakistan's primary healthcare facilities.
          </p>
        </div>
      ) : (
        messages.map((msg, i) => <MessageBubble key={i} message={msg} />)
      )}
      {isLoading && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
}
