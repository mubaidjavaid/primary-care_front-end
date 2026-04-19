import Accordion from "../ui/Accordion";
import Input from "../ui/Input";

export default function VitalsForm({ vitals, onChange }) {
  return (
    <Accordion title="Vital Signs" defaultOpen>
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Blood Pressure"
          id="bloodPressure"
          value={vitals.bloodPressure || ""}
          onChange={(e) =>
            onChange({ ...vitals, bloodPressure: e.target.value })
          }
          placeholder="120/80"
        />
        <Input
          label="Temperature (°C)"
          id="temperature"
          type="number"
          value={vitals.temperature || ""}
          onChange={(e) =>
            onChange({ ...vitals, temperature: Number(e.target.value) })
          }
        />
        <Input
          label="Heart Rate"
          id="heartRate"
          type="number"
          value={vitals.heartRate || ""}
          onChange={(e) =>
            onChange({ ...vitals, heartRate: Number(e.target.value) })
          }
        />
        <Input
          label="Resp. Rate"
          id="respiratoryRate"
          type="number"
          value={vitals.respiratoryRate || ""}
          onChange={(e) =>
            onChange({ ...vitals, respiratoryRate: Number(e.target.value) })
          }
        />
        <Input
          label="SpO2"
          id="oxygenSaturation"
          type="number"
          value={vitals.oxygenSaturation || ""}
          onChange={(e) =>
            onChange({ ...vitals, oxygenSaturation: Number(e.target.value) })
          }
        />
        <Input
          label="Weight (kg)"
          id="weight"
          type="number"
          value={vitals.weight || ""}
          onChange={(e) =>
            onChange({ ...vitals, weight: Number(e.target.value) })
          }
        />
      </div>
      {vitals.oxygenSaturation && vitals.oxygenSaturation < 90 && (
        <p className="mt-2 text-xs text-emergency-text">
          SpO2 below 90% is critical.
        </p>
      )}
      {vitals.temperature && vitals.temperature > 39 && (
        <p className="mt-1 text-xs text-emergency-text">High fever detected.</p>
      )}
    </Accordion>
  );
}
