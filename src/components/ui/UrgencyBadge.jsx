import { motion } from 'framer-motion';
import { getUrgencyConfig } from '../../utils/formatTriage';

export default function UrgencyBadge({ level, size = 'md' }) {
  const config = getUrgencyConfig(level);
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-1.5 font-bold rounded-full ${config.bg} ${config.text} ${sizeClasses[size]}`}
    >
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </motion.span>
  );
}
