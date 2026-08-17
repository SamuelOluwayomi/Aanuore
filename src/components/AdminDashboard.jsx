import React, { useState, useEffect, useRef } from 'react';
import { portfolioStore } from '../services/portfolioStore';
import { uploadImage } from '../services/imageUploader';
import {
  Lock,
  LockOpen,
  UploadSimple,
  Trash,
  ArrowLeft,
  ArrowRight,
  ArrowsOut,
  X,
  CheckCircle,
  Gear,
  Images,
  ArrowSquareOut,
  Sparkle,
  Eye,
  Key
} from '@phosphor-icons/react';

export default function AdminDashboard({ onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [images, setImages] = useState(portfolioStore.getImages());
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewModalImage, setPreviewModalImage] = useState(null);
  const [activeTab, setActiveTab] = useState('gallery'); // 'gallery' | 'settings'

  // Settings State
  const [newPin, setNewPin] = useState('');
  const [pinChangeSuccess, setPinChangeSuccess] = useState(false);
  const [cloudinaryCloud, setCloudinaryCloud] = useState(localStorage.getItem('aanuore_cloudinary_cloud') || '');
  const [cloudinaryPreset, setCloudinaryPreset] = useState(localStorage.getItem('aanuore_cloudinary_preset') || '');
  const [cloudSaved, setCloudSaved] = useState(false);

  const fileInputRef = useRef(null);

  // Subscribe to store updates
  useEffect(() => {
    const unsubscribe = portfolioStore.subscribe((updatedImages) => {
      setImages(updatedImages);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (portfolioStore.verifyPin(pinInput)) {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
      setPinInput('');
    }
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const imageUrl = await uploadImage(file, {
          cloudName: cloudinaryCloud,
          uploadPreset: cloudinaryPreset
        });
        portfolioStore.addImage(imageUrl, file.name.replace(/\.[^/.]+$/, ''));
        setUploadProgress(Math.round(((i + 1) / files.length) * 100));
      } catch (err) {
        console.error('Failed to upload image:', file.name, err);
      }
    }

    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to remove this photograph from the live portfolio?')) {
      portfolioStore.deleteImage(id);
    }
  };

  const handleMove = (index, direction, e) => {
    e.stopPropagation();
    portfolioStore.moveImage(index, index + direction);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset portfolio back to the original 19 curated showcase images?')) {
      portfolioStore.resetToDefaults();
    }
  };

  const handleSavePin = (e) => {
    e.preventDefault();
    if (portfolioStore.setPin(newPin)) {
      setPinChangeSuccess(true);
      setNewPin('');
      setTimeout(() => setPinChangeSuccess(false), 3000);
    }
  };

  const handleSaveCloudinary = (e) => {
    e.preventDefault();
    localStorage.setItem('aanuore_cloudinary_cloud', cloudinaryCloud.trim());
    localStorage.setItem('aanuore_cloudinary_preset', cloudinaryPreset.trim());
    setCloudSaved(true);
    setTimeout(() => setCloudSaved(false), 3000);
  };

  // ── PIN AUTHENTICATION LOCKSCREEN ──
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-[#ede9df] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border-2 border-black rounded-3xl p-6 sm:p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black text-white hover:bg-accent-yellow hover:text-black flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Exit Studio"
          >
            <X size={18} weight="bold" />
          </button>

          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
              <Lock size={26} weight="fill" className="text-accent-yellow" />
            </div>
            <h2 className="font-display-title font-bold text-2xl text-ink">
              Aanuore Studio Admin
            </h2>
            <p className="text-xs text-ink-muted mt-1">
              Enter master passcode to manage portfolio photographs &amp; content
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-ink-muted mb-1.5">
                // ENTER PASSCODE //
              </label>
              <input
                type="password"
                maxLength={8}
                required
                autoFocus
                placeholder="••••"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className={`w-full bg-[#faf8f2] border-2 rounded-2xl px-4 py-3.5 text-center font-mono text-xl font-bold tracking-widest text-ink focus:outline-none transition-all ${pinError ? 'border-red-500 animate-shake' : 'focus:border-accent-purple'
                  }`}
              />
              {pinError && (
                <span className="text-[11px] font-bold text-red-600 mt-1.5 block text-center">
                  Incorrect passcode. (Default: 2026)
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-black hover:bg-accent-purple text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border-2 border-black"
            >
              <LockOpen size={16} weight="bold" />
              <span>Unlock Admin Studio</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-black/10 text-center">
            <button
              onClick={onClose}
              className="text-xs font-bold text-ink-muted hover:text-black transition-colors cursor-pointer"
            >
              ← Return to live website
            </button>
          </div>

        </div>
      </div>
    );
  }

  // ── AUTHENTICATED ADMIN STUDIO ──
  return (
    <div className="fixed inset-0 z-50 bg-[#ede9df] overflow-y-auto flex flex-col">

      {/* ── TOP STUDIO NAVBAR ── */}
      <header className="sticky top-0 z-40 bg-[#111114] text-white px-5 sm:px-8 py-4 border-b-2 border-black flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <img src="/aanuore-logo.png" alt="Aanuore" className="h-7 w-auto object-contain brightness-0 invert" />
          <div>
            <div className="font-display-title font-bold text-sm sm:text-base leading-tight">
              Aanuore Studio Manager
            </div>
            <span className="text-[9.5px] font-mono text-accent-yellow font-bold uppercase tracking-wider block">
              ● LIVE SYNC ACTIVE ({images.length} PHOTOS)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Navigation Tabs */}
          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${activeTab === 'gallery' ? 'bg-white text-black' : 'text-white/70 hover:text-white'
              }`}
          >
            <Images size={15} weight="bold" />
            <span className="hidden xs:inline">Portfolio</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${activeTab === 'settings' ? 'bg-white text-black' : 'text-white/70 hover:text-white'
              }`}
          >
            <Gear size={15} weight="bold" />
            <span className="hidden xs:inline">Settings</span>
          </button>

          <button
            onClick={onClose}
            className="px-3.5 sm:px-4 py-2 bg-accent-purple hover:bg-accent-yellow hover:text-black text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ml-2"
          >
            <span>Exit Studio</span>
            <ArrowSquareOut size={15} weight="bold" />
          </button>
        </div>
      </header>

      {/* ── MAIN CONTENT AREA ── */}
      <main className="max-w-[1360px] mx-auto w-full p-4 sm:p-8 flex-1">

        {activeTab === 'gallery' ? (
          <div>

            {/* Header & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-black/15">
              <div>
                <h1 className="font-condensed text-3xl sm:text-5xl uppercase tracking-tight text-ink">
                  PHOTOGRAPHY PORTFOLIO
                </h1>
                <p className="text-xs sm:text-sm text-ink-muted">
                  Upload new photos, reorder images, or remove outdated sessions. Changes appear on the live site instantly.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={handleResetDefaults}
                  className="px-4 py-2.5 bg-white hover:bg-black hover:text-white text-ink border-2 border-black rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
                >
                  Reset Defaults
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="px-5 py-2.5 bg-black hover:bg-accent-purple text-white border-2 border-black rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-md flex items-center gap-2"
                >
                  <UploadSimple size={16} weight="bold" />
                  <span>{isUploading ? `Uploading ${uploadProgress}%` : '+ Add New Photos'}</span>
                </button>
              </div>
            </div>

            {/* Hidden Multi-file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              multiple
              accept="image/*"
              className="hidden"
            />

            {/* Upload Dropzone Banner */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-black/30 hover:border-accent-purple rounded-3xl p-6 sm:p-10 mb-8 bg-white/70 hover:bg-white text-center cursor-pointer transition-all group hover-glow-subtle"
            >
              <div className="w-12 h-12 rounded-2xl bg-accent-purple/10 border border-accent-purple/20 text-accent-purple flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <UploadSimple size={24} weight="bold" />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-ink mb-1">
                Drop new photos here or click to browse
              </h3>
              <p className="text-xs text-ink-muted">
                Supports JPG, PNG, WEBP. You can select multiple camera files at once.
              </p>
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {images.map((item, idx) => (
                <div
                  key={item.id}
                  className="bg-white border-2 border-black rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group relative hover-glow"
                >
                  {/* Photo Container */}
                  <div
                    onClick={() => setPreviewModalImage(item)}
                    className="relative aspect-3/4 bg-neutral-950 cursor-pointer overflow-hidden"
                  >
                    <img
                      src={item.image}
                      alt={item.title || `Photograph ${item.serial}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Serial Badge */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className="bg-black text-white text-[10px] font-mono font-black px-2 py-0.5 rounded-md border border-white/20">
                        NO. {item.serial}
                      </span>
                    </div>

                    {/* Expand Icon Overlay */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-md">
                        <ArrowsOut size={16} weight="bold" />
                      </div>
                    </div>
                  </div>

                  {/* Card Controls Bar */}
                  <div className="p-2.5 bg-[#faf8f2] border-t-2 border-black flex items-center justify-between gap-1 text-xs">

                    {/* Move Left */}
                    <button
                      disabled={idx === 0}
                      onClick={(e) => handleMove(idx, -1, e)}
                      className={`w-7 h-7 rounded-lg border border-black/20 flex items-center justify-center transition-colors ${idx === 0 ? 'opacity-30 cursor-not-allowed bg-transparent' : 'bg-white hover:bg-accent-yellow cursor-pointer'
                        }`}
                      title="Move earlier"
                    >
                      <ArrowLeft size={12} weight="bold" />
                    </button>

                    <span className="font-mono text-[10px] font-bold text-ink-muted">
                      {idx + 1} of {images.length}
                    </span>

                    {/* Move Right */}
                    <button
                      disabled={idx === images.length - 1}
                      onClick={(e) => handleMove(idx, 1, e)}
                      className={`w-7 h-7 rounded-lg border border-black/20 flex items-center justify-center transition-colors ${idx === images.length - 1 ? 'opacity-30 cursor-not-allowed bg-transparent' : 'bg-white hover:bg-accent-yellow cursor-pointer'
                        }`}
                      title="Move later"
                    >
                      <ArrowRight size={12} weight="bold" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={(e) => handleDelete(item.id, e)}
                      className="w-7 h-7 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-200 flex items-center justify-center transition-colors cursor-pointer ml-1"
                      title="Delete photograph"
                    >
                      <Trash size={13} weight="bold" />
                    </button>

                  </div>

                </div>
              ))}
            </div>

          </div>
        ) : (
          /* ── SETTINGS TAB ── */
          <div className="max-w-2xl mx-auto space-y-6">

            {/* Change Passcode Card */}
            <div className="bg-white border-2 border-black rounded-3xl p-6 sm:p-8 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center">
                  <Key size={20} weight="bold" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-ink">Change Master Passcode</h3>
                  <p className="text-xs text-ink-muted">Update the PIN required to access this studio dashboard.</p>
                </div>
              </div>

              <form onSubmit={handleSavePin} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-ink mb-1">
                    New Passcode (4-8 characters)
                  </label>
                  <input
                    type="password"
                    required
                    minLength={4}
                    maxLength={8}
                    placeholder="Enter new PIN"
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    className="w-full bg-[#faf8f2] border-2 border-black rounded-xl px-4 py-2.5 text-xs text-ink focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-black hover:bg-accent-yellow hover:text-black text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer border-2 border-black"
                >
                  Save New Passcode
                </button>

                {pinChangeSuccess && (
                  <div className="p-3 bg-[#25D366]/10 border border-[#25D366] rounded-xl flex items-center gap-2 text-xs font-bold text-[#128C7E]">
                    <CheckCircle size={16} weight="fill" />
                    <span>Passcode updated successfully!</span>
                  </div>
                )}
              </form>
            </div>

            {/* Cloudinary Cloud Storage Integration */}
            <div className="bg-white border-2 border-black rounded-3xl p-6 sm:p-8 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent-purple text-white flex items-center justify-center">
                  <Sparkle size={20} weight="fill" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-ink">Cloud Image Storage (Cloudinary)</h3>
                  <p className="text-xs text-ink-muted">Optional: Connect free Cloudinary bucket for automatic global CDN image hosting.</p>
                </div>
              </div>

              <form onSubmit={handleSaveCloudinary} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-ink mb-1">
                    Cloud Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. aanuore-cloud"
                    value={cloudinaryCloud}
                    onChange={(e) => setCloudinaryCloud(e.target.value)}
                    className="w-full bg-[#faf8f2] border-2 border-black rounded-xl px-4 py-2.5 text-xs text-ink focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-ink mb-1">
                    Unsigned Upload Preset
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. aanuore_uploads"
                    value={cloudinaryPreset}
                    onChange={(e) => setCloudinaryPreset(e.target.value)}
                    className="w-full bg-[#faf8f2] border-2 border-black rounded-xl px-4 py-2.5 text-xs text-ink focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-black hover:bg-accent-purple text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer border-2 border-black"
                >
                  Save Cloud Configuration
                </button>

                {cloudSaved && (
                  <div className="p-3 bg-[#25D366]/10 border border-[#25D366] rounded-xl flex items-center gap-2 text-xs font-bold text-[#128C7E]">
                    <CheckCircle size={16} weight="fill" />
                    <span>Cloud credentials saved!</span>
                  </div>
                )}
              </form>
            </div>

          </div>
        )}

      </main>

      {/* ── PHOTO PREVIEW MODAL ── */}
      {previewModalImage && (
        <div
          onClick={() => setPreviewModalImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full max-h-[90vh] bg-white border-2 border-black rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="p-4 border-b-2 border-black flex items-center justify-between bg-canvas">
              <span className="font-mono text-xs font-bold">
                NO. {previewModalImage.serial} • {previewModalImage.title || 'Photograph'}
              </span>
              <button
                onClick={() => setPreviewModalImage(null)}
                className="w-8 h-8 rounded-full bg-black text-white hover:bg-accent-purple flex items-center justify-center cursor-pointer"
              >
                <X size={16} weight="bold" />
              </button>
            </div>
            <div className="bg-neutral-950 p-4 flex items-center justify-center">
              <img
                src={previewModalImage.image}
                alt=""
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
