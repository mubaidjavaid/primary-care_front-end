import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiPlus, FiChevronDown, FiChevronUp, FiMic } from 'react-icons/fi';
import VitalSignsInput from '../ui/VitalSignsInput';
import { usePatientForm } from '../../hooks/usePatientForm';
import { useVoiceInput } from '../../hooks/useVoiceInput';

export default function PatientForm({ onSubmit, isLoading }) {
  const {
    form, symptomInput, setSymptomInput,
    updateField, updateVital, addSymptom, removeSymptom,
    resetForm, getSubmitData, isValid,
  } = usePatientForm();

  const [showVitals, setShowVitals] = useState(false);
  const { isListening, startListening, stopListening } = useVoiceInput((text) => {
    addSymptom(text);
  });

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && symptomInput.trim()) {
      e.preventDefault();
      addSymptom(symptomInput);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid || isLoading) return;
    onSubmit(getSubmitData());
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-5">
      <h3 className="text-lg font-bold text-navy-900 dark:text-white">Patient Information</h3>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Age</label>
          <input
            type="number"
            min="0"
            max="120"
            value={form.age}
            onChange={(e) => updateField('age', e.target.value)}
            placeholder="Years"
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Gender</label>
          <select
            value={form.gender}
            onChange={(e) => updateField('gender', e.target.value)}
            className="input-field"
          >
            <option value="">Select...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Symptoms */}
      <div>
        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
          Symptoms *
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={symptomInput}
              onChange={(e) => setSymptomInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type symptom and press Enter"
              className="input-field pr-10"
            />
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full ${
                isListening ? 'bg-red-100 text-red-500 animate-pulse' : 'text-gray-400 hover:text-navy-600'
              }`}
            >
              <FiMic className="w-4 h-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => addSymptom(symptomInput)}
            disabled={!symptomInput.trim()}
            className="btn-primary !px-3"
          >
            <FiPlus className="w-5 h-5" />
          </button>
        </div>

        <AnimatePresence>
          {form.symptoms.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-wrap gap-2 mt-2 overflow-hidden"
            >
              {form.symptoms.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="inline-flex items-center gap-1 bg-navy-100 dark:bg-navy-900/30 text-navy-800 dark:text-navy-200 px-3 py-1 rounded-full text-sm"
                >
                  {s}
                  <button type="button" onClick={() => removeSymptom(i)} className="hover:text-red-500">
                    <FiX className="w-3.5 h-3.5" />
                  </button>
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Vitals accordion */}
      <div>
        <button
          type="button"
          onClick={() => setShowVitals(!showVitals)}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-navy-900 dark:hover:text-white transition-colors w-full"
        >
          {showVitals ? <FiChevronUp className="w-4 h-4" /> : <FiChevronDown className="w-4 h-4" />}
          Vital Signs (optional)
        </button>
        <AnimatePresence>
          {showVitals && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-3">
                <VitalSignsInput vitals={form.vitals} onChange={updateVital} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={!isValid || isLoading} className="btn-primary flex-1">
          {isLoading ? 'Analyzing...' : 'Run Triage'}
        </button>
        <button type="button" onClick={resetForm} className="px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
          Reset
        </button>
      </div>
    </form>
  );
}
