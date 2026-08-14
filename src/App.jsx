import React from 'react';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';

export default function App() {
  return (
    <div className="min-h-screen bg-[#ede9df] text-ink selection:bg-accent-purple selection:text-white">
      <main className="w-full">
        <Hero />
        <AboutSection />
      </main>

      {/* Minimal Footer */}
      <footer className="py-8 px-6 border-t-2 border-black/10 text-center text-xs text-ink-muted bg-[#ede9df]">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-bold text-ink text-sm font-display-title">
            aanuore • Creating. Communicating. Connecting.
          </div>
          <div className="text-xs">
            Aanuoluwapo Ajoke Oreoluwa Koleoso All Rights Reserved
          </div>
        </div>
      </footer>
    </div>
  );
}
