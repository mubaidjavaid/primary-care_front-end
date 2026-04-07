import { useState, useEffect } from 'react';
import api from '../../services/api';
import UrgencyBadge from '../ui/UrgencyBadge';

export default function QueryLogs() {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/admin/logs?page=${page}&limit=20`);
        setLogs(data.logs);
        setTotalPages(data.pages);
      } catch (err) {
        console.error('Failed to fetch logs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [page]);

  return (
    <div className="card overflow-hidden">
      <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-4">Triage Query Logs</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 text-left">
              <th className="pb-3 font-semibold text-gray-500 dark:text-gray-400">Date</th>
              <th className="pb-3 font-semibold text-gray-500 dark:text-gray-400">Patient</th>
              <th className="pb-3 font-semibold text-gray-500 dark:text-gray-400">Symptoms</th>
              <th className="pb-3 font-semibold text-gray-500 dark:text-gray-400">Condition</th>
              <th className="pb-3 font-semibold text-gray-500 dark:text-gray-400">Urgency</th>
              <th className="pb-3 font-semibold text-gray-500 dark:text-gray-400">Time (ms)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {loading ? (
              <tr><td colSpan={6} className="py-8 text-center text-gray-400">Loading...</td></tr>
            ) : logs.length === 0 ? (
              <tr><td colSpan={6} className="py-8 text-center text-gray-400">No logs found</td></tr>
            ) : (
              logs.map((log) => (
                <tr key={log._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-3 text-gray-600 dark:text-gray-400">
                    {new Date(log.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 text-gray-800 dark:text-gray-200">
                    {log.patientInfo?.age}y {log.patientInfo?.gender}
                  </td>
                  <td className="py-3 text-gray-600 dark:text-gray-400 max-w-[200px] truncate">
                    {log.patientInfo?.symptoms?.join(', ')}
                  </td>
                  <td className="py-3 text-gray-800 dark:text-gray-200 max-w-[200px] truncate">
                    {log.triageResponse?.possibleCondition}
                  </td>
                  <td className="py-3">
                    <UrgencyBadge level={log.triageResponse?.urgencyLevel} size="sm" />
                  </td>
                  <td className="py-3 text-gray-600 dark:text-gray-400">
                    {log.responseTimeMs || '—'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded text-sm border border-gray-200 dark:border-gray-600 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Previous
          </button>
          <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded text-sm border border-gray-200 dark:border-gray-600 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
