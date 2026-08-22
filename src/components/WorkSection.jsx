import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  CaretLeft,
  CaretRight,
  Sparkle,
  ArrowsOut,
  X,
  Play,
  Pause
} from '@phosphor-icons/react';

import { portfolioStore } from '../services/portfolioStore';

const AUTO_INTERVAL = 3500;

export default function WorkSection() {
  const [allImages, setAllImages] = useState(() => portfolioStore.getImages());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const autoTimerRef = useRef(null);
  const total = allImages.length;

  // Sync with portfolio store updates (live admin additions/deletions)
  useEffect(() => {
    const unsubscribe = portfolioStore.subscribe((newImages) => {
      setAllImages(newImages);
      setCurrentIndex((prev) => (prev >= newImages.length ? 0 : prev));
    });
    return () => unsubscribe();
  }, []);

  // Hide broken/deleted images silently — prevents black cards when a
  // Cloudinary photo is deleted but still in a visitor's browser cache.
  const handleImageError = (brokenId) => {
    setAllImages((prev) => {
      const filtered = prev.filter((img) => img.id !== brokenId);
      setCurrentIndex((ci) => (ci >= filtered.length ? 0 : ci));
      return filtered;
    });
  };

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Lightbox Navigation
  const navigateLightbox = useCallback((direction) => {
    setLightboxIndex((prev) => {
      if (prev === null) return 0;
      const next = (prev + direction + total) % total;
      setCurrentIndex(next);
      return next;
    });
  }, [total]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, navigateLightbox]);

  // Auto-rotation
  const startAutoPlay = useCallback(() => {
    clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, AUTO_INTERVAL);
  }, [total]);

  const stopAutoPlay = useCallback(() => {
    clearInterval(autoTimerRef.current);
  }, []);

  useEffect(() => {
    if (isPlaying && lightboxIndex === null) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
    return () => stopAutoPlay();
  }, [isPlaying, lightboxIndex, startAutoPlay, stopAutoPlay]);

  // Pause on manual interaction, then resume after a beat
  const manualNavigate = (fn) => {
    fn();
    if (isPlaying && lightboxIndex === null) {
      stopAutoPlay();
      setTimeout(() => startAutoPlay(), AUTO_INTERVAL + 400);
    }
  };

  // Touch Swipe on Stage
  const stageTouchStartX = useRef(0);
  const stageTouchEndX = useRef(0);
  const isSwiping = useRef(false);

  const handleStageTouchStart = (e) => {
    stageTouchStartX.current = e.targetTouches[0].clientX;
    stageTouchEndX.current = e.targetTouches[0].clientX;
    isSwiping.current = false;
  };

  const handleStageTouchMove = (e) => {
    stageTouchEndX.current = e.targetTouches[0].clientX;
    if (Math.abs(stageTouchStartX.current - stageTouchEndX.current) > 12) {
      isSwiping.current = true;
    }
  };

  const handleStageTouchEnd = () => {
    const diff = stageTouchStartX.current - stageTouchEndX.current;
    if (diff > 45) {
      manualNavigate(handleNext);
    } else if (diff < -45) {
      manualNavigate(handlePrev);
    }
  };

  // Touch Swipe for Lightbox
  const lightboxTouchStartX = useRef(0);
  const lightboxTouchEndX = useRef(0);

  const handleLightboxTouchStart = (e) => {
    lightboxTouchStartX.current = e.targetTouches[0].clientX;
    lightboxTouchEndX.current = e.targetTouches[0].clientX;
  };

  const handleLightboxTouchMove = (e) => {
    lightboxTouchEndX.current = e.targetTouches[0].clientX;
  };

  const handleLightboxTouchEnd = () => {
    const diff = lightboxTouchStartX.current - lightboxTouchEndX.current;
    if (diff > 45) navigateLightbox(1);
    if (diff < -45) navigateLightbox(-1);
  };

  // Keyboard nav
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') manualNavigate(handleNext);
      if (e.key === 'ArrowLeft') manualNavigate(handlePrev);
      if (e.key === 'Escape') setLightboxIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [total, isPlaying, handleNext, handlePrev]);

  const currentItem = allImages[currentIndex] || allImages[0] || { serial: '01', title: 'Work', image: '' };
  // Progress arc for the circular timer
  const radius = 18;
  const circumference = 2 * Math.PI * radius;

  return (
    <section id="work" className="w-full bg-[#ede9df] py-10 sm:py-14 px-3 sm:px-6 md:px-8 border-t-2 border-black/15 relative overflow-hidden">

      {/* ── BACKGROUND ARCHITECTURAL CHECKERED GRID ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-95">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="workCheckeredGrid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(10,10,10,0.16)" strokeWidth="1.2" />
              <path d="M 40 0 L 40 80 M 0 40 L 80 40" fill="none" stroke="rgba(10,10,10,0.10)" strokeWidth="1" />
              <path d="M 40 8 L 48 0 M 40 16 L 56 0 M 40 24 L 64 0 M 40 32 L 72 0 M 40 40 L 80 0 M 48 40 L 80 8 M 56 40 L 80 16 M 64 40 L 80 24 M 72 40 L 80 32" stroke="rgba(10,10,10,0.14)" strokeWidth="1.5" />
              <path d="M 0 48 L 8 40 M 0 56 L 16 40 M 0 64 L 24 40 M 0 72 L 32 40 M 0 80 L 40 40 M 8 80 L 40 48 M 16 80 L 40 56 M 24 80 L 40 64 M 32 80 L 40 72" stroke="rgba(10,10,10,0.14)" strokeWidth="1.5" />
              <path d="M 37 40 L 43 40 M 40 37 L 40 43" stroke="rgba(10,10,10,0.35)" strokeWidth="1.5" />
              <path d="M 77 80 L 83 80 M 80 77 L 80 83" stroke="rgba(10,10,10,0.35)" strokeWidth="1.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#workCheckeredGrid)" />
        </svg>
      </div>

      {/* Decorative SVGs */}
      <div className="absolute top-12 left-8 pointer-events-none opacity-40 hidden sm:block">
        <img src="/sparkles.svg" alt="" className="w-16 h-16" />
      </div>
      <div className="absolute top-1/3 right-6 pointer-events-none opacity-30 hidden lg:block">
        <img src="/twist.svg" alt="" className="w-14 h-14" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* ── SECTION HEADER ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4 sm:mb-6 border-b border-black/15 pb-4" data-reveal>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-ink-muted uppercase tracking-[0.25em] mb-2.5">
              <Sparkle size={13} weight="fill" className="text-accent-purple" />
              <span>Portfolio Showcase</span>
              <span className="text-accent-purple font-black">/</span>
              <span>All Works</span>
            </div>
            <h2 className="font-condensed text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-ink uppercase leading-[0.88] tracking-tight">
              <span className="inline-flex items-center gap-3 sm:gap-4 flex-wrap">
                <span>PORTFOLIO SHOWCASE.</span>
                <span className="bg-white border-2 border-black p-1.5 rounded-2xl shadow-sm -rotate-6 inline-flex items-center justify-center">
                  <img src="/camera3.svg" alt="" className="w-7 h-7 sm:w-9 sm:h-9 object-contain" />
                </span>
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white border-2 border-black p-1.5 rounded-full shadow-xs flex items-center justify-center">
              <img src="/earth.svg" alt="" className="w-6 h-6 object-contain" />
            </div>
            <span className="font-mono text-sm sm:text-base font-black text-ink bg-white border-2 border-black px-4 py-1.5 rounded-full shadow-xs">
              {currentItem.serial} / {total.toString().padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* ── 3D ROTARY CARD STAGE ── */}
        <div
          className="relative w-full h-[460px] sm:h-[520px] md:h-[560px] flex items-center justify-center select-none overflow-hidden mt-0 mb-4"
          onTouchStart={handleStageTouchStart}
          onTouchMove={handleStageTouchMove}
          onTouchEnd={handleStageTouchEnd}
        >
          {allImages.map((item, idx) => {
            let offset = idx - currentIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 3;
            if (!isVisible) return null;

            const rotationDeg = offset * 12;
            const translateX = offset * 260;
            const translateY = Math.abs(offset) * 38;
            const scale = isCenter ? 1 : Math.max(0.70, 1 - Math.abs(offset) * 0.10);
            const zIndex = isCenter ? 30 : 20 - Math.abs(offset) * 5;
            const opacity = isCenter ? 1 : Math.max(0.4, 0.85 - Math.abs(offset) * 0.18);

            return (
              <div
                key={item.id}
                onClick={(e) => {
                  if (isSwiping.current) return;
                  if (isCenter) {
                    setLightboxIndex(idx);
                  } else {
                    manualNavigate(() => setCurrentIndex(idx));
                  }
                }}
                style={{
                  transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotationDeg}deg) scale(${scale})`,
                  zIndex,
                  opacity,
                  transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease',
                }}
                className={`absolute w-64 sm:w-76 md:w-84 aspect-3/4 rounded-3xl sm:rounded-[36px] border-2 border-black overflow-hidden shadow-xl cursor-pointer group bg-black transition-all duration-300 hover:border-accent-purple hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] ${isCenter ? 'shadow-2xl' : 'hover:opacity-90'
                  }`}
              >
                <img
                  src={item.image}
                  alt={`Work ${item.serial}`}
                  onError={() => handleImageError(item.id)}
                  style={{
                    filter: isCenter ? 'brightness(100%) contrast(100%)' : 'brightness(55%) contrast(85%)',
                    transition: 'filter 0.5s ease'
                  }}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Serial Tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`font-mono text-xs font-black px-2.5 py-1 rounded-full border transition-all ${isCenter ? 'text-white bg-black/80 border-white/20' : 'text-white/60 bg-black/60 border-white/10'
                    }`}>
                    NO. {item.serial}
                  </span>
                </div>

                {/* Expand Button (center only) */}
                {isCenter && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex(idx); }}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/80 hover:bg-accent-yellow hover:text-black text-white flex items-center justify-center transition-colors shadow-md cursor-pointer border border-white/20 z-10 active:scale-90"
                    title="View Full Photograph"
                    aria-label="Expand Photograph"
                  >
                    <ArrowsOut size={18} weight="bold" />
                  </button>
                )}

                {/* Bottom watermark */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className={`text-[10px] font-black uppercase tracking-widest font-display-title ${isCenter ? 'text-white' : 'text-white/50'}`}>
                    AANUORE
                  </span>
                  <span className={`text-[9px] font-mono font-bold ${isCenter ? 'text-accent-yellow' : 'text-white/40'}`}>
                    {item.serial} / {total}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── SLEEK CONTROL DOCK ── */}
        <div className="mt-2 flex flex-col gap-3 max-w-lg mx-auto w-full">

          {/* Dot Strip Progress Row */}
          <div className="flex items-center gap-1 justify-center flex-wrap">
            {allImages.map((img, i) => {
              const isActive = i === currentIndex;
              const isFive = i % 5 === 0;
              return (
                <button
                  key={img.id}
                  onClick={() => manualNavigate(() => setCurrentIndex(i))}
                  aria-label={`Go to photograph ${img.serial}`}
                  className="group relative flex flex-col items-center cursor-pointer"
                  style={{ padding: '4px' }}
                >
                  <div
                    className={`transition-all duration-300 rounded-full ${isActive
                        ? 'w-6 h-2.5 bg-black'
                        : isFive
                          ? 'w-2 h-2 bg-black/40 group-hover:bg-black/70'
                          : 'w-1.5 h-1.5 bg-black/20 group-hover:bg-black/50'
                      }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Main Control Bar */}
          <div className="bg-white border-2 border-black rounded-2xl px-5 py-4 shadow-md flex items-center justify-between gap-4 hover-glow-subtle">

            {/* Left: Play/Pause + Label */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? 'Pause auto-rotation' : 'Resume auto-rotation'}
                className={`w-10 h-10 rounded-full border-2 border-black flex items-center justify-center transition-all active:scale-90 cursor-pointer shadow-sm ${isPlaying ? 'bg-black text-white hover:bg-accent-purple' : 'bg-white text-black hover:bg-accent-yellow'
                  }`}
              >
                {isPlaying ? <Pause size={16} weight="fill" /> : <Play size={16} weight="fill" />}
              </button>
            </div>

            {/* Center: Prev / Framed Counter / Next */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => manualNavigate(handlePrev)}
                aria-label="Previous photograph"
                className="w-10 h-10 rounded-full bg-white hover:bg-accent-yellow text-black border-2 border-black flex items-center justify-center transition-all active:scale-90 cursor-pointer shadow-xs"
              >
                <CaretLeft size={18} weight="bold" />
              </button>

              <div className="px-4 py-2 bg-[#ede9df] rounded-xl border border-black/15 font-mono text-xs font-black text-ink shadow-2xs">
                {allImages[currentIndex].serial} / {total}
              </div>

              <button
                onClick={() => manualNavigate(handleNext)}
                aria-label="Next photograph"
                className="w-10 h-10 rounded-full bg-white hover:bg-accent-yellow text-black border-2 border-black flex items-center justify-center transition-all active:scale-90 cursor-pointer shadow-xs"
              >
                <CaretRight size={18} weight="bold" />
              </button>
            </div>

            {/* Right: Camera icon + rotate timer ring */}
            <div className="shrink-0 flex items-center justify-end">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <svg className="w-8 h-8 -rotate-90" viewBox="0 0 32 32">
                  <circle
                    cx="16"
                    cy="16"
                    r={radius}
                    fill="none"
                    stroke="#000"
                    strokeWidth="2"
                    opacity="0.12"
                  />
                  {isPlaying && (
                    <circle
                      key={currentIndex}
                      cx="16"
                      cy="16"
                      r={radius}
                      fill="none"
                      stroke="#7c3aed"
                      strokeWidth="2.5"
                      strokeDasharray={circumference}
                      strokeLinecap="round"
                      style={{
                        animation: `timerRing ${AUTO_INTERVAL}ms linear forwards`,
                      }}
                    />
                  )}
                </svg>
                <div className="w-6 h-6 rounded-lg border border-black/15 bg-[#ede9df] flex items-center justify-center z-10">
                  <img src="/camera2.svg" alt="" className="w-4 h-4 object-contain" />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ── FULL FEATURED LIGHTBOX MODAL ── */}
      {lightboxIndex !== null && (
        <div
          onClick={() => setLightboxIndex(null)}
          onTouchStart={handleLightboxTouchStart}
          onTouchMove={handleLightboxTouchMove}
          onTouchEnd={handleLightboxTouchEnd}
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-3 sm:p-8 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[92vh] bg-white border-2 border-black rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Modal Top Bar */}
            <div className="p-3.5 sm:p-5 border-b-2 border-black flex items-center justify-between bg-canvas">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs sm:text-sm font-black text-ink">
                  PHOTOGRAPH NO. {allImages[lightboxIndex].serial}
                </span>
                <span className="text-[10px] sm:text-xs font-mono font-bold text-ink-muted bg-white border border-black/15 px-2 py-0.5 rounded-full">
                  {lightboxIndex + 1} / {total}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Prev / Next controls in header */}
                <button
                  onClick={() => navigateLightbox(-1)}
                  className="w-8 h-8 rounded-full bg-white hover:bg-accent-yellow text-black border border-black/20 flex items-center justify-center transition-colors cursor-pointer"
                  title="Previous (Left Arrow)"
                  aria-label="Previous image"
                >
                  <CaretLeft size={16} weight="bold" />
                </button>
                <button
                  onClick={() => navigateLightbox(1)}
                  className="w-8 h-8 rounded-full bg-white hover:bg-accent-yellow text-black border border-black/20 flex items-center justify-center transition-colors cursor-pointer"
                  title="Next (Right Arrow)"
                  aria-label="Next image"
                >
                  <CaretRight size={16} weight="bold" />
                </button>
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black hover:bg-accent-purple text-white flex items-center justify-center transition-colors cursor-pointer ml-1"
                  title="Close (Esc)"
                  aria-label="Close modal"
                >
                  <X size={18} weight="bold" />
                </button>
              </div>
            </div>

            {/* Modal Image Body with Large Side Navigation Arrows */}
            <div className="relative flex-1 overflow-hidden bg-neutral-950 flex items-center justify-center p-2 sm:p-6 min-h-[50vh] max-h-[74vh]">
              
              {/* Previous Floating Button */}
              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/75 hover:bg-accent-yellow hover:text-black text-white border-2 border-white/20 flex items-center justify-center transition-all shadow-xl z-20 cursor-pointer active:scale-90"
                aria-label="Previous photograph"
              >
                <CaretLeft size={22} weight="bold" />
              </button>

              {/* Main Image */}
              <img
                key={allImages[lightboxIndex].id}
                src={allImages[lightboxIndex].image}
                alt={`Full Photograph ${allImages[lightboxIndex].serial}`}
                onError={() => {
                  handleImageError(allImages[lightboxIndex].id);
                  setLightboxIndex(null);
                }}
                className="max-h-[68vh] w-auto max-w-full object-contain rounded-xl shadow-lg select-none animate-in fade-in zoom-in-95 duration-200"
              />

              {/* Next Floating Button */}
              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/75 hover:bg-accent-yellow hover:text-black text-white border-2 border-white/20 flex items-center justify-center transition-all shadow-xl z-20 cursor-pointer active:scale-90"
                aria-label="Next photograph"
              >
                <CaretRight size={22} weight="bold" />
              </button>
            </div>

            {/* Modal Footer Bar */}
            <div className="px-4 py-2.5 bg-canvas border-t-2 border-black flex items-center justify-between text-[11px] font-mono font-bold text-ink-muted">
              <span className="hidden sm:inline">Use ← / → keys or swipe on mobile</span>
              <span className="sm:hidden">Swipe left / right to navigate</span>
              <span className="text-ink font-bold">AANUORE PORTFOLIO</span>
            </div>
          </div>
        </div>
      )}

      {/* CSS animation for timer ring */}
      <style>{`
        @keyframes timerRing {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: ${circumference}; }
        }
      `}</style>

    </section>
  );
}
