import React, { useState } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  Sparkle,
  House,
  Globe,
  Camera,
  Star,
  List,
  X
} from '@phosphor-icons/react';
import AnalogClock from './AnalogClock';

export default function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-canvas grain-overlay relative overflow-hidden flex flex-col justify-between">

      {/* ── BACKGROUND ARCHITECTURAL CHECKERED GRID (Horizontal & Vertical with Diagonal Hatch Shading) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-95">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="heroCheckeredGrid" width="80" height="80" patternUnits="userSpaceOnUse">
              {/* Main 80x80 Grid Borders */}
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(10,10,10,0.16)" strokeWidth="1.2" />
              
              {/* Internal 40x40 Subdividers */}
              <path d="M 40 0 L 40 80 M 0 40 L 80 40" fill="none" stroke="rgba(10,10,10,0.10)" strokeWidth="1" />

              {/* Diagonal Hatch Lines for Checkered Shading in Top-Right 40x40 Quadrant */}
              <path 
                d="M 40 8 L 48 0 M 40 16 L 56 0 M 40 24 L 64 0 M 40 32 L 72 0 M 40 40 L 80 0 M 48 40 L 80 8 M 56 40 L 80 16 M 64 40 L 80 24 M 72 40 L 80 32" 
                stroke="rgba(10,10,10,0.14)" 
                strokeWidth="1.5" 
              />

              {/* Diagonal Hatch Lines for Checkered Shading in Bottom-Left 40x40 Quadrant */}
              <path 
                d="M 0 48 L 8 40 M 0 56 L 16 40 M 0 64 L 24 40 M 0 72 L 32 40 M 0 80 L 40 40 M 8 80 L 40 48 M 16 80 L 40 56 M 24 80 L 40 64 M 32 80 L 40 72" 
                stroke="rgba(10,10,10,0.14)" 
                strokeWidth="1.5" 
              />

              {/* Intersection Plus Marks */}
              <path d="M 37 40 L 43 40 M 40 37 L 40 43" stroke="rgba(10,10,10,0.35)" strokeWidth="1.5" />
              <path d="M 77 80 L 83 80 M 80 77 L 80 83" stroke="rgba(10,10,10,0.35)" strokeWidth="1.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroCheckeredGrid)" />
        </svg>
      </div>

      {/* ── TOP HEADER / NAVBAR (With Sleek Subtle Space from Top) ── */}
      <header className="relative z-30 w-full px-4 sm:px-8 md:px-12 pt-2 sm:pt-2.5 flex items-center justify-between">

        {/* Brand Logo & Name */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <img
            src="/aanuore-logo.png"
            alt="Aanuore"
            className="h-8 sm:h-10 w-auto object-contain drop-shadow-xs"
          />
          <span className="font-bold text-xl sm:text-2xl tracking-tight text-ink font-display-title">
            aanuore
          </span>
        </a>

        {/* Integrated Black Top Notch */}
        <div className="hidden md:flex items-center gap-8 bg-[#111114] text-white px-9 py-3 rounded-2xl shadow-md border border-black/10">
          <a
            href="#work"
            className="text-white/80 hover:text-white text-xs font-semibold uppercase tracking-[0.18em] transition-colors"
          >
            Work
          </a>
          <a
            href="#realestate"
            className="text-white/80 hover:text-white text-xs font-semibold uppercase tracking-[0.18em] transition-colors"
          >
            Real Estate
          </a>
          <a
            href="#about"
            className="text-white/80 hover:text-white text-xs font-semibold uppercase tracking-[0.18em] transition-colors"
          >
            About
          </a>
          <a
            href="#services"
            className="text-white/80 hover:text-white text-xs font-semibold uppercase tracking-[0.18em] transition-colors"
          >
            Services
          </a>
          <a
            href="#contact"
            className="text-white/80 hover:text-white text-xs font-semibold uppercase tracking-[0.18em] transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Right Action Button & Mobile Toggle */}
        <div className="flex items-center gap-2.5">
          <a
            href="#contact"
            className="bg-white hover:bg-black hover:text-white text-ink text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full border-2 border-black shadow-sm transition-all duration-200 hidden sm:inline-flex items-center gap-1.5"
          >
            <span>Work With Us</span>
            <ArrowUpRight size={13} weight="bold" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shadow-sm"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mx-4 my-2 p-5 bg-white border-2 border-black rounded-2xl shadow-xl flex flex-col gap-3 relative z-40 animate-in fade-in duration-200">
          <a
            href="#work"
            onClick={() => setMobileMenuOpen(false)}
            className="font-bold text-xs text-ink uppercase tracking-wider py-2.5 border-b border-black/10 flex items-center justify-between"
          >
            <span>Our Work</span>
            <Camera size={16} weight="bold" className="text-accent-purple" />
          </a>
          <a
            href="#realestate"
            onClick={() => setMobileMenuOpen(false)}
            className="font-bold text-xs text-ink uppercase tracking-wider py-2.5 border-b border-black/10 flex items-center justify-between"
          >
            <span>Real Estate</span>
            <House size={16} weight="bold" className="text-accent-purple" />
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="font-bold text-xs text-ink uppercase tracking-wider py-2.5 border-b border-black/10 flex items-center justify-between"
          >
            <span>About Aanuore</span>
            <Globe size={16} weight="bold" className="text-accent-purple" />
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="font-bold text-xs text-ink uppercase tracking-wider py-2.5 border-b border-black/10 flex items-center justify-between"
          >
            <span>Services</span>
            <Sparkle size={16} weight="bold" className="text-accent-purple" />
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="font-bold text-xs text-ink uppercase tracking-wider py-2.5 border-b border-black/10 flex items-center justify-between"
          >
            <span>Contact</span>
            <ArrowUpRight size={16} weight="bold" className="text-accent-purple" />
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-1 w-full py-3 bg-accent-purple text-white font-bold rounded-xl text-center text-xs uppercase tracking-wider shadow-sm"
          >
            Work With Us
          </a>
        </div>
      )}

      {/* ── MAIN HERO BODY ── */}
      <main className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 md:px-12 py-4 sm:py-6 grow flex flex-col justify-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">

          {/* LEFT COLUMN: Motto, Giant Headline & Landscape Card */}
          <div className="lg:col-span-7 flex flex-col justify-between">

            {/* Top Motto Line with Earth SVG Visual Anchor */}
            <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-bold text-ink-muted uppercase tracking-[0.2em] mb-2 sm:mb-3">
              <img
                src="/earth.svg"
                alt=""
                className="w-6 h-6 object-contain drop-shadow-sm -rotate-6"
              />
              <span>Real Estate</span>
              <span className="text-accent-purple">•</span>
              <span>Creative Media</span>
              <span className="text-accent-purple">•</span>
              <span>Digital Communication</span>
            </div>

            {/* Giant Condensed Headline with Prominent Sparkles SVG */}
            <div className="relative z-20">
              <h1 className="font-condensed text-6xl sm:text-7xl md:text-8xl lg:text-[100px] text-ink uppercase leading-[0.86] tracking-tight">
                CREATING.<br />
                COMMUNICATING.<br />
                CONNECTING.
              </h1>

              {/* High-Visibility Golden Sparkles SVG on headline */}
              <div className="absolute -top-6 right-6 sm:right-20 pointer-events-none drop-shadow-md z-30">
                <img src="/sparkles.svg" alt="" className="w-12 h-12 sm:w-16 sm:h-16 animate-pulse" />
              </div>
            </div>

            {/* Bottom Left Card: hero2.jpg (Landscape Card with House SVG Sticker) */}
            <div className="relative mt-6 sm:mt-8 z-10">
              <div className="relative border-2 border-black bg-white chamfer-card-tr overflow-hidden shadow-md">

                {/* Photo container */}
                <div className="relative aspect-16/10 sm:aspect-video max-h-[350px] w-full overflow-hidden bg-neutral-100">
                  <img
                    src="/hero2.jpg"
                    alt="Aanuore Real Estate and Architectural Showcase"
                    className="w-full h-full object-cover"
                  />

                  {/* Gradient overlay for readability */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Overlaid Details directly on bottom of image */}
                  <div className="absolute bottom-3.5 left-4 right-14 text-white z-10 flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold tracking-wide uppercase text-accent-yellow">
                      <House size={15} weight="bold" />
                      <span>Property Visuals & Architectural Spaces</span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-white/90 font-medium leading-snug line-clamp-2">
                      Presenting high value properties with clean editorial composition and intention.
                    </p>
                  </div>
                </div>
              </div>

              {/* Yellow Attached Pill Sticker (Inspired by Crypko "CREATE ANIME" pill) */}
              <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 bg-accent-yellow border-2 border-black rounded-2xl py-3 px-2 shadow-md flex flex-col items-center gap-1 z-20">
                <House size={16} weight="bold" className="text-black" />
                <span className="text-[8.5px] font-black uppercase tracking-tighter text-black [writing-mode:vertical-lr] text-center leading-tight">
                  SPACES
                </span>
              </div>

              {/* Prominent Architectural House SVG Badge (Positioned at top-left corner so text is unobstructed) */}
              <div className="absolute -top-5 -left-3 z-30 pointer-events-none drop-shadow-lg">
                <div className="bg-white/95 border-2 border-black p-1 rounded-2xl shadow-md rotate-[-4deg]">
                  <img src="/house.svg" alt="" className="w-11 h-11 sm:w-13 sm:h-13" />
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Portrait Card, Rotating Stamp, & Info Card Box */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-5 relative">

            {/* Center-Right: Real-Time Working Analog Clock & Corner Sparkles */}
            <div className="relative flex items-center justify-between">
              
              {/* Real-Time Live Clock */}
              <AnalogClock compact={true} />

              {/* Prominent Golden Sparkles Beautifier near Clock */}
              <div className="drop-shadow-md">
                <img src="/sparkles.svg" alt="" className="w-12 h-12 sm:w-14 sm:h-14" />
              </div>
            </div>

            {/* Top Right Card: hero1.jpg (Portrait Photo Card with Overlay & Yellow Strip) */}
            <div className="relative">

              {/* Framed Retro Camera Badge (Strategically pairs with house badge on real estate card) */}
              <div className="absolute -top-5 -left-3 z-30 pointer-events-none drop-shadow-lg">
                <div className="bg-white/95 border-2 border-black p-1.5 rounded-2xl shadow-md rotate-[4deg]">
                  <img src="/camera.png" alt="Photography" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
                </div>
              </div>

              {/* Floating Sparkles Badge on Top-Right Corner of Portrait Card */}
              <div className="absolute -top-4 -right-3 z-30 pointer-events-none drop-shadow-md">
                <img src="/sparkles.svg" alt="" className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>

              <div className="border-2 border-black bg-white chamfer-card-tl overflow-hidden shadow-md relative flex">

                {/* Image Container with Dark Bottom Overlay */}
                <div className="relative w-full aspect-4/5 sm:aspect-3/4 max-h-[350px] overflow-hidden bg-neutral-100">
                  <img
                    src="/hero1.jpg"
                    alt="Aanuoluwapo Ajoke Oreoluwa Koleosho"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />

                  {/* Overlaid Title & Name Badge on Portrait Photo */}
                  <div className="absolute bottom-3.5 left-3.5 right-3 text-white z-10 flex flex-col gap-0.5">
                    <div className="text-[9.5px] font-bold uppercase tracking-widest text-accent-yellow flex items-center gap-1">
                      <Camera size={12} weight="bold" />
                      <span>Creative Direction</span>
                    </div>
                    <span className="text-xs sm:text-sm font-bold tracking-tight text-white drop-shadow-sm">
                      Aanuoluwapo Ajoke Oreoluwa Koleosho
                    </span>
                  </div>
                </div>

                {/* Vertical Yellow Accent Strip on Right Edge */}
                <div className="w-7 sm:w-8 bg-accent-yellow border-l-2 border-black flex flex-col items-center justify-between py-3 shrink-0">
                  <div className="flex flex-col items-center gap-0.5">
                    <Star size={10} weight="fill" className="text-black" />
                    <Star size={10} weight="fill" className="text-black" />
                  </div>
                  <span className="text-[8.5px] font-black uppercase tracking-widest text-black [writing-mode:vertical-lr] rotate-180">
                    PORTRAITS
                  </span>
                  <ArrowUpRight size={12} weight="bold" className="text-black" />
                </div>
              </div>
            </div>

            {/* Bottom Right Info Box (Space-Efficient Tabbed Card) */}
            <div className="bg-white border-2 border-black rounded-2xl p-4 sm:p-5 shadow-md relative z-20">

              {/* Header */}
              <div className="flex items-center justify-between mb-2 border-b border-black/10 pb-1.5">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-display-title font-bold text-xs uppercase tracking-wider text-ink">
                    Aanuore
                  </h3>
                </div>
                <div className="bg-black text-white px-2 py-0.5 rounded-full text-[8.5px] font-bold tracking-widest uppercase">
                  What Do We Do?
                </div>
              </div>

              {/* Subtext description */}
              <p className="text-[11px] sm:text-xs text-ink leading-relaxed font-medium mb-3.5">
                We transform ideas into compelling stories, brands into experiences, and opportunities into connections.
              </p>

              {/* Action Buttons & Icons */}
              <div className="flex items-center justify-between gap-2 pt-0.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shadow-xs">
                    <Camera size={12} weight="bold" />
                  </div>
                  <div className="w-6 h-6 rounded-full bg-accent-purple text-white flex items-center justify-center shadow-xs">
                    <House size={12} weight="bold" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="#work"
                    className="bg-black hover:bg-accent-purple text-white text-[11px] font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <span>Explore</span>
                    <ArrowRight size={13} weight="bold" />
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      {/* Bottom Padding */}
      <div className="h-3 sm:h-5 w-full" />

    </div>
  );
}
