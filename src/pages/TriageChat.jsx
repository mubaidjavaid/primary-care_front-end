import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiBookOpen } from "react-icons/fi";
import ChatWindow from "../components/chat/ChatWindow";
import EvidencePanel from "../components/chat/EvidencePanel";
import PatientForm from "../components/chat/PatientForm";
import { useChat } from "../context/ChatContext";
import { useTriageChat } from "../hooks/useChat";

export default function TriageChat() {
  const { submitTriage, retrievedChunks } = useTriageChat();
  const { isLoading } = useChat();
  const [showEvidence, setShowEvidence] = useState(false);
  const [showEmergencyOverlay, setShowEmergencyOverlay] = useState(false);
  const [emergencyData, setEmergencyData] = useState(null);

  const handleSubmit = async (patientInfo) => {
    try {
      const result = await submitTriage(patientInfo);
      if (result?.triageResponse?.redFlagTriggered || result?.isEmergency) {
        setEmergencyData(result.triageResponse);
        setShowEmergencyOverlay(true);
      }
      if (result?.retrievedChunks?.length > 0) {
        setShowEvidence(true);
      }
    } catch {
      toast.error("Triage request failed. Please try again.");
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Left: Patient Form (scrollable) */}
      <div className="w-full lg:w-[380px] xl:w-[420px] border-r border-gray-200 dark:border-gray-700 overflow-y-auto p-4 shrink-0 bg-gray-50/50 dark:bg-gray-900/50">
        <PatientForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>

      {/* Center: Chat */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <h2 className="font-semibold text-gray-800 dark:text-gray-200">
            Triage Consultation
          </h2>
          <button
            onClick={() => setShowEvidence(!showEvidence)}
            className={`hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
              showEvidence
                ? "bg-navy-100 dark:bg-navy-900/30 text-navy-800 dark:text-navy-200"
                : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <FiBookOpen className="w-4 h-4" />
            Evidence
          </button>
        </div>
        <ChatWindow />
      </div>

      {/* Right: Evidence Panel */}
      <EvidencePanel
        chunks={retrievedChunks}
        isOpen={showEvidence}
        onClose={() => setShowEvidence(false)}
      />

      {/* Emergency Overlay */}
      <AnimatePresence>
        {showEmergencyOverlay && emergencyData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-red-600/95 p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-2xl p-8 max-w-lg w-full text-center shadow-2xl"
            >
              <span className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-red-50 text-red-600">
                <AlertTriangle size={34} />
              </span>
              <h2 className="text-3xl font-black text-red-600 mb-4">
                EMERGENCY
              </h2>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Immediate Referral Required
              </h3>
              <p className="text-gray-600 mb-6">
                {emergencyData.recommendedAction}
              </p>
              {emergencyData.redFlags?.length > 0 && (
                <div className="bg-red-50 rounded-lg p-4 mb-6 text-left">
                  <p className="text-sm font-bold text-red-700 mb-2">
                    Red Flags Detected:
                  </p>
                  <ul className="text-sm text-red-600 space-y-1">
                    {emergencyData.redFlags.map((f, i) => (
                      <li key={i}>• {f.value}</li>
                    ))}
                  </ul>
                </div>
              )}
              <button
                onClick={() => setShowEmergencyOverlay(false)}
                className="btn-danger w-full text-lg py-3"
              >
                I Acknowledge — Begin Emergency Protocol
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
