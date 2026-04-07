import { motion } from 'framer-motion';
import UrgencyBadge from '../ui/UrgencyBadge';

export default function TriageCard({ data }) {
  if (!data) return null;

  const isEmergency = data.urgencyLevel === 'Emergency';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`rounded-xl overflow-hidden border-2 ${
        isEmergency
          ? 'border-red-500 bg-red-50 dark:bg-red-950/30'
          : data.urgencyLevel === 'Urgent'
          ? 'border-orange-400 bg-orange-50 dark:bg-orange-950/20'
          : 'border-emerald-400 bg-white dark:bg-gray-800'
      }`}
    >
      {/* Header */}
      <div className={`px-5 py-3 flex items-center justify-between ${
        isEmergency ? 'bg-red-500 text-white' : 'bg-navy-900 text-white'
      }`}>
        <span className="font-semibold flex items-center gap-2">
          🩺 Triage Assessment
        </span>
        <UrgencyBadge level={data.urgencyLevel} size="sm" />
      </div>

      <div className="p-5 space-y-4">
        {/* Possible Condition */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
            Possible Condition
          </h4>
          <p className="text-gray-900 dark:text-gray-100 font-medium">
            {data.possibleCondition}
          </p>
        </div>

        {/* Recommended Action */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
            Recommended Action
          </h4>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {data.recommendedAction}
          </p>
        </div>

        {/* Guideline Excerpt */}
        {data.guidelineExcerpt && (
          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3 border-l-4 border-blue-400">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-1">
              Supporting Guideline
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300 italic">
              "{data.guidelineExcerpt}"
            </p>
            {data.sourceReferences?.length > 0 && (
              <p className="text-xs text-gray-500 mt-1">
                — {data.sourceReferences.join(', ')}
              </p>
            )}
          </div>
        )}

        {/* Red Flags */}
        {data.redFlagTriggered && data.redFlags?.length > 0 && (
          <div className="bg-red-50 dark:bg-red-950/30 rounded-lg p-3 border-l-4 border-red-500">
            <h4 className="text-xs font-bold uppercase text-red-600 mb-1">
              Red Flags Detected
            </h4>
            <ul className="text-sm text-red-700 dark:text-red-400 space-y-1">
              {data.redFlags.map((flag, i) => (
                <li key={i}>• {flag.value}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Disclaimer */}
        <div className="pt-3 border-t border-gray-200 dark:border-gray-600">
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-start gap-1">
            <span>⚕️</span>
            <span>{data.disclaimer}</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
