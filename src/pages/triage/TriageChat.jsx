import { useState } from "react";
import toast from "react-hot-toast";
import ChatWindow from "../../components/chat/ChatWindow";
import EmergencyOverlay from "../../components/chat/EmergencyOverlay";
import EvidenceDrawer from "../../components/chat/EvidenceDrawer";
import PageTransition from "../../components/layout/PageTransition";
import PatientIntakePanel from "../../components/patient/PatientIntakePanel";
import { useTriage } from "../../hooks/useTriage";
import { chatService } from "../../services/chat.service";
import { useChatStore } from "../../store/chatStore";
import { useUiStore } from "../../store/uiStore";

export default function TriageChat() {
  const { runTriage } = useTriage();
  const patientInfo = useChatStore((state) => state.patientInfo);
  const setPatientInfo = useChatStore((state) => state.setPatientInfo);
  const activeSessionId =
    useChatStore((state) => state.activeSessionId) || "active";
  const addMessage = useChatStore((state) => state.addMessage);
  const createSession = useChatStore((state) => state.createSession);
  const setActiveSession = useChatStore((state) => state.setActiveSession);
  const isEvidenceOpen = useUiStore((state) => state.isEvidenceOpen);
  const toggleEvidence = useUiStore((state) => state.toggleEvidence);
  const isEmergencyOverlay = useUiStore((state) => state.isEmergencyOverlay);
  const emergencyData = useUiStore((state) => state.emergencyData);
  const showEmergency = useUiStore((state) => state.showEmergency);
  const dismissEmergency = useUiStore((state) => state.dismissEmergency);
  const [chunks, setChunks] = useState([]);

  const onSend = async (queryText) => {
    try {
      if (!patientInfo?.symptoms || patientInfo.symptoms.length === 0) {
        toast.error("Please select at least one symptom before sending");
        return;
      }

      let sessionId = activeSessionId === "active" ? null : activeSessionId;

      if (!sessionId) {
        const { data } = await chatService.createSession({
          title: patientInfo?.symptoms?.[0] || "New Consultation",
        });
        createSession({
          ...data,
          messageCount: 0,
          urgencyLevel: "Routine",
        });
        setActiveSession(data._id);
        sessionId = data._id;
      }

      addMessage(sessionId, {
        role: "user",
        content: queryText,
        timestamp: Date.now(),
      });

      try {
        const response = await runTriage({
          patientInfo,
          queryText,
          sessionId,
        });

        if (!response || !response.triageResponse) {
          throw new Error("Invalid response from server");
        }

        addMessage(sessionId, {
          role: "assistant",
          triageData: response.triageResponse,
          timestamp: Date.now(),
        });
        setChunks(response.retrievedChunks || []);
        if (response?.triageResponse?.urgencyLevel === "Emergency") {
          showEmergency(response.triageResponse);
        }
      } catch (error) {
        console.error("Triage error:", error);
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            "Failed to get triage response. Please try again.",
        );
        addMessage(sessionId, {
          role: "assistant",
          content:
            "Sorry, I encountered an error processing your request. Please try again or contact support if the issue persists.",
          timestamp: Date.now(),
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <PageTransition>
      <div className="grid h-full grid-cols-1 gap-4 xl:grid-cols-[minmax(300px,360px)_minmax(0,1fr)]">
        <PatientIntakePanel onSave={setPatientInfo} />
        <div className="relative min-h-[55dvh] h-full">
          <ChatWindow onSend={onSend} />
          <button
            type="button"
            className="btn-secondary absolute right-4 top-4"
            onClick={toggleEvidence}
          >
            Evidence
          </button>
          <EvidenceDrawer
            open={isEvidenceOpen}
            chunks={chunks}
            onClose={toggleEvidence}
          />
        </div>
      </div>
      <EmergencyOverlay
        open={isEmergencyOverlay}
        data={emergencyData}
        onAcknowledge={dismissEmergency}
      />
    </PageTransition>
  );
}
