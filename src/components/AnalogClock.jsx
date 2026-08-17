import React, { useState, useEffect } from 'react';
import { Sparkle } from '@phosphor-icons/react';

export default function AnalogClock({ compact = false }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;

  const timeString = time.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
    hour12: true 
  });

  return (
    <div className="inline-flex items-center gap-2.5 sm:gap-3.5 bg-white/95 border-2 border-black rounded-2xl sm:rounded-3xl p-2 sm:p-2.5 shadow-md select-none group hover-glow cursor-pointer transition-all duration-300">
      
      {/* ── PRECISION VECTOR SVG CLOCK DIAL ── */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0">
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full drop-shadow-2xs"
        >
          {/* Dial Face Background */}
          <circle cx="50" cy="50" r="48" fill="#faf8f2" stroke="#111114" strokeWidth="2.5" />
          
          {/* Subtle Inner Minute Track */}
          <circle cx="50" cy="50" r="43" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="0.75" />

          {/* 60 Minute Ticks */}
          {[...Array(60)].map((_, i) => {
            if (i % 5 === 0) return null; // Handled by hour ticks
            return (
              <line
                key={`min-${i}`}
                x1="50"
                y1="7"
                x2="50"
                y2="9.5"
                stroke="rgba(0,0,0,0.3)"
                strokeWidth="0.8"
                transform={`rotate(${i * 6} 50 50)`}
              />
            );
          })}

          {/* 12 Hour Ticks (Crisp & High Contrast) */}
          {[...Array(12)].map((_, i) => {
            const isCardinal = i % 3 === 0;
            return (
              <line
                key={`hour-${i}`}
                x1="50"
                y1="6"
                x2="50"
                y2={isCardinal ? "13" : "10"}
                stroke="#111114"
                strokeWidth={isCardinal ? "2.5" : "1.5"}
                strokeLinecap="round"
                transform={`rotate(${i * 30} 50 50)`}
              />
            );
          })}

          {/* Cardinal Numerals: 12, 3, 6, 9 */}
          <text x="50" y="23" textAnchor="middle" fontSize="7.5" fontWeight="900" fontFamily="Space Grotesk, sans-serif" fill="#111114">12</text>
          <text x="79" y="53" textAnchor="middle" fontSize="7.5" fontWeight="900" fontFamily="Space Grotesk, sans-serif" fill="#111114">3</text>
          <text x="50" y="82" textAnchor="middle" fontSize="7.5" fontWeight="900" fontFamily="Space Grotesk, sans-serif" fill="#111114">6</text>
          <text x="21" y="53" textAnchor="middle" fontSize="7.5" fontWeight="900" fontFamily="Space Grotesk, sans-serif" fill="#111114">9</text>

          {/* Brand Mark Text */}
          <text x="50" y="36" textAnchor="middle" fontSize="4.5" fontWeight="900" letterSpacing="0.8" fontFamily="Space Grotesk, sans-serif" fill="#111114" opacity="0.75">AANUORE</text>

          {/* Hour Hand */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="27"
            stroke="#111114"
            strokeWidth="3.2"
            strokeLinecap="round"
            transform={`rotate(${hourDeg} 50 50)`}
          />

          {/* Minute Hand */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="17"
            stroke="#111114"
            strokeWidth="2.2"
            strokeLinecap="round"
            transform={`rotate(${minuteDeg} 50 50)`}
          />

          {/* Second Hand with Counterbalance (Signature Purple) */}
          <line
            x1="50"
            y1="60"
            x2="50"
            y2="12"
            stroke="#7c3aed"
            strokeWidth="1.4"
            strokeLinecap="round"
            transform={`rotate(${secondDeg} 50 50)`}
          />
          {/* Counterbalance Disc on Second Hand Tail */}
          <circle
            cx="50"
            cy="58"
            r="2"
            fill="#7c3aed"
            transform={`rotate(${secondDeg} 50 50)`}
          />

          {/* Center Cap Disc */}
          <circle cx="50" cy="50" r="3.2" fill="#111114" stroke="#ffffff" strokeWidth="0.8" />
          <circle cx="50" cy="50" r="1.3" fill="#7c3aed" />
        </svg>
      </div>

      {/* ── DIGITAL READOUT & METADATA ── */}
      <div className="flex flex-col gap-0.5 sm:gap-1 pr-1">
        <div className="flex items-center gap-1 sm:gap-1.5">
          <Sparkle size={11} weight="fill" className="text-accent-yellow shrink-0" />
          <span className="font-mono text-[11px] sm:text-xs font-bold text-ink tracking-wider bg-canvas border border-black/15 px-2 py-0.5 rounded-full shadow-2xs">
            {timeString}
          </span>
        </div>
        
        <div className="flex items-center justify-between gap-1.5 text-[8.5px] sm:text-[9px] font-bold uppercase tracking-widest text-ink-muted">
          <span>Studio Time</span>
          <span className="text-[7.5px] bg-black text-white px-1.5 py-0.2 rounded-full font-sans font-bold leading-none">
            LIVE
          </span>
        </div>
      </div>

    </div>
  );
}
