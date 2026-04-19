import { useState } from "react";
import DropZone from "../ui/DropZone";
import ProgressBar from "../ui/ProgressBar";

export default function GuidelineUploader() {
  const [progress, setProgress] = useState(0);

  const onDrop = () => {
    setProgress(20);
    setTimeout(() => setProgress(100), 600);
  };

  return (
    <div className="card space-y-3 p-4">
      <h4 className="font-display text-2xl">Upload Guideline</h4>
      <DropZone onDrop={onDrop} />
      <ProgressBar value={progress} />
      <p className="text-xs text-slate-500">
        {progress === 100 ? "47 chunks created" : "Waiting for upload"}
      </p>
    </div>
  );
}
