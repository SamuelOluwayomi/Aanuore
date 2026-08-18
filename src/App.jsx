import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import WorkSection from './components/WorkSection';
import RealEstateSection from './components/RealEstateSection';
import ContactSection from './components/ContactSection';
import AdminDashboard from './components/AdminDashboard';
import {
  ArrowUp,
  WhatsappLogo,
  EnvelopeSimple,
  PhoneCall,
  LockKey,
  GithubLogo,
  XLogo,
  TelegramLogo,
  InstagramLogo,
  TiktokLogo,
  LinkedinLogo,
  FacebookLogo
} from '@phosphor-icons/react';

export default function App() {
  const [showAdmin, setShowAdmin] = useState(() => {
    return window.location.hash === '#admin' || window.location.pathname === '/admin';
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setShowAdmin(true);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseAdmin = () => {
    setShowAdmin(false);
    if (window.location.hash === '#admin') {
      history.replaceState(null, '', ' ');
    }
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
      <footer className="py-12 px-5 sm:px-10 border-t-2 border-black/15 bg-[#ede9df]">
        <div className="max-w-[1360px] mx-auto">
          
          {/* Main Content Row */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 pb-8">
            
            {/* Left: Brand Info, Socials & Contact Actions */}
            <div className="flex flex-col items-center lg:items-start gap-4">
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-2.5">
                  <img src="/aanuore-logo.png" alt="Aanuore" className="h-7 w-auto object-contain" />
                  <span className="font-bold text-2xl text-ink font-display-title">
                    aanuore
                  </span>
                </div>
                <span className="text-xs font-bold text-ink-muted block text-center lg:text-left mt-0.5">
                  Aanuoluwapo Ajoke Oreoluwa Koleosho
                </span>

                {/* Aanuore Social Media Links */}
                <div className="flex items-center gap-2 mt-2.5 justify-center lg:justify-start">
                  <a
                    href="https://www.instagram.com/aanuore_?igsh=azhsMWhrMW43NHF2&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-white border border-black/20 flex items-center justify-center hover:bg-[#E1306C] hover:text-white text-ink transition-all shadow-2xs hover-glow-subtle"
                    title="Instagram: @aanuore_"
                    aria-label="Instagram"
                  >
                    <InstagramLogo size={16} weight="bold" />
                  </a>
                  <a
                    href="https://x.com/aanuore?s=11"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-white border border-black/20 flex items-center justify-center hover:bg-black hover:text-white text-ink transition-all shadow-2xs hover-glow-subtle"
                    title="X: @aanuore"
                    aria-label="X / Twitter"
                  >
                    <XLogo size={14} weight="bold" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@aanuore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-white border border-black/20 flex items-center justify-center hover:bg-black hover:text-white text-ink transition-all shadow-2xs hover-glow-subtle"
                    title="TikTok: @aanuore"
                    aria-label="TikTok"
                  >
                    <TiktokLogo size={15} weight="bold" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/aanuoluwapoajokekoleosho01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-white border border-black/20 flex items-center justify-center hover:bg-[#0077B5] hover:text-white text-ink transition-all shadow-2xs hover-glow-subtle"
                    title="LinkedIn: Aanuoluwapo Koleosho"
                    aria-label="LinkedIn"
                  >
                    <LinkedinLogo size={15} weight="bold" />
                  </a>
                  <a
                    href="https://www.facebook.com/share/1BreyWU9s8/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-white border border-black/20 flex items-center justify-center hover:bg-[#1877F2] hover:text-white text-ink transition-all shadow-2xs hover-glow-subtle"
                    title="Facebook: Aanuore"
                    aria-label="Facebook"
                  >
                    <FacebookLogo size={16} weight="fill" />
                  </a>
                </div>
              </div>

              {/* Quick Contact Action Buttons */}
              <div className="flex items-center gap-2.5 text-xs font-bold text-ink flex-wrap justify-center lg:justify-start">
                <a
                  href="https://wa.me/2348022218971"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-accent-purple transition-colors bg-white px-3.5 py-1.5 rounded-full border border-black/15 shadow-2xs hover-glow-subtle"
                >
                  <WhatsappLogo size={15} weight="fill" className="text-[#25D366]" />
                  <span>WhatsApp Direct</span>
                </a>
                <a
                  href="mailto:anuoluwapokoleosho5@gmail.com"
                  className="flex items-center gap-1.5 hover:text-accent-purple transition-colors bg-white px-3.5 py-1.5 rounded-full border border-black/15 shadow-2xs hover-glow-subtle"
                >
                  <EnvelopeSimple size={15} weight="bold" className="text-accent-purple" />
                  <span>Send An Email</span>
                </a>
                <a
                  href="tel:+2348022218971"
                  className="flex items-center gap-1.5 hover:text-accent-purple transition-colors bg-white px-3.5 py-1.5 rounded-full border border-black/15 shadow-2xs hover-glow-subtle"
                >
                  <PhoneCall size={14} weight="bold" className="text-black" />
                  <span>Direct Call</span>
                </a>
              </div>
            </div>

            {/* Right: Developer Card + Back to Top */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto justify-center lg:justify-end">
              
              {/* Compact Neo-brutalist Developer Card */}
              <div className="bg-white border-2 border-black rounded-2xl p-3.5 sm:p-4 shadow-sm hover-glow transition-all max-w-sm sm:max-w-md w-full relative">
                <div className="flex items-center gap-3.5">
                  
                  {/* Samuel's Avatar */}
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-full border-2 border-black overflow-hidden bg-neutral-100 shadow-xs">
                      <img
                        src="/me.png"
                        alt="Samuel Oluwayomi"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>

                  {/* Developer Details & Contact Links */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="bg-accent-yellow border border-black text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded -rotate-2 inline-block shadow-2xs">
                        BUILT BY
                      </span>
                    </div>

                    <h4 className="font-bold text-xs sm:text-sm text-ink uppercase tracking-tight truncate font-display-title">
                      SAMUEL OLUWAYOMI
                    </h4>

                    {/* Social & Contact Links in 2x2 grid */}
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-1 text-[10.5px] font-mono text-ink-muted">
                      <a
                        href="https://github.com/SamuelOluwayomi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent-purple flex items-center gap-1 transition-colors truncate"
                      >
                        <GithubLogo size={12} weight="bold" className="shrink-0" />
                        <span className="truncate">SamuelOluwayomi</span>
                      </a>
                      <a
                        href="https://x.com/The_devsam"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent-purple flex items-center gap-1 transition-colors truncate"
                      >
                        <XLogo size={11} weight="bold" className="shrink-0" />
                        <span className="truncate">@The_devsam</span>
                      </a>
                      <a
                        href="https://t.me/DevSam01"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent-purple flex items-center gap-1 transition-colors truncate"
                      >
                        <TelegramLogo size={12} weight="fill" className="text-[#229ED9] shrink-0" />
                        <span className="truncate">@DevSam01</span>
                      </a>
                      <a
                        href="mailto:samuelfaith500@gmail.com"
                        className="hover:text-accent-purple flex items-center gap-1 transition-colors truncate"
                        title="samuelfaith500@gmail.com"
                      >
                        <EnvelopeSimple size={12} weight="bold" className="text-accent-purple shrink-0" />
                        <span className="truncate">Email Me</span>
                      </a>
                    </div>
                  </div>

                </div>
              </div>

              {/* Back to top button */}
              <button
                onClick={scrollToTop}
                className="w-11 h-11 rounded-2xl bg-black hover:bg-accent-yellow hover:text-black text-white flex items-center justify-center transition-all cursor-pointer shadow-sm border-2 border-black active:scale-95 shrink-0"
                aria-label="Scroll to top"
                title="Back to Top"
              >
                <ArrowUp size={18} weight="bold" />
              </button>

            </div>

          </div>

          {/* Bottom Copyright & Admin Status Bar */}
          <div className="pt-6 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-ink-muted text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} Aanuore. All rights reserved.</span>

            <div className="flex items-center gap-3">
              <span>Creating. Communicating. Connecting.</span>
              <span>•</span>
              <button
                onClick={() => setShowAdmin(true)}
                className="hover:text-black transition-colors cursor-pointer flex items-center gap-1 opacity-60 hover:opacity-100"
                title="Owner Portal"
              >
                <LockKey size={12} weight="fill" />
                <span>Studio Admin</span>
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* ── ADMIN STUDIO MODAL ── */}
      {showAdmin && <AdminDashboard onClose={handleCloseAdmin} />}
    </div>
  );
}
