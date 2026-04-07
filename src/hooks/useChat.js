import { useState, useCallback } from 'react';
import api from '../services/api';
import { useChat as useChatContext } from '../context/ChatContext';

export function useTriageChat() {
  const [triageResult, setTriageResult] = useState(null);
  const [retrievedChunks, setRetrievedChunks] = useState([]);
  const { activeSession, addMessage, setIsLoading, createSession } = useChatContext();

  const submitTriage = useCallback(async (patientInfo, queryText) => {
    setIsLoading(true);
    try {
      let sessionId = activeSession?._id;
      if (!sessionId) {
        const session = await createSession(
          patientInfo.symptoms?.[0] || 'New Consultation'
        );
        sessionId = session._id;
      }

      addMessage({
        role: 'user',
        content: queryText || `Patient: ${patientInfo.age}y ${patientInfo.gender}, presenting with ${patientInfo.symptoms?.join(', ')}`,
        timestamp: new Date(),
      });

      const { data } = await api.post('/triage/query', {
        patientInfo,
        queryText,
        sessionId,
      });

      setTriageResult(data.triageResponse);
      setRetrievedChunks(data.retrievedChunks || []);

      addMessage({
        role: 'assistant',
        content: data.triageResponse.recommendedAction,
        triageData: data.triageResponse,
        retrievedChunks: data.retrievedChunks,
        timestamp: new Date(),
      });

      return data;
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Triage request failed';
      addMessage({
        role: 'assistant',
        content: `Error: ${errMsg}`,
        timestamp: new Date(),
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [activeSession, addMessage, createSession, setIsLoading]);

  return { submitTriage, triageResult, retrievedChunks };
}
