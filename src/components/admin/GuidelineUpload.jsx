import { useState, useRef } from 'react';
import { FiUpload, FiFile, FiX } from 'react-icons/fi';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function GuidelineUpload({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [meta, setMeta] = useState({ title: '', source: '', category: 'general', version: '2024', language: 'en' });
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.error('Please select a file');
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      Object.entries(meta).forEach(([k, v]) => formData.append(k, v));

      const { data } = await api.post('/guidelines/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success(`Uploaded and ingested ${data.ingestion?.chunksCreated || 0} chunks`);
      setFile(null);
      setMeta({ title: '', source: '', category: 'general', version: '2024', language: 'en' });
      onUploaded?.();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="card space-y-4">
      <h3 className="text-lg font-bold text-navy-900 dark:text-white">Upload Guideline</h3>

      {/* Drop zone */}
      <div
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-navy-400 transition-colors"
      >
        {file ? (
          <div className="flex items-center justify-center gap-3">
            <FiFile className="w-8 h-8 text-navy-600" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{file.name}</p>
              <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
            <button type="button" onClick={(e) => { e.stopPropagation(); setFile(null); }} className="p-1 hover:text-red-500">
              <FiX className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <FiUpload className="w-10 h-10 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">Click to select PDF or DOCX file</p>
          </>
        )}
        <input
          ref={fileRef}
          type="file"
          accept=".pdf,.docx"
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Title</label>
          <input value={meta.title} onChange={(e) => setMeta({ ...meta, title: e.target.value })} placeholder="Guideline title" className="input-field" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Source</label>
          <input value={meta.source} onChange={(e) => setMeta({ ...meta, source: e.target.value })} placeholder="e.g. MoH Pakistan" className="input-field" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
          <select value={meta.category} onChange={(e) => setMeta({ ...meta, category: e.target.value })} className="input-field">
            <option value="general">General</option>
            <option value="maternal">Maternal</option>
            <option value="child">Child</option>
            <option value="emergency">Emergency</option>
            <option value="chronic">Chronic</option>
            <option value="infectious">Infectious</option>
            <option value="nutrition">Nutrition</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Version</label>
          <input value={meta.version} onChange={(e) => setMeta({ ...meta, version: e.target.value })} placeholder="2024" className="input-field" />
        </div>
      </div>

      <button type="submit" disabled={!file || uploading} className="btn-primary w-full">
        {uploading ? 'Uploading & Ingesting...' : 'Upload & Ingest'}
      </button>
    </form>
  );
}
