import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Trash, 
  ArrowsOut, 
  X, 
  Sparkle,
  CheckCircle,
  Eye
} from '@phosphor-icons/react';
import { adminStore } from '../services/adminStore';

export default function PhotoGrid({ images }) {
  const [previewImage, setPreviewImage] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const handleMove = (index, direction) => {
    adminStore.moveImage(index, index + direction);
  };

  const handleDelete = (id) => {
    adminStore.deleteImage(id);
    setDeleteConfirmId(null);
  };

  return (
    <div>
      
      {/* Section Subheader */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 border-b-2 border-black/15 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-ink-muted uppercase tracking-[0.2em] mb-2">
            <Sparkle size={13} weight="fill" className="text-accent-purple" />
            <span>Active Sequence</span>
            <span className="text-accent-purple font-black">/</span>
            <span>Live Catalog</span>
          </div>
          <h2 className="font-condensed text-4xl sm:text-5xl md:text-6xl text-ink uppercase leading-[0.88] tracking-tight">
            PORTFOLIO SHOWCASE.
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white border-2 border-black p-1.5 rounded-full shadow-xs flex items-center justify-center">
            <img src="/earth.svg" alt="" className="w-5 h-5 object-contain" />
          </div>
          <span className="font-mono text-xs sm:text-sm font-black text-ink bg-white border-2 border-black px-3.5 py-1 rounded-full shadow-xs">
            {images.length} TOTAL WORKS
          </span>
          <button
            onClick={() => {
              if (window.confirm('Reset portfolio catalog back to the original 19 curated photos?')) {
                adminStore.resetToDefaults();
              }
            }}
            className="px-3.5 py-1.5 bg-white hover:bg-accent-yellow border-2 border-black text-ink rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
          >
            Reset Defaults
          </button>
        </div>
      </div>

      {/* Photo Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {images.map((item, idx) => (
          <div
            key={item.id}
            className="bg-white border-2 border-black rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group hover-glow transition-all"
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

              {/* Number Badge */}
              <div className="absolute top-2.5 left-2.5">
                <span className="bg-black text-white text-[9.5px] font-mono font-black px-2 py-0.5 rounded-md border border-black shadow-xs">
                  NO. {item.serial}
                </span>
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
                {idx + 1}/{images.length}
              </span>

              {/* Move Right */}
              <button
                disabled={idx === images.length - 1}
                onClick={() => handleMove(idx, 1)}
                className={`w-7 h-7 rounded-lg border-2 border-black flex items-center justify-center transition-all ${
                  idx === images.length - 1 
                    ? 'opacity-20 cursor-not-allowed bg-transparent text-black' 
                    : 'bg-white hover:bg-accent-yellow text-ink cursor-pointer active:scale-95'
                }`}
                title="Move later in sequence"
              >
                <ArrowRight size={13} weight="bold" />
              </button>

              {/* Delete Button */}
              <button
                onClick={() => setDeleteConfirmId(item.id)}
                className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-500 text-red-600 hover:text-white border-2 border-black flex items-center justify-center transition-colors cursor-pointer ml-1 active:scale-95"
                title="Delete photograph"
              >
                <Trash size={13} weight="bold" />
              </button>

            </div>

          </div>
        ))}
      </div>

      {/* ── DELETE CONFIRMATION MODAL ── */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-black rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 border-2 border-black flex items-center justify-center mx-auto mb-4">
              <Trash size={24} weight="bold" />
            </div>
            <h3 className="font-condensed text-2xl text-ink uppercase tracking-tight mb-1">
              Remove Photograph?
            </h3>
            <p className="text-xs text-ink-muted mb-6">
              This will remove this photo from the live portfolio sequence.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl bg-white hover:bg-neutral-100 border-2 border-black text-xs font-bold text-ink cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white cursor-pointer border-2 border-black shadow-md"
              >
                Delete
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
