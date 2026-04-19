import { FileText } from "lucide-react";
import { useState } from "react";
import { exportTriagePDF } from "../../utils/exportPDF";

export default function ExportButton({
  containerId,
  fileName = "triage-report.pdf",
  payload,
}) {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      await exportTriagePDF(containerId, fileName, payload);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      className="btn-secondary gap-2"
      disabled={loading}
    >
      <FileText size={14} /> {loading ? "Generating PDF..." : "Export PDF"}
    </button>
  );
}
