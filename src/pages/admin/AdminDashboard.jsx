import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BookOpen, Building2, CircleGauge, Users } from "lucide-react";
import { useMemo, useState } from "react";
import GuidelineList from "../../components/admin/GuidelineList";
import GuidelineUploader from "../../components/admin/GuidelineUploader";
import QueryLogsTable from "../../components/admin/QueryLogsTable";
import StatsCard from "../../components/admin/StatsCard";
import SystemHealthPanel from "../../components/admin/SystemHealthPanel";
import UserFormModal from "../../components/admin/UserFormModal";
import UsersTable from "../../components/admin/UsersTable";
import LiveFeedWidget from "../../components/analytics/LiveFeedWidget";
import TopConditionsBar from "../../components/analytics/TopConditionsBar";
import PageTransition from "../../components/layout/PageTransition";
import Tabs from "../../components/ui/Tabs";
import { adminService } from "../../services/admin.service";
import { guidelineService } from "../../services/guideline.service";

export default function AdminDashboard() {
  const [openUserModal, setOpenUserModal] = useState(false);
  const queryClient = useQueryClient();

  const { data: statsData } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => (await adminService.getStats()).data,
  });
  const { data: usersData } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => (await adminService.getUsers()).data,
  });
  const { data: logsData } = useQuery({
    queryKey: ["admin-logs"],
    queryFn: async () => (await adminService.getLogs({ limit: 20 })).data,
  });
  const { data: guidelines } = useQuery({
    queryKey: ["guidelines"],
    queryFn: async () => (await guidelineService.list()).data,
  });

  const users = usersData?.users || [];
  const logs = logsData?.logs || [];
  const guidelineItems = Array.isArray(guidelines) ? guidelines : [];
  const guidelineRows = guidelineItems.map((item) => ({
    id: item._id || item.id,
    filename: item.filename || item.title || "guideline",
    chunks: item.totalChunks || item.chunks || 0,
  }));

  const topConditions = useMemo(() => {
    const counts = logs.reduce((acc, log) => {
      const condition = log?.triageResponse?.possibleCondition || "Unknown";
      acc[condition] = (acc[condition] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [logs]);

  const tabs = ["Overview", "Users", "Guidelines", "Logs", "Settings"];
  const panels = [
    <div className="space-y-3" key="overview">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          icon={Users}
          label="Total Users"
          value={statsData?.totalUsers ?? 0}
          hint="Active system users"
        />
        <StatsCard
          icon={Building2}
          label="Facilities"
          value={users.filter((user) => Boolean(user.facility)).length}
          hint="Multi-site support"
        />
        <StatsCard
          icon={BookOpen}
          label="Guidelines"
          value={statsData?.totalGuidelines ?? guidelineRows.length}
          hint="Versioned corpus"
        />
        <StatsCard
          icon={CircleGauge}
          iconClassName="text-emerald-600"
          label="Queries Today"
          value={statsData?.totalQueries ?? 0}
          hint="Live feed enabled"
        />
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <LiveFeedWidget
          events={logs.slice(0, 8).map((log) => {
            const doctor = log?.userId?.name || "Unknown doctor";
            const urgency = log?.triageResponse?.urgencyLevel || "Routine";
            return `${doctor} submitted ${urgency} triage case`;
          })}
        />
        <TopConditionsBar data={topConditions} />
      </div>
    </div>,
    <div className="space-y-3" key="users">
      <button className="btn-primary" onClick={() => setOpenUserModal(true)}>
        + Add User
      </button>
      <UsersTable
        users={users.map((user) => ({
          ...user,
          facility: user?.facility?.name || "-",
        }))}
      />
      <UserFormModal
        isOpen={openUserModal}
        onClose={() => setOpenUserModal(false)}
        onCreated={() => {
          queryClient.invalidateQueries({ queryKey: ["admin-users"] });
          queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
        }}
      />
    </div>,
    <div className="grid gap-3 lg:grid-cols-2" key="guidelines">
      <GuidelineList items={guidelineRows} />
      <GuidelineUploader />
    </div>,
    <QueryLogsTable
      key="logs"
      rows={logs.map((log) => ({
        time: new Date(log.createdAt).toLocaleTimeString(),
        doctor: log?.userId?.name || "Unknown",
        patient: `${log?.patientInfo?.gender || "-"}/${log?.patientInfo?.age || "-"}`,
        urgency: log?.triageResponse?.urgencyLevel || "Routine",
        condition: log?.triageResponse?.possibleCondition || "Unknown",
        response: `${Math.round((log?.performance?.responseTimeMs || 0) / 1000)}s`,
      }))}
    />,
    <SystemHealthPanel key="settings" />,
  ];

  return (
    <PageTransition>
      <section>
        <h1 className="font-display text-4xl">Admin Dashboard</h1>
        <p className="mb-4 text-sm text-medical-muted">
          Facility controls and analytics
        </p>
        <Tabs tabs={tabs} panels={panels} />
      </section>
    </PageTransition>
  );
}
