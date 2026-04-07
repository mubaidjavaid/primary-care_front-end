import { motion, AnimatePresence } from 'framer-motion';
import { FiBookOpen, FiChevronRight, FiX } from 'react-icons/fi';

export default function EvidencePanel({ chunks = [], isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 360, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="hidden lg:flex flex-col bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <FiBookOpen className="w-4 h-4" />
              Evidence Sources
            </h3>
            <button onClick={onClose} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              <FiX className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chunks.length === 0 ? (
              <p className="text-sm text-gray-400 text-center mt-8">
                No evidence sources for the current query.
              </p>
            ) : (
              chunks.slice(0, 5).map((chunk, i) => (
                <motion.div
                  key={chunk.id || i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="card !p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-navy-600 dark:text-navy-300">
                      Source {i + 1}
                    </span>
                    {chunk.score && (
                      <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">
                        {(chunk.score * 100).toFixed(0)}% match
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    {chunk.metadata?.source || 'Clinical Guideline'}
                    {chunk.metadata?.category && ` • ${chunk.metadata.category}`}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-4">
                    {chunk.content}
                  </p>
                </motion.div>
              ))
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
