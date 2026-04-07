import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const features = [
  { icon: '🩺', title: 'AI-Powered Triage', desc: 'Evidence-based triage assessment using clinical guidelines from WHO, MoH Pakistan, and IMCI protocols.' },
  { icon: '🚨', title: 'Red Flag Detection', desc: 'Automatic detection of emergency symptoms with instant alerts for critical cases requiring immediate referral.' },
  { icon: '📋', title: 'Guideline-Grounded', desc: 'All recommendations are grounded in uploaded clinical guidelines — no hallucination, no speculation.' },
  { icon: '📊', title: 'Audit Trail', desc: 'Every triage query is logged for review, quality assurance, and clinical audit purposes.' },
];

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-medical-light dark:bg-gray-900">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-16 lg:py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-6xl mb-6 block">🩺</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-navy-900 dark:text-white mb-4">
            Primary Care Triage Assistant
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            AI-powered clinical decision support for Pakistan's Basic Health Units and Rural Health Centers. 
            Evidence-based triage using WHO and MoH guidelines.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={user ? '/triage' : '/login'} className="btn-primary text-lg px-8 py-3">
              {user ? 'Start Triage' : 'Get Started'}
            </Link>
            {!user && (
              <Link to="/login" className="text-navy-600 dark:text-navy-300 font-medium hover:underline text-lg">
                Sign In
              </Link>
            )}
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card text-center"
            >
              <span className="text-4xl mb-3 block">{f.icon}</span>
              <h3 className="font-bold text-navy-900 dark:text-white mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="text-center py-6 text-xs text-gray-400">
        Decision support tool only. Not for diagnostic purposes.
      </footer>
    </div>
  );
}
