import React, { useState } from 'react';
import { List, X, ArrowUpRight } from '@phosphor-icons/react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flat-nav sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-14 sm:h-16 flex items-center justify-between">

        {/* Brand */}
        <a href="#hero" className="flex flex-col leading-none group">
          <span className="font-display-title font-bold text-base sm:text-lg uppercase tracking-tight text-ink group-hover:text-accent-purple transition-colors">
            aanuore
          </span>
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-ink-muted font-sans font-medium">
            Media &amp; Real Estate
          </span>
        </a>

        {/* Nav links desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {['Work', 'Real Estate', 'About', 'Services', 'Contact'].map((item) => (
            <a
              key={item}
              href={'#' + item.toLowerCase().replace(' ', '')}
              className="font-display-title text-[11px] uppercase tracking-[0.2em] font-medium text-ink-muted hover:text-ink transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* CTA desktop */}
        <a
          href="#contact"
          className="hidden sm:flex items-center gap-1.5 bg-ink text-paper font-display-title text-[11px] uppercase tracking-[0.15em] px-4 py-2.5 rounded-sm hover:bg-accent-purple transition-colors"
        >
          Work With Us
          <ArrowUpRight size={13} weight="bold" />
        </a>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="md:hidden text-ink p-1"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-paper border-t border-black/10 px-5 py-6 flex flex-col gap-4">
          {['Work', 'Real Estate', 'About', 'Services', 'Contact'].map((item) => (
            <a
              key={item}
              href={'#' + item.toLowerCase().replace(' ', '')}
              onClick={() => setOpen(false)}
              className="font-display-title text-sm uppercase tracking-[0.2em] font-medium text-ink border-b border-black/10 pb-4 flex items-center justify-between"
            >
              {item}
              <ArrowUpRight size={14} weight="bold" className="text-ink-muted" />
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 bg-ink text-paper font-display-title text-sm uppercase tracking-[0.15em] px-5 py-3.5 rounded-sm text-center hover:bg-accent-purple transition-colors"
          >
            Work With Us
          </a>
        </div>
      )}
    </header>
  );
}
