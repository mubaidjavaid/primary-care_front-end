import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import UrgencyBadge from '../components/ui/UrgencyBadge';

export default function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const { data } = await api.get('/triage/logs?limit=20');
        setLogs(data.logs || []);
      } catch (err) {
        console.error('Failed to fetch logs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const stats = {
    total: logs.length,
    emergency: logs.filter(l => l.triageResponse?.urgencyLevel === 'Emergency').length,
    urgent: logs.filter(l => l.triageResponse?.urgencyLevel === 'Urgent').length,
    routine: logs.filter(l => l.triageResponse?.urgencyLevel === 'Routine').length,
  };

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-navy-900 dark:text-white mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Queries', value: stats.total, color: 'text-navy-900 dark:text-white' },
          { label: 'Emergency', value: stats.emergency, color: 'text-red-600' },
          { label: 'Urgent', value: stats.urgent, color: 'text-orange-500' },
          { label: 'Routine', value: stats.routine, color: 'text-emerald-500' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="card text-center"
          >
            <p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1">{s.label}</p>
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="card">
        <h2 className="text-lg font-bold text-navy-900 dark:text-white mb-4">Recent Triage History</h2>
        {loading ? (
          <p className="text-center text-gray-400 py-8">Loading...</p>
        ) : logs.length === 0 ? (
          <p className="text-center text-gray-400 py-8">No triage queries yet.</p>
        ) : (
          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log._id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-gray-100 dark:border-gray-700">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 dark:text-gray-200 truncate">
                    {log.triageResponse?.possibleCondition || 'Unknown'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {log.patientInfo?.age}y {log.patientInfo?.gender} — {log.patientInfo?.symptoms?.join(', ')}
                  </p>
                </div>
                <UrgencyBadge level={log.triageResponse?.urgencyLevel} size="sm" />
                <span className="text-xs text-gray-400 shrink-0">
                  {new Date(log.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
