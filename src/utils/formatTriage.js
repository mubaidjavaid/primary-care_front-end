export function getUrgencyConfig(level) {
  const configs = {
    Emergency: { bg: 'bg-red-500', text: 'text-white', border: 'border-red-500', icon: '🚨', label: 'EMERGENCY' },
    Urgent: { bg: 'bg-orange-500', text: 'text-white', border: 'border-orange-500', icon: '⚠️', label: 'URGENT' },
    Routine: { bg: 'bg-emerald-500', text: 'text-white', border: 'border-emerald-500', icon: '✅', label: 'ROUTINE' },
  };
  return configs[level] || configs.Routine;
}

export function formatVitals(vitals) {
  if (!vitals) return 'Not provided';
  const parts = [];
  if (vitals.bloodPressure) parts.push(`BP: ${vitals.bloodPressure}`);
  if (vitals.temperature) parts.push(`Temp: ${vitals.temperature}°C`);
  if (vitals.heartRate) parts.push(`HR: ${vitals.heartRate} bpm`);
  if (vitals.respiratoryRate) parts.push(`RR: ${vitals.respiratoryRate}/min`);
  if (vitals.oxygenSaturation) parts.push(`SpO2: ${vitals.oxygenSaturation}%`);
  return parts.length > 0 ? parts.join(' | ') : 'Not provided';
}

export function formatTimestamp(date) {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
