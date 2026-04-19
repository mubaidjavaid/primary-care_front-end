import { WifiOff } from "lucide-react";
import { useOffline } from "../../hooks/useOffline";

export default function OfflineBanner() {
  const { isOffline } = useOffline();
  if (!isOffline) return null;

  return (
    <div className="flex items-center justify-center gap-2 bg-emergency-bg py-2 text-sm text-emergency-text">
      <WifiOff size={14} /> Offline mode active. Data sync will resume
      automatically.
    </div>
  );
}
