import { Activity, AlertCircle, AlertTriangle, BarChart3 } from "lucide-react";
import StatsCard from "../../components/admin/StatsCard";
import QueryTrendChart from "../../components/analytics/QueryTrendChart";
import UrgencyPieChart from "../../components/analytics/UrgencyPieChart";
import PageTransition from "../../components/layout/PageTransition";

const trendData = [
  { day: "Mon", value: 10 },
  { day: "Tue", value: 14 },
  { day: "Wed", value: 9 },
  { day: "Thu", value: 17 },
  { day: "Fri", value: 24 },
  { day: "Sat", value: 19 },
  { day: "Sun", value: 13 },
];

const urgencyData = [
  { name: "Routine", value: 60 },
  { name: "Urgent", value: 30 },
  { name: "Emergency", value: 8 },
  { name: "Insufficient", value: 2 },
];

export default function Dashboard() {
  return (
    <PageTransition>
      <section className="space-y-4">
        <header>
          <h1 className="font-display text-4xl">Good morning, Dr. Ahmed</h1>
          <p className="text-sm text-medical-muted">
            Here is your activity for the past 7 days
          </p>
        </header>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            icon={BarChart3}
            label="Total Today"
            value="24"
            hint="+3 from yesterday"
          />
          <StatsCard
            icon={AlertTriangle}
            iconClassName="text-amber-600"
            label="Urgent"
            value="7"
            hint="29% of all"
          />
          <StatsCard
            icon={AlertCircle}
            iconClassName="text-red-600"
            label="Emergency"
            value="2"
            hint="Immediate referral"
          />
          <StatsCard
            icon={Activity}
            iconClassName="text-emerald-600"
            label="Avg. Time"
            value="1.4s"
            hint="Per query"
          />
        </div>

        <div className="grid gap-3 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <QueryTrendChart data={trendData} />
          </div>
          <div className="lg:col-span-2">
            <UrgencyPieChart data={urgencyData} />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
