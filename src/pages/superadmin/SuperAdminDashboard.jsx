import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    Activity,
    Building2,
    Database,
    LineChart,
    ShieldCheck,
    UserRound,
    Users,
} from "lucide-react";
import { useMemo } from "react";
import toast from "react-hot-toast";
import AuditTrailTable from "../../components/admin/AuditTrailTable";
import FacilityCard from "../../components/admin/FacilityCard";
import QueryLogsTable from "../../components/admin/QueryLogsTable";
import StatsCard from "../../components/admin/StatsCard";
import SystemHealthPanel from "../../components/admin/SystemHealthPanel";
import UsersTable from "../../components/admin/UsersTable";
import QueryTrendChart from "../../components/analytics/QueryTrendChart";
import TopConditionsBar from "../../components/analytics/TopConditionsBar";
import UrgencyPieChart from "../../components/analytics/UrgencyPieChart";
import PageTransition from "../../components/layout/PageTransition";
import Tabs from "../../components/ui/Tabs";
import { adminService } from "../../services/admin.service";
import { useAuthStore } from "../../store/authStore";

export default function SuperAdminDashboard() {
  const queryClient = useQueryClient();
  const currentUser = useAuthStore((state) => state.user);

  const { data: statsData } = useQuery({
    queryKey: ["superadmin-stats"],
    queryFn: async () => (await adminService.getStats()).data,
  });
  const { data: usersData } = useQuery({
    queryKey: ["superadmin-users"],
    queryFn: async () => (await adminService.getUsers()).data,
  });
  const { data: facilitiesData } = useQuery({
    queryKey: ["superadmin-facilities"],
    queryFn: async () => (await adminService.getFacilities()).data,
  });
  const { data: auditData } = useQuery({
    queryKey: ["superadmin-audit"],
    queryFn: async () => (await adminService.getAuditTrail()).data,
  });

  const users = usersData?.users || [];
  const facilities = facilitiesData?.facilities || [];
  const auditRows = auditData?.rows || [];

  const statusMutation = useMutation({
    mutationFn: ({ userId, isActive }) =>
      adminService.updateUserStatus(userId, isActive),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["superadmin-users"] });
      queryClient.invalidateQueries({ queryKey: ["superadmin-audit"] });
      toast.success(variables.isActive ? "User enabled" : "User disabled");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to update user status",
      );
    },
  });

  const roleMutation = useMutation({
    mutationFn: ({ userId, role }) => adminService.updateUserRole(userId, role),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["superadmin-users"] });
      queryClient.invalidateQueries({ queryKey: ["superadmin-audit"] });
      toast.success(`Role updated to ${variables.role}`);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update role");
    },
  });

  const recentLogs = statsData?.recentLogs || [];

  const urgencyData = useMemo(
    () => [
      {
        name: "Routine",
        value: statsData?.urgencyBreakdown?.Routine || 0,
      },
      { name: "Urgent", value: statsData?.urgencyBreakdown?.Urgent || 0 },
      {
        name: "Emergency",
        value: statsData?.urgencyBreakdown?.Emergency || 0,
      },
      {
        name: "Insufficient",
        value: statsData?.urgencyBreakdown?.Insufficient || 0,
      },
    ],
    [statsData],
  );

  const trendData = useMemo(() => {
    const buckets = new Map();
    recentLogs.forEach((log) => {
      const d = new Date(log.createdAt || Date.now());
      const key = `${d.getMonth() + 1}/${d.getDate()}`;
      buckets.set(key, (buckets.get(key) || 0) + 1);
    });
    return Array.from(buckets.entries()).map(([day, value]) => ({
      day,
      value,
    }));
  }, [recentLogs]);

  const topConditions = useMemo(() => {
    const counts = recentLogs.reduce((acc, log) => {
      const condition = log?.triageResponse?.possibleCondition || "Unknown";
      acc[condition] = (acc[condition] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [recentLogs]);

  const tabs = ["Overview", "Users", "Facilities", "Activity", "System"];
  const panels = [
    <div className="space-y-4" key="overview">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        <StatsCard
          icon={Building2}
          label="Total Facilities"
          value={facilities.length}
          hint="Registered facilities"
        />
        <StatsCard
          icon={Users}
          label="Total Doctors"
          value={users.filter((user) => user.role === "doctor").length}
          hint="Doctor accounts"
        />
        <StatsCard
          icon={Activity}
          label="Queries"
          value={statsData?.totalQueries ?? 0}
          hint="All users"
        />
        <StatsCard
          icon={UserRound}
          label="Total Users"
          value={statsData?.totalUsers ?? users.length}
          hint="All roles"
        />
        <StatsCard
          icon={Database}
          label="Guidelines"
          value={statsData?.totalGuidelines ?? 0}
          hint={`${statsData?.totalChunks ?? 0} chunks indexed`}
        />
        <StatsCard
          icon={ShieldCheck}
          iconClassName="text-emerald-600"
          label="System Status"
          value="Healthy"
          hint="Core services online"
        />
      </div>
      <div className="grid gap-3 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <QueryTrendChart
            data={trendData.length ? trendData : [{ day: "N/A", value: 0 }]}
          />
        </div>
        <div className="lg:col-span-2">
          <UrgencyPieChart data={urgencyData} />
        </div>
      </div>
      <TopConditionsBar
        data={
          topConditions.length ? topConditions : [{ name: "No data", count: 0 }]
        }
      />
    </div>,
    <UsersTable
      key="users"
      users={users.map((user) => ({
        ...user,
        facility: user?.facility?.name || "-",
      }))}
      renderActions={(user) => (
        <div className="flex flex-wrap items-center justify-end gap-2">
          <select
            className="rounded border border-medical-border px-2 py-1 text-xs disabled:cursor-not-allowed disabled:opacity-60"
            value={user.role}
            disabled={
              String(user._id) === String(currentUser?._id) ||
              roleMutation.isPending
            }
            onChange={(event) =>
              roleMutation.mutate({
                userId: user._id,
                role: event.target.value,
              })
            }
          >
            <option value="viewer">viewer</option>
            <option value="doctor">doctor</option>
            <option value="admin">admin</option>
            <option value="superadmin">superadmin</option>
          </select>
          <button
            type="button"
            className={`rounded px-2 py-1 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-60 ${user.isActive ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`}
            disabled={
              String(user._id) === String(currentUser?._id) ||
              statusMutation.isPending
            }
            onClick={() =>
              statusMutation.mutate({
                userId: user._id,
                isActive: !user.isActive,
              })
            }
          >
            {user.isActive ? "Disable" : "Enable"}
          </button>
        </div>
      )}
    />,
    <div className="grid gap-3 lg:grid-cols-3" key="facilities">
      {facilities.slice(0, 12).map((facility) => (
        <FacilityCard
          key={facility._id}
          facility={{
            name: facility.name,
            district: facility.district,
            province: facility.province,
            doctors: users.filter(
              (user) =>
                String(user?.facility?._id || "") === String(facility._id),
            ).length,
            queriesToday: facility?.stats?.totalQueries || 0,
            badgeLevel:
              (facility?.stats?.emergencyCount || 0) > 0
                ? "Emergency"
                : "Routine",
          }}
        />
      ))}
    </div>,
    <div className="space-y-3" key="activity">
      <QueryLogsTable
        rows={recentLogs.map((log) => ({
          time: new Date(log.createdAt).toLocaleTimeString(),
          doctor: log?.userId?.name || "Unknown",
          patient: `${log?.patientInfo?.gender || "-"}/${log?.patientInfo?.age || "-"}`,
          urgency: log?.triageResponse?.urgencyLevel || "Routine",
          condition: log?.triageResponse?.possibleCondition || "Unknown",
          response: `${Math.round((log?.performance?.responseTimeMs || 0) / 1000)}s`,
        }))}
      />
      <AuditTrailTable
        rows={auditRows.map((row) => {
          const actor = row?.userId?.name || "System";
          return `${actor} ${row.action} ${row.resource} (${row.status}) at ${new Date(row.createdAt).toLocaleString()}`;
        })}
      />
    </div>,
    <div className="space-y-3" key="system">
      <div className="card p-4">
        <h4 className="mb-2 flex items-center gap-2 font-display text-2xl">
          <LineChart size={22} /> Global Health Summary
        </h4>
        <p className="text-sm text-medical-muted">
          Uptime and integration snapshots are visible below. User management
          actions are in the Users tab.
        </p>
      </div>
      <SystemHealthPanel />
    </div>,
  ];

  return (
    <PageTransition>
      <section className="space-y-4">
        <header>
          <h1 className="font-display text-4xl">Super Admin Dashboard</h1>
          <p className="text-sm text-medical-muted">
            System-wide control and governance
          </p>
        </header>
        <Tabs tabs={tabs} panels={panels} />
      </section>
    </PageTransition>
  );
}
