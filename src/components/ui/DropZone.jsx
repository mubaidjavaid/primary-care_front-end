import { useDropzone } from "react-dropzone";

export default function DropZone({ onDrop }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxSize: 50 * 1024 * 1024,
  });

  return (
    <div
      {...getRootProps()}
      className={`rounded-card border-2 border-dashed p-8 text-center ${isDragActive ? "border-navy-600 bg-blue-50" : "border-medical-border bg-white"}`}
    >
      <input {...getInputProps()} />
      <p className="font-ui text-sm font-semibold">Drop PDF or DOCX here</p>
      <p className="mt-1 text-xs text-medical-muted">
        Max 50MB · PDF, DOCX only
      </p>
    </div>
  );
}
