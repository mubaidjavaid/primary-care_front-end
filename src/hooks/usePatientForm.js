import { useState, useCallback } from 'react';

const initialState = {
  age: '',
  gender: '',
  symptoms: [],
  vitals: {
    bloodPressure: '',
    temperature: '',
    heartRate: '',
    respiratoryRate: '',
    oxygenSaturation: '',
  },
};

export function usePatientForm() {
  const [form, setForm] = useState(initialState);
  const [symptomInput, setSymptomInput] = useState('');

  const updateField = useCallback((field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const updateVital = useCallback((field, value) => {
    setForm(prev => ({
      ...prev,
      vitals: { ...prev.vitals, [field]: value },
    }));
  }, []);

  const addSymptom = useCallback((symptom) => {
    const trimmed = symptom.trim();
    if (trimmed && !form.symptoms.includes(trimmed)) {
      setForm(prev => ({ ...prev, symptoms: [...prev.symptoms, trimmed] }));
    }
    setSymptomInput('');
  }, [form.symptoms]);

  const removeSymptom = useCallback((index) => {
    setForm(prev => ({
      ...prev,
      symptoms: prev.symptoms.filter((_, i) => i !== index),
    }));
  }, []);

  const resetForm = useCallback(() => {
    setForm(initialState);
    setSymptomInput('');
  }, []);

  const getSubmitData = useCallback(() => {
    return {
      age: form.age ? parseInt(form.age, 10) : undefined,
      gender: form.gender || undefined,
      symptoms: form.symptoms,
      vitals: {
        bloodPressure: form.vitals.bloodPressure || undefined,
        temperature: form.vitals.temperature ? parseFloat(form.vitals.temperature) : undefined,
        heartRate: form.vitals.heartRate ? parseInt(form.vitals.heartRate, 10) : undefined,
        respiratoryRate: form.vitals.respiratoryRate ? parseInt(form.vitals.respiratoryRate, 10) : undefined,
        oxygenSaturation: form.vitals.oxygenSaturation ? parseInt(form.vitals.oxygenSaturation, 10) : undefined,
      },
    };
  }, [form]);

  const isValid = form.symptoms.length > 0;

  return {
    form, symptomInput, setSymptomInput,
    updateField, updateVital, addSymptom, removeSymptom,
    resetForm, getSubmitData, isValid,
  };
}
