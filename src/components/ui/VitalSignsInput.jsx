import { FiHeart, FiThermometer, FiActivity, FiWind } from 'react-icons/fi';

const vitalFields = [
  { key: 'bloodPressure', label: 'Blood Pressure', placeholder: '120/80', unit: 'mmHg', icon: FiActivity },
  { key: 'temperature', label: 'Temperature', placeholder: '37.0', unit: '°C', icon: FiThermometer },
  { key: 'heartRate', label: 'Heart Rate', placeholder: '72', unit: 'bpm', icon: FiHeart },
  { key: 'respiratoryRate', label: 'Respiratory Rate', placeholder: '16', unit: '/min', icon: FiWind },
  { key: 'oxygenSaturation', label: 'SpO2', placeholder: '98', unit: '%', icon: FiActivity },
];

export default function VitalSignsInput({ vitals, onChange }) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
        Vital Signs
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {vitalFields.map(({ key, label, placeholder, unit, icon: Icon }) => (
          <div key={key} className="relative">
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              {label}
            </label>
            <div className="relative flex items-center">
              <Icon className="absolute left-3 w-4 h-4 text-gray-400" />
              <input
                type={key === 'bloodPressure' ? 'text' : 'number'}
                value={vitals[key] || ''}
                onChange={(e) => onChange(key, e.target.value)}
                placeholder={placeholder}
                className="input-field pl-9 pr-12"
                step={key === 'temperature' ? '0.1' : '1'}
              />
              <span className="absolute right-3 text-xs text-gray-400">{unit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
