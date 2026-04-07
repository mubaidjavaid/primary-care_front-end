import { motion } from 'framer-motion';
import TriageCard from './TriageCard';
import { formatTimestamp } from '../../utils/formatTriage';

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-3 px-4 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0 ${
        isUser ? 'bg-navy-600 text-white' : 'bg-navy-900 text-white'
      }`}>
        {isUser ? 'You' : 'AI'}
      </div>

      <div className={`max-w-[85%] lg:max-w-[70%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        {message.triageData ? (
          <TriageCard data={message.triageData} />
        ) : (
          <div className={`rounded-2xl px-4 py-3 shadow-sm ${
            isUser
              ? 'bg-navy-600 text-white rounded-tr-none'
              : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-tl-none border border-gray-100 dark:border-gray-700'
          }`}>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          </div>
        )}
        <span className="text-[10px] text-gray-400 px-1">
          {message.timestamp ? formatTimestamp(message.timestamp) : ''}
        </span>
      </div>
    </motion.div>
  );
}
