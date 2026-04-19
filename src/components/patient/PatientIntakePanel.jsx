import { useEffect, useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";
import SymptomsTagInput from "./SymptomsTagInput";
import VitalsForm from "./VitalsForm";

const initialPatient = {
  age: "",
  gender: "Male",
  symptoms: [],
  vitals: {},
  additionalNotes: "",
};

export default function PatientIntakePanel({ onSave }) {
  const [patient, setPatient] = useState(initialPatient);

  // Auto-save patient info whenever it changes
  useEffect(() => {
    onSave?.(patient);
  }, [patient, onSave]);

  return (
    <div className="card space-y-4 p-4">
      <h3 className="font-display text-2xl">Patient Information</h3>
      <Input
        label="Age"
        id="age"
        type="number"
        min={0}
        max={120}
        value={patient.age}
        onChange={(e) =>
          setPatient({ ...patient, age: Number(e.target.value) })
        }
      />
      <Select
        label="Gender"
        id="gender"
        value={patient.gender}
        onChange={(e) => setPatient({ ...patient, gender: e.target.value })}
        options={[
          { value: "Male", label: "Male" },
          { value: "Female", label: "Female" },
          { value: "Other", label: "Other" },
        ]}
      />
      <div>
        <p className="mb-1 text-sm font-medium text-slate-700">
          Chief Complaint / Symptoms
        </p>
        <SymptomsTagInput
          value={patient.symptoms}
          onChange={(symptoms) => setPatient({ ...patient, symptoms })}
        />
      </div>
      <VitalsForm
        vitals={patient.vitals}
        onChange={(vitals) => setPatient({ ...patient, vitals })}
      />
      <label className="block space-y-1">
        <span className="text-sm font-medium text-slate-700">
          Additional Notes
        </span>
        <textarea
          className="input-field"
          maxLength={200}
          value={patient.additionalNotes}
          onChange={(e) =>
            setPatient({ ...patient, additionalNotes: e.target.value })
          }
        />
      </label>
      <div className="flex justify-end gap-2">
        <Button
          variant="secondary"
          type="button"
          onClick={() => {
            setPatient(initialPatient);
          }}
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={() => {
            onSave(patient);
          }}
        >
          Save Patient Info
        </Button>
      </div>
    </div>
  );
}
