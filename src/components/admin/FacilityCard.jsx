import UrgencyBadge from "../ui/UrgencyBadge";

export default function FacilityCard({ facility }) {
  return (
    <article className="card p-4">
      <h4 className="font-ui text-lg font-semibold">{facility.name}</h4>
      <p className="text-xs text-medical-muted">
        {facility.district} · {facility.province}
      </p>
      <p className="mt-2 text-sm">
        Doctors: {facility.doctors || 0} · Queries today:{" "}
        {facility.queriesToday || 0}
      </p>
      <div className="mt-3">
        <UrgencyBadge level={facility.badgeLevel || "Routine"} />
      </div>
    </article>
  );
}
