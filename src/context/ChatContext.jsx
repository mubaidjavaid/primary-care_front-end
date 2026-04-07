import { createContext, useContext, useState, useCallback } from 'react';
import api from '../services/api';

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSessions = useCallback(async () => {
    try {
      const { data } = await api.get('/chat/sessions');
      setSessions(data);
    } catch (err) {
      console.error('Failed to fetch sessions:', err);
    }
  }, []);

  const createSession = useCallback(async (title) => {
    const { data } = await api.post('/chat/sessions', { title });
    setSessions(prev => [data, ...prev]);
    setActiveSession(data);
    setMessages([]);
    return data;
  }, []);

  const loadSession = useCallback(async (sessionId) => {
    const { data } = await api.get(`/chat/sessions/${sessionId}`);
    setActiveSession(data);
    setMessages(data.messages || []);
    return data;
  }, []);

  const deleteSession = useCallback(async (sessionId) => {
    await api.delete(`/chat/sessions/${sessionId}`);
    setSessions(prev => prev.filter(s => s._id !== sessionId));
    if (activeSession?._id === sessionId) {
      setActiveSession(null);
      setMessages([]);
    }
  }, [activeSession]);

  const addMessage = useCallback((message) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setActiveSession(null);
  }, []);

  return (
    <ChatContext.Provider value={{
      sessions, activeSession, messages, isLoading,
      setIsLoading, fetchSessions, createSession, loadSession,
      deleteSession, addMessage, clearMessages, setActiveSession,
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within ChatProvider');
  return ctx;
};
