import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiSun, FiMoon, FiLogOut, FiMenu } from 'react-icons/fi';
import { useState, useEffect } from 'react';

export default function Navbar({ onToggleSidebar }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        <div className="flex items-center gap-3">
          {user && (
            <button onClick={onToggleSidebar} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <FiMenu className="w-5 h-5" />
            </button>
          )}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🩺</span>
            <span className="text-lg font-bold text-navy-900 dark:text-white hidden sm:block">
              TriageCare
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {user && (
            <>
              <Link to="/triage" className="hidden sm:inline-flex text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-navy-900 dark:hover:text-white px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                Triage
              </Link>
              <Link to="/dashboard" className="hidden sm:inline-flex text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-navy-900 dark:hover:text-white px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                Dashboard
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="hidden sm:inline-flex text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-navy-900 dark:hover:text-white px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  Admin
                </Link>
              )}
            </>
          )}
          <button onClick={() => setDark(!dark)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            {dark ? <FiSun className="w-5 h-5 text-yellow-400" /> : <FiMoon className="w-5 h-5 text-gray-600" />}
          </button>
          {user && (
            <div className="flex items-center gap-2 ml-2">
              <span className="hidden md:block text-sm text-gray-600 dark:text-gray-400">{user.name}</span>
              <button onClick={handleLogout} className="p-2 rounded-lg text-gray-500 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <FiLogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
