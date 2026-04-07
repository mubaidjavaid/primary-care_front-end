import { motion } from 'framer-motion';

export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 px-4">
      <div className="w-8 h-8 rounded-full bg-navy-900 flex items-center justify-center text-white text-sm shrink-0">
        AI
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-navy-400 rounded-full"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
