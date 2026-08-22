import React, { useState } from 'react';
import { 
  X, 
  Key, 
  Sparkle, 
  CheckCircle, 
  UploadSimple, 
  ShieldCheck,
  CloudCheck
} from '@phosphor-icons/react';
import { setMasterPassword } from '../services/security';
import { adminStore } from '../services/adminStore';

export default function SettingsModal({ onClose }) {
  // Password State
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwSuccess, setPwSuccess] = useState(false);
  const [pwError, setPwError] = useState('');

  // Cloudinary State
  const [cloudName, setCloudName] = useState(localStorage.getItem('aanuore_cloudinary_cloud') || '');
  const [preset, setPreset] = useState(localStorage.getItem('aanuore_cloudinary_preset') || '');
  const [cloudSuccess, setCloudSuccess] = useState(false);

  // Backup Import
  const [importSuccess, setImportSuccess] = useState(false);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPwError('');
    if (newPassword.length < 6) {
      setPwError('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwError('Passwords do not match.');
      return;
    }

    try {
      await setMasterPassword(newPassword);
      setPwSuccess(true);
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPwSuccess(false), 3000);
    } catch (err) {
      setPwError(err.message);
    }
  };

  const handleCloudSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('aanuore_cloudinary_cloud', cloudName.trim());
    localStorage.setItem('aanuore_cloudinary_preset', preset.trim());
    setCloudSuccess(true);
    setTimeout(() => setCloudSuccess(false), 3000);
  };

  const handleFileImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        if (adminStore.importBackup(json)) {
          setImportSuccess(true);
          setTimeout(() => setImportSuccess(false), 3000);
        } else {
          alert('Invalid backup JSON format.');
        }
      } catch {
        alert('Could not parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-xl w-full bg-white border-2 border-black rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 animate-in zoom-in-95 duration-200"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-black/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-accent-yellow border-2 border-black flex items-center justify-center text-ink shadow-2xs">
              <ShieldCheck size={20} weight="bold" />
            </div>
            <div>
              <h3 className="font-condensed text-2xl sm:text-3xl uppercase tracking-tight text-ink">Studio Settings &amp; Security</h3>
              <p className="text-[11px] text-ink-muted">Manage master password, cloud CDN, and backup restoration.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black hover:bg-accent-purple text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X size={16} weight="bold" />
          </button>
        </div>

        {/* 1. Change Master Password */}
        <form onSubmit={handlePasswordSubmit} className="space-y-3 bg-[#faf8f2] p-5 rounded-2xl border-2 border-black">
          <div className="flex items-center gap-2 mb-1">
            <Key size={16} weight="bold" className="text-accent-purple" />
            <h4 className="font-bold text-xs uppercase tracking-wider text-ink">Update Master Password</h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="password"
              required
              minLength={6}
              placeholder="New password (min 6 chars)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-white border-2 border-black rounded-xl px-3.5 py-2.5 text-xs text-ink focus:outline-none focus:border-accent-purple"
            />
            <input
              type="password"
              required
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-white border-2 border-black rounded-xl px-3.5 py-2.5 text-xs text-ink focus:outline-none focus:border-accent-purple"
            />
          </div>

          {pwError && <span className="text-[11px] text-red-600 font-bold block">{pwError}</span>}
          {pwSuccess && (
            <div className="text-[11px] text-emerald-700 flex items-center gap-1 font-bold">
              <CheckCircle size={14} weight="fill" />
              <span>Master password updated with SHA-256 encryption!</span>
            </div>
          )}

          <button
            type="submit"
            className="px-4 py-2 bg-black hover:bg-accent-purple text-white rounded-xl text-xs font-bold transition-all cursor-pointer border-2 border-black active:scale-95 shadow-2xs"
          >
            Save New Password
          </button>
        </form>

        {/* 2. Cloudinary CDN Storage */}
        <form onSubmit={handleCloudSubmit} className="space-y-3 bg-[#faf8f2] p-5 rounded-2xl border-2 border-black">
          <div className="flex items-center gap-2 mb-1">
            <Sparkle size={16} weight="fill" className="text-accent-purple" />
            <h4 className="font-bold text-xs uppercase tracking-wider text-ink">Cloudinary Image CDN</h4>
          </div>

          <div className="space-y-2">
            <input
              type="text"
              placeholder="Cloud Name (e.g. aanuore-cloud)"
              value={cloudName}
              onChange={(e) => setCloudName(e.target.value)}
              className="w-full bg-white border-2 border-black rounded-xl px-3.5 py-2.5 text-xs text-ink focus:outline-none focus:border-accent-purple"
            />
            <input
              type="text"
              placeholder="Unsigned Upload Preset (e.g. aanuore_uploads)"
              value={preset}
              onChange={(e) => setPreset(e.target.value)}
              className="w-full bg-white border-2 border-black rounded-xl px-3.5 py-2.5 text-xs text-ink focus:outline-none focus:border-accent-purple"
            />
          </div>

          {cloudSuccess && (
            <div className="text-[11px] text-emerald-700 flex items-center gap-1 font-bold">
              <CheckCircle size={14} weight="fill" />
              <span>Cloudinary configuration saved!</span>
            </div>
          )}

          <button
            type="submit"
            className="px-4 py-2 bg-black hover:bg-accent-purple text-white rounded-xl text-xs font-bold transition-all cursor-pointer border-2 border-black active:scale-95 shadow-2xs"
          >
            Save Cloud Config
          </button>
        </form>

        {/* 3. Restore from Backup */}
        <div className="bg-[#faf8f2] p-5 rounded-2xl border-2 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-ink">Restore Portfolio Backup</h4>
            <p className="text-[11px] text-ink-muted">Import a previously exported JSON catalog backup.</p>
          </div>
          <label className="px-4 py-2 bg-white hover:bg-accent-yellow text-ink border-2 border-black rounded-xl text-xs font-bold transition-all cursor-pointer text-center active:scale-95 shadow-2xs">
            <span>Import JSON</span>
            <input type="file" accept=".json" onChange={handleFileImport} className="hidden" />
          </label>
        </div>

      </div>
    </div>
  );
}
