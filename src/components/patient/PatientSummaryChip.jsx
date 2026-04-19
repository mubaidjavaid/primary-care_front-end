export default function PatientSummaryChip({ patient }) {
  if (!patient?.age) return null;
  return (
    <div className="inline-flex rounded-badge border border-medical-border bg-white px-3 py-1 text-xs">
      👤 {patient.gender}, {patient.age} yrs ·{" "}
      {(patient.symptoms || []).join(", ")}
    </div>
  );
}
