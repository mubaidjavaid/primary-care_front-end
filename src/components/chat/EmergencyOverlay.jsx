import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function EmergencyOverlay({ open, data, onAcknowledge }) {
  if (!open || !data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-[9999] grid place-items-center bg-red-900/95 p-4"
      role="alertdialog"
      aria-modal="true"
    >
      <div className="w-full max-w-xl rounded-modal border border-red-300 bg-red-950/70 p-8 text-white shadow-modal">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-red-500/20 text-red-100">
          <AlertTriangle size={34} className="animate-pulse" />
        </div>
        <h2 className="mt-3 text-center font-display text-4xl text-white">
          Emergency Detected
        </h2>
        <p className="mt-4 text-center text-lg">
          Red-flag symptom identified: "
          {(data.redFlagsDetected || []).join(", ") || "Critical symptoms"}"
        </p>
        <div className="mt-5 rounded-input border border-red-300/40 bg-red-800/40 p-4 text-sm">
          <p className="font-semibold">ACTION REQUIRED</p>
          <p className="mt-1">
            Refer immediately to nearest BHU/RHC. Call emergency: 1122. Do NOT
            delay.
          </p>
        </div>
        <button
          type="button"
          className="btn-primary mt-6 w-full justify-center bg-red-500 hover:bg-red-400"
          onClick={onAcknowledge}
        >
          I Understand — Show Triage Details
        </button>
      </div>
    </motion.div>
  );
}
