import React from 'react';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import WorkSection from './components/WorkSection';
import RealEstateSection from './components/RealEstateSection';
import ContactSection from './components/ContactSection';
import { ArrowUp, WhatsappLogo, EnvelopeSimple, PhoneCall } from '@phosphor-icons/react';

export default function App() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#ede9df] text-ink selection:bg-accent-purple selection:text-white">
      <main className="w-full">
        <Hero />
        <AboutSection />
        <WorkSection />
        <RealEstateSection />
        <ContactSection />
      </main>

      {/* ── RICH FOOTER ── */}
      <footer className="py-10 px-5 sm:px-10 border-t-2 border-black/15 bg-[#ede9df]">
        <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Name */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <img src="/aanuore-logo.png" alt="Aanuore" className="h-6 w-auto object-contain" />
              <span className="font-bold text-lg text-ink font-display-title">
                aanuore
              </span>
            </div>
            <span className="text-xs font-bold text-ink-muted">
              Aanuoluwapo Ajoke Oreoluwa Koleosho
            </span>
          </div>

          {/* Quick Contact Action Buttons */}
          <div className="flex items-center gap-3 text-xs font-bold text-ink flex-wrap justify-center">
            <a 
              href="https://wa.me/2348022218971" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-accent-purple transition-colors bg-white px-3.5 py-1.5 rounded-full border border-black/15 shadow-2xs hover-glow-subtle"
            >
              <WhatsappLogo size={16} weight="fill" className="text-[#25D366]" />
              <span>WhatsApp Direct</span>
            </a>
            <a 
              href="mailto:anuoluwapokoleosho5@gmail.com" 
              className="flex items-center gap-1.5 hover:text-accent-purple transition-colors bg-white px-3.5 py-1.5 rounded-full border border-black/15 shadow-2xs hover-glow-subtle"
            >
              <EnvelopeSimple size={16} weight="bold" className="text-accent-purple" />
              <span>Send An Email</span>
            </a>
            <a 
              href="tel:+2348022218971" 
              className="flex items-center gap-1.5 hover:text-accent-purple transition-colors bg-white px-3.5 py-1.5 rounded-full border border-black/15 shadow-2xs hover-glow-subtle"
            >
              <PhoneCall size={15} weight="bold" className="text-black" />
              <span>Direct Call</span>
            </a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-black hover:bg-accent-yellow hover:text-black text-white flex items-center justify-center transition-all cursor-pointer shadow-sm border-2 border-black active:scale-95"
            aria-label="Scroll to top"
            title="Back to Top"
          >
            <ArrowUp size={16} weight="bold" />
          </button>

        </div>

        <div className="max-w-[1360px] mx-auto mt-6 pt-6 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-ink-muted text-center sm:text-left">
          <span>&copy; {new Date().getFullYear()} Aanuore. All rights reserved.</span>
          <span>Creating. Communicating. Connecting.</span>
        </div>
      </footer>
    </div>
  );
}
