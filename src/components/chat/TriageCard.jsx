import { splitActions } from "../../utils/formatTriage";
import ExportButton from "../ui/ExportButton";
import UrgencyBadge from "../ui/UrgencyBadge";

export default function TriageCard({ data }) {
  if (!data) return null;

  const actionItems = splitActions(data.recommendedAction);

  return (
    <section id="triage-card-export" className="space-y-4">
      <header className="flex items-center justify-between">
        <h3 className="font-display text-xl">Triage Assessment</h3>
        <ExportButton
          containerId="triage-card-export"
          fileName={`triage-report-${Date.now()}.pdf`}
        />
      </header>

      <div>
        <p className="text-xs font-semibold uppercase text-medical-muted">
          Possible Condition
        </p>
        <p className="mt-1 font-ui text-base font-semibold text-slate-900">
          {data.possibleCondition}
        </p>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase text-medical-muted">
          Urgency Level
        </p>
        <div className="mt-2">
          <UrgencyBadge level={data.urgencyLevel} />
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase text-medical-muted">
          Recommended Action
        </p>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-700">
          {actionItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </div>

      <div className="rounded-input border border-medical-border bg-slate-50 p-3">
        <p className="text-xs font-semibold uppercase text-medical-muted">
          Supporting Guideline
        </p>
        <p className="mt-2 text-sm italic text-slate-700">
          "{data.guidelineExcerpt}"
        </p>
        <p className="mt-1 text-xs text-medical-muted">
          {(data.sourceReferences || []).join(", ")}
        </p>
      </div>

      <div className="rounded-input border border-medical-border bg-slate-50 p-3 text-xs text-slate-600">
        ⚕️ {data.disclaimer}
      </div>
    </section>
  );
}
