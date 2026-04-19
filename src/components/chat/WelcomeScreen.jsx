import { Stethoscope } from "lucide-react";
import Button from "../ui/Button";

const starters = ["Child Fever", "Maternity Checkup", "Chest Pain"];

export default function WelcomeScreen({ onSelectStarter }) {
  return (
    <div className="grid min-h-[300px] place-items-center text-center">
      <div>
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-blue-700">
          <Stethoscope size={28} />
        </div>
        <h3 className="mt-3 font-display text-3xl">Welcome to Triage AI</h3>
        <p className="mt-2 text-sm text-medical-muted">
          Start by filling patient information then describe the presenting
          symptoms.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {starters.map((item) => (
            <Button
              key={item}
              variant="secondary"
              onClick={() => onSelectStarter?.(item)}
            >
              {item}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
