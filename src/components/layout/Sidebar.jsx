import { useEffect } from 'react';
import { useChat } from '../../context/ChatContext';
import { FiPlus, FiMessageSquare, FiTrash2, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function Sidebar({ isOpen, onClose }) {
  const { sessions, activeSession, fetchSessions, createSession, loadSession, deleteSession, clearMessages } = useChat();

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const handleNewChat = async () => {
    clearMessages();
    onClose?.();
  };

  const handleLoadSession = async (id) => {
    await loadSession(id);
    onClose?.();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-800 dark:text-gray-200">Consultations</h2>
          <button onClick={onClose} className="lg:hidden p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
            <FiX className="w-5 h-5" />
          </button>
        </div>
        <button onClick={handleNewChat} className="w-full flex items-center gap-2 btn-primary justify-center text-sm">
          <FiPlus className="w-4 h-4" />
          New Consultation
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        <AnimatePresence>
          {sessions.map((session) => (
            <motion.div
              key={session._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`group flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-colors ${
                activeSession?._id === session._id
                  ? 'bg-navy-100 dark:bg-navy-900/30 text-navy-900 dark:text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => handleLoadSession(session._id)}
            >
              <FiMessageSquare className="w-4 h-4 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{session.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(session.updatedAt || session.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); deleteSession(session._id); }}
                className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-400 hover:text-red-500 transition-all"
              >
                <FiTrash2 className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {sessions.length === 0 && (
          <p className="text-center text-sm text-gray-400 dark:text-gray-500 mt-8">No consultations yet</p>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-col">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: -288 }}
              animate={{ x: 0 }}
              exit={{ x: -288 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-800 z-50 lg:hidden shadow-xl"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
