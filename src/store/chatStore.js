import { create } from "zustand";

export const useChatStore = create((set) => ({
  sessions: [],
  activeSessionId: null,
  messages: {},
  isTyping: false,
  patientInfo: {},
  setSessions: (sessions) => set({ sessions }),
  setActiveSession: (id) => set({ activeSessionId: id }),
  setSessionMessages: (sessionId, sessionMessages) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [sessionId]: sessionMessages,
      },
    })),
  addMessage: (sessionId, message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [sessionId]: [...(state.messages[sessionId] || []), message],
      },
    })),
  setTyping: (isTyping) => set({ isTyping }),
  setPatientInfo: (patientInfo) => set({ patientInfo }),
  createSession: (session) =>
    set((state) => ({
      sessions: [
        session,
        ...state.sessions.filter((s) => s._id !== session._id),
      ],
      activeSessionId: session._id,
    })),
  deleteSession: (id) =>
    set((state) => ({
      sessions: state.sessions.filter((session) => session._id !== id),
      activeSessionId:
        state.activeSessionId === id ? null : state.activeSessionId,
    })),
}));
