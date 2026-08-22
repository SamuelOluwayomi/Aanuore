import React, { useState } from 'react';
import {
  X,
  Sparkle,
  CheckCircle,
  UploadSimple,
  ShieldCheck,
  DownloadSimple
} from '@phosphor-icons/react';
import { adminStore } from '../services/adminStore';

export default function SettingsModal({ onClose }) {
  // Cloudinary State
  const [cloudName, setCloudName] = useState(localStorage.getItem('aanuore_cloudinary_cloud') || '');
  const [preset, setPreset] = useState(localStorage.getItem('aanuore_cloudinary_preset') || '');
  const [cloudSuccess, setCloudSuccess] = useState(false);

  // Backup Import
  const [importSuccess, setImportSuccess] = useState(false);

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
        className="relative max-w-lg w-full bg-white border-2 border-black rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 animate-in zoom-in-95 duration-200"
      >

        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-black/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-accent-yellow border-2 border-black flex items-center justify-center text-ink shadow-2xs">
              <ShieldCheck size={20} weight="bold" />
            </div>
            <div>
              <h3 className="font-condensed text-2xl sm:text-3xl uppercase tracking-tight text-ink">Studio Settings</h3>
              <p className="text-[11px] text-ink-muted">Configure cloud image CDN and portfolio backups.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black hover:bg-accent-purple text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X size={16} weight="bold" />
          </button>
        </div>

        {/* 1. Cloudinary CDN Storage */}
        <form onSubmit={handleCloudSubmit} className="space-y-3 bg-[#faf8f2] p-5 rounded-2xl border-2 border-black">
          <div className="flex items-center gap-2 mb-1">
            <Sparkle size={16} weight="fill" className="text-accent-purple" />
            <h4 className="font-bold text-xs uppercase tracking-wider text-ink">Cloudinary CDN Storage</h4>
          </div>

          <div className="space-y-2">
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-ink-muted mb-1">
                Cloud Name
              </label>
              <input
                type="text"
                placeholder="e.g. aanuore-cloud"
                value={cloudName}
                onChange={(e) => setCloudName(e.target.value)}
                className="w-full bg-white border-2 border-black rounded-xl px-3.5 py-2.5 text-xs text-ink focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-ink-muted mb-1">
                Unsigned Upload Preset
              </label>
              <input
                type="text"
                placeholder="e.g. aanuore_uploads"
                value={preset}
                onChange={(e) => setPreset(e.target.value)}
                className="w-full bg-white border-2 border-black rounded-xl px-3.5 py-2.5 text-xs text-ink focus:outline-none"
              />
            </div>
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

        {/* 2. Backup & Restore */}
        <div className="bg-[#faf8f2] p-5 rounded-2xl border-2 border-black space-y-3">
          <h4 className="font-bold text-xs uppercase tracking-wider text-ink">Portfolio Catalog Backup</h4>
          <p className="text-[11px] text-ink-muted">Download a snapshot of the portfolio or restore from JSON.</p>

          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => adminStore.exportBackup()}
              className="flex-1 py-2.5 bg-white hover:bg-accent-yellow text-ink border-2 border-black rounded-xl text-xs font-bold transition-all cursor-pointer text-center active:scale-95 shadow-2xs flex items-center justify-center gap-1.5"
            >
              <DownloadSimple size={14} weight="bold" />
              <span>Export JSON</span>
            </button>

            <label className="flex-1 py-2.5 bg-white hover:bg-accent-yellow text-ink border-2 border-black rounded-xl text-xs font-bold transition-all cursor-pointer text-center active:scale-95 shadow-2xs flex items-center justify-center gap-1.5">
              <UploadSimple size={14} weight="bold" />
              <span>Import JSON</span>
              <input type="file" accept=".json" onChange={handleFileImport} className="hidden" />
            </label>
          </div>

          {importSuccess && (
            <div className="text-[11px] text-emerald-700 flex items-center gap-1 font-bold">
              <CheckCircle size={14} weight="fill" />
              <span>Portfolio backup restored successfully!</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
