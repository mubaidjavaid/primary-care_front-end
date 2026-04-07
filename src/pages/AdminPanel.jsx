import { useState, useEffect } from 'react';
import GuidelineUpload from '../components/admin/GuidelineUpload';
import QueryLogs from '../components/admin/QueryLogs';
import api from '../services/api';
import { FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function AdminPanel() {
  const [tab, setTab] = useState('upload');
  const [guidelines, setGuidelines] = useState([]);
  const [stats, setStats] = useState(null);

  const fetchGuidelines = async () => {
    try {
      const { data } = await api.get('/guidelines');
      setGuidelines(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStats = async () => {
    try {
      const { data } = await api.get('/admin/stats');
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGuidelines();
    fetchStats();
  }, []);

  const deleteGuideline = async (id) => {
    if (!confirm('Delete this guideline and all its chunks?')) return;
    try {
      await api.delete(`/guidelines/${id}`);
      toast.success('Guideline deleted');
      fetchGuidelines();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  const tabs = [
    { key: 'upload', label: 'Upload Guidelines' },
    { key: 'guidelines', label: 'Manage Guidelines' },
    { key: 'logs', label: 'Query Logs' },
    { key: 'stats', label: 'Statistics' },
  ];

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-navy-900 dark:text-white mb-6">Admin Panel</h1>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              tab === t.key
                ? 'bg-navy-900 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'upload' && <GuidelineUpload onUploaded={fetchGuidelines} />}

      {tab === 'guidelines' && (
        <div className="card">
          <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-4">
            Uploaded Guidelines ({guidelines.length})
          </h3>
          {guidelines.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No guidelines uploaded yet.</p>
          ) : (
            <div className="space-y-3">
              {guidelines.map(g => (
                <div key={g._id} className="flex items-center gap-4 p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 dark:text-gray-200 truncate">{g.title}</p>
                    <p className="text-xs text-gray-500">
                      {g.source} • {g.category} • {g.totalChunks} chunks • {g.isIngested ? '✓ Ingested' : '⏳ Pending'}
                    </p>
                  </div>
                  <button onClick={() => deleteGuideline(g._id)} className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'logs' && <QueryLogs />}

      {tab === 'stats' && stats && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: 'Total Queries', value: stats.totalQueries },
            { label: 'Total Sessions', value: stats.totalSessions },
            { label: 'Total Users', value: stats.totalUsers },
            { label: 'Guidelines', value: stats.totalGuidelines },
            { label: 'Guideline Chunks', value: stats.totalChunks },
            { label: 'Emergency Cases', value: stats.urgencyBreakdown?.Emergency || 0 },
          ].map(s => (
            <div key={s.label} className="card text-center">
              <p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1">{s.label}</p>
              <p className="text-3xl font-bold text-navy-900 dark:text-white">{s.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
