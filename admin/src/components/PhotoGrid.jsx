import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Trash, 
  ArrowsOut, 
  X, 
  Sparkle, 
  EyeSlash, 
  Eye, 
  Archive, 
  CloudCheck,
  CheckCircle,
  Cloud
} from '@phosphor-icons/react';
import { adminStore } from '../services/adminStore';

export default function PhotoGrid({ images }) {
  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'hidden'
  const [previewImage, setPreviewImage] = useState(null);
  const [actionConfirmItem, setActionConfirmItem] = useState(null);

  const activeImages = images.filter((img) => img.enabled !== false);
  const hiddenImages = images.filter((img) => img.enabled === false);

  const handleMove = (index, direction) => {
    adminStore.moveImage(index, index + direction);
  };

  const handleConfirmAction = (item) => {
    if (item.source === 'github') {
      // Hide GitHub photo
      adminStore.toggleImageStatus(item.id, false);
    } else {
      // Delete Cloudinary photo
      adminStore.deleteImage(item.id);
    }
    setActionConfirmItem(null);
  };

  const handleRestore = (id) => {
    adminStore.toggleImageStatus(id, true);
  };

  const currentDisplayList = activeTab === 'active' ? activeImages : hiddenImages;

  return (
    <div>
      
      {/* Section Subheader */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 border-b-2 border-black/15 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-ink-muted uppercase tracking-[0.2em] mb-2">
            <Sparkle size={13} weight="fill" className="text-accent-purple" />
            <span>Catalog Management</span>
            <span className="text-accent-purple font-black">/</span>
            <span className="text-emerald-700 font-black flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>LIVE CLOUD SYNC</span>
            </span>
          </div>
          <h2 className="font-condensed text-4xl sm:text-5xl md:text-6xl text-ink uppercase leading-[0.88] tracking-tight">
            PORTFOLIO SHOWCASE.
          </h2>
        </div>

        {/* Tab Switcher & Reset Button */}
        <div className="flex items-center gap-2 flex-wrap">
          
          {/* Active Tab */}
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all border-2 border-black cursor-pointer shadow-xs ${
              activeTab === 'active'
                ? 'bg-black text-white'
                : 'bg-white text-ink hover:bg-accent-yellow'
            }`}
          >
            <span>Live on Site ({activeImages.length})</span>
          </button>

          {/* Hidden / Archived Tab */}
          <button
            onClick={() => setActiveTab('hidden')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all border-2 border-black cursor-pointer shadow-xs ${
              activeTab === 'hidden'
                ? 'bg-black text-white'
                : 'bg-white text-ink hover:bg-accent-yellow'
            }`}
          >
            <span>Hidden / Archived ({hiddenImages.length})</span>
          </button>

          {/* Reset Defaults */}
          <button
            onClick={() => {
              if (window.confirm('Reset catalog back to the original 19 curated photos?')) {
                adminStore.resetToDefaults();
              }
            }}
            className="px-3.5 py-2 bg-white hover:bg-accent-yellow border-2 border-black text-ink rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
          >
            Reset Defaults
          </button>

        </div>
      </div>

      {/* Empty State for Tab */}
      {currentDisplayList.length === 0 && (
        <div className="p-12 text-center bg-white border-2 border-black rounded-3xl shadow-sm my-6">
          <div className="w-12 h-12 rounded-2xl bg-neutral-100 border-2 border-black flex items-center justify-center mx-auto mb-3">
            {activeTab === 'active' ? <Eye size={24} /> : <Archive size={24} />}
          </div>
          <h3 className="font-condensed text-2xl text-ink uppercase">
            {activeTab === 'active' ? 'No Active Photos' : 'No Hidden Photos'}
          </h3>
          <p className="text-xs text-ink-muted mt-1 max-w-sm mx-auto">
            {activeTab === 'active'
              ? 'Upload new photographs above or restore photos from the Hidden tab.'
              : 'When you hide built-in photos from the live site, they appear here so you can re-enable them anytime.'}
          </p>
        </div>
      )}

      {/* Photo Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {currentDisplayList.map((item, idx) => (
          <div
            key={item.id}
            className={`bg-white border-2 border-black rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group hover-glow transition-all ${
              item.enabled === false ? 'opacity-70 grayscale-[30%]' : ''
            }`}
          >
            
            {/* Image Preview Container */}
            <div 
              onClick={() => setPreviewImage(item)}
              className="relative aspect-3/4 bg-neutral-100 cursor-pointer overflow-hidden border-b-2 border-black"
            >
              <img
                src={item.image}
                alt={item.title || `Photo ${item.serial}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Number Badge & Source Pill */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1">
                <span className="bg-black text-white text-[9.5px] font-mono font-black px-2 py-0.5 rounded-md border border-black shadow-xs">
                  NO. {item.serial}
                </span>
                {item.source === 'cloudinary' && (
                  <span className="bg-accent-yellow text-black text-[8px] font-bold px-1.5 py-0.5 rounded border border-black uppercase">
                    CLOUD
                  </span>
                )}
              </div>

              {/* Expand Overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-9 h-9 rounded-full bg-white text-black border-2 border-black flex items-center justify-center shadow-md">
                  <ArrowsOut size={16} weight="bold" />
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-2.5 bg-[#faf8f2] flex items-center justify-between gap-1.5">
              
              {activeTab === 'active' ? (
                <>
                  {/* Move Left */}
                  <button
                    disabled={idx === 0}
                    onClick={() => handleMove(idx, -1)}
                    className={`w-7 h-7 rounded-lg border-2 border-black flex items-center justify-center transition-all ${
                      idx === 0 
                        ? 'opacity-20 cursor-not-allowed bg-transparent text-black' 
                        : 'bg-white hover:bg-accent-yellow text-ink cursor-pointer active:scale-95'
                    }`}
                    title="Move earlier in sequence"
                  >
                    <ArrowLeft size={13} weight="bold" />
                  </button>

                  <span className="font-mono text-[10.5px] font-black text-ink">
                    {idx + 1}/{activeImages.length}
                  </span>

                  {/* Move Right */}
                  <button
                    disabled={idx === activeImages.length - 1}
                    onClick={() => handleMove(idx, 1)}
                    className={`w-7 h-7 rounded-lg border-2 border-black flex items-center justify-center transition-all ${
                      idx === activeImages.length - 1 
                        ? 'opacity-20 cursor-not-allowed bg-transparent text-black' 
                        : 'bg-white hover:bg-accent-yellow text-ink cursor-pointer active:scale-95'
                    }`}
                    title="Move later in sequence"
                  >
                    <ArrowRight size={13} weight="bold" />
                  </button>

                  {/* Hide or Delete Button */}
                  <button
                    onClick={() => setActionConfirmItem(item)}
                    className={`w-7 h-7 rounded-lg border-2 border-black flex items-center justify-center transition-colors cursor-pointer ml-1 active:scale-95 ${
                      item.source === 'github'
                        ? 'bg-amber-50 hover:bg-amber-400 text-amber-900'
                        : 'bg-red-50 hover:bg-red-500 text-red-600 hover:text-white'
                    }`}
                    title={item.source === 'github' ? 'Hide from live website' : 'Permanently delete uploaded photo'}
                  >
                    {item.source === 'github' ? <EyeSlash size={13} weight="bold" /> : <Trash size={13} weight="bold" />}
                  </button>
                </>
              ) : (
                /* Restore Button for Hidden Photos */
                <button
                  onClick={() => handleRestore(item.id)}
                  className="w-full py-1.5 bg-black hover:bg-accent-yellow hover:text-black text-white text-xs font-bold uppercase rounded-lg border-2 border-black transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <Eye size={14} weight="bold" />
                  <span>Restore to Live Site</span>
                </button>
              )}

            </div>

          </div>
        ))}
      </div>

      {/* ── ACTION CONFIRMATION MODAL ── */}
      {actionConfirmItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-black rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95 duration-200">
            <div className={`w-12 h-12 rounded-2xl border-2 border-black flex items-center justify-center mx-auto mb-4 ${
              actionConfirmItem.source === 'github' ? 'bg-amber-100 text-amber-900' : 'bg-red-100 text-red-600'
            }`}>
              {actionConfirmItem.source === 'github' ? <EyeSlash size={24} weight="bold" /> : <Trash size={24} weight="bold" />}
            </div>

            <h3 className="font-condensed text-2xl text-ink uppercase tracking-tight mb-1">
              {actionConfirmItem.source === 'github' ? 'Hide Photograph from Site?' : 'Permanently Delete Photo?'}
            </h3>

            <p className="text-xs text-ink-muted mb-6">
              {actionConfirmItem.source === 'github'
                ? 'This built-in photo will be hidden from aanuore.works. You can re-enable it anytime in the Hidden tab.'
                : 'This photo will be permanently removed from the live portfolio showcase.'}
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActionConfirmItem(null)}
                className="flex-1 py-2.5 rounded-xl bg-white hover:bg-neutral-100 border-2 border-black text-xs font-bold text-ink cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmAction(actionConfirmItem)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold text-white cursor-pointer border-2 border-black shadow-md ${
                  actionConfirmItem.source === 'github'
                    ? 'bg-black hover:bg-accent-purple'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {actionConfirmItem.source === 'github' ? 'Hide Photo' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── FULL PREVIEW MODAL ── */}
      {previewImage && (
        <div 
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-white border-2 border-black rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="p-4 border-b-2 border-black flex items-center justify-between bg-[#ede9df]">
              <span className="font-mono text-xs font-black text-ink">
                NO. {previewImage.serial} • {previewImage.title || 'Photograph'}
              </span>
              <button
                onClick={() => setPreviewImage(null)}
                className="w-8 h-8 rounded-full bg-black hover:bg-accent-purple text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <X size={16} weight="bold" />
              </button>
            </div>
            <div className="p-4 flex items-center justify-center bg-neutral-950">
              <img
                src={previewImage.image}
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
