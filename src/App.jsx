import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import ErrorBoundary from './components/ui/ErrorBoundary';
import Home from './pages/Home';
import Login from './pages/Login';
import TriageChat from './pages/TriageChat';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center min-h-screen"><span className="text-lg text-gray-400">Loading...</span></div>;
  return user ? children : <Navigate to="/login" replace />;
}

function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user?.role === 'admin' ? children : <Navigate to="/triage" replace />;
}

export default function App() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-medical-light dark:bg-gray-900">
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex flex-1 overflow-hidden">
          {user && (
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          )}

          <main className="flex-1 flex flex-col overflow-hidden">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/triage" element={<ProtectedRoute><TriageChat /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
}
