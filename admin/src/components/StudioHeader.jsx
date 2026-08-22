import React from 'react';
import { 
  LockSimple, 
  Gear, 
  DownloadSimple, 
  UploadSimple, 
  ArrowSquareOut,
  Sparkle,
  Images,
  ShieldCheck
} from '@phosphor-icons/react';

export default function StudioHeader({ 
  photoCount, 
  onOpenSettings, 
  onLogout,
  onExportBackup,
  onImportBackup 
}) {
  return (
    <header className="sticky top-0 z-40 bg-[#ede9df]/95 backdrop-blur-md border-b-2 border-black/15 px-4 sm:px-8 py-3.5">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
        
        {/* Brand & Status */}
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-2 group">
            <img src="/aanuore-logo.png" alt="Aanuore" className="h-7 w-auto object-contain" />
            <span className="font-bold text-xl text-ink tracking-tight font-display-title">
              aanuore
            </span>
          </a>

          {/* Yellow Tilted Badge */}
          <div className="hidden sm:inline-flex items-center gap-1.5 bg-accent-yellow border-2 border-black px-2.5 py-0.5 rounded-full text-[9.5px] font-black uppercase tracking-wider text-ink -rotate-2 shadow-2xs">
            <Sparkle size={11} weight="fill" className="text-accent-purple" />
            <span>STUDIO MANAGER</span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-mono font-bold text-ink-muted pl-2 border-l border-black/20">
            <span className="flex items-center gap-1.5 text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>LIVE</span>
            </span>
            <span>/</span>
            <span>{photoCount} WORKS</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Backup / Export */}
          <button
            onClick={onExportBackup}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-accent-yellow border-2 border-black text-xs font-bold text-ink transition-all cursor-pointer shadow-2xs active:scale-95"
            title="Download JSON portfolio backup"
          >
            <DownloadSimple size={14} weight="bold" />
            <span>Backup</span>
          </button>

          {/* Cloud & Passcode Settings */}
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-accent-yellow border-2 border-black text-xs font-bold text-ink transition-all cursor-pointer shadow-2xs active:scale-95"
          >
            <Gear size={15} weight="bold" />
            <span className="hidden xs:inline">Settings</span>
          </button>

          {/* View Live Website Link */}
          <a
            href="https://aanuore.works"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-accent-yellow border-2 border-black text-xs font-bold text-ink transition-all cursor-pointer shadow-2xs active:scale-95"
          >
            <span>Live Site</span>
            <ArrowSquareOut size={13} weight="bold" />
          </a>

          {/* Lock Studio / Logout */}
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-black hover:bg-accent-purple text-white border-2 border-black text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
          >
            <LockSimple size={14} weight="bold" />
            <span>Lock</span>
          </button>

        </div>

      </div>
    </header>
  );
}
