import React, { useState } from 'react';
import {
  Sparkle,
  WhatsappLogo,
  EnvelopeSimple,
  PhoneCall,
  ArrowUpRight,
  PaperPlaneTilt,
  CheckCircle
} from '@phosphor-icons/react';

export default function ContactSection() {
  const [selectedService, setSelectedService] = useState('Creative Media');
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const whatsappUrl = `https://wa.me/2348022218971?text=${encodeURIComponent("Hello Aanuore, I would like to inquire about working together.")}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedMessage = `Hello Aanuore,\n\nName: ${formData.name || 'Client'}\nService: ${selectedService}\nContact: ${formData.contact || 'N/A'}\n\nMessage:\n${formData.message || 'I would like to discuss a project with Aanuore.'}`;

    window.open(`https://wa.me/2348022218971?text=${encodeURIComponent(formattedMessage)}`, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="w-full bg-[#ede9df] border-t-2 border-black/15 relative">

      {/* Decorative Sparkles */}
      <div className="absolute top-8 right-8 pointer-events-none opacity-40 hidden sm:block">
        <img src="/sparkles.svg" alt="" className="w-14 h-14" />
      </div>

      <div className="max-w-[1360px] mx-auto">

        {/* ── MAIN 2-COLUMN CONTACT GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-black/15">

          {/* Left Column: Direct Channels & Narrative (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-10 md:p-12 lg:border-r border-b lg:border-b-0 border-black/15 flex flex-col justify-between">
            <div>

              {/* Terminal Style Tag */}
              <div className="text-[11px] font-mono font-bold tracking-widest text-ink-muted uppercase mb-3">
                DIRECT CHANNELS
              </div>

              {/* Headline */}
              <h2 className="font-condensed text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-ink uppercase leading-[0.88] tracking-tight mb-4">
                GET IN TOUCH.
              </h2>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-black bg-white text-[10px] font-black uppercase tracking-wider text-ink mb-6 shadow-2xs">
                <span>AVAILABLE FOR PROJECTS &amp; CONSULTATIONS</span>
              </div>

              <p className="text-sm sm:text-base text-ink font-medium leading-relaxed mb-8 max-w-md">
                Open to creative media commissions, on-site property acquisitions, and strategic brand collaborations. Let us create work that connects.
              </p>

              {/* Direct Action Channel Links */}
              <div className="space-y-2.5">

                {/* WhatsApp Direct */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full p-4 bg-white border-2 border-black rounded-2xl flex items-center justify-between group hover-glow cursor-pointer transition-all shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                      <WhatsappLogo size={22} weight="fill" />
                    </div>
                    <div>
                      <span className="font-bold text-xs sm:text-sm text-ink block leading-tight">
                        Chat on WhatsApp
                      </span>
                      <span className="text-[10px] text-ink-muted font-medium">
                        Fastest response
                      </span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-black text-white group-hover:bg-accent-yellow group-hover:text-black flex items-center justify-center transition-colors">
                    <ArrowUpRight size={14} weight="bold" />
                  </div>
                </a>

                {/* Email Direct */}
                <a
                  href="mailto:anuoluwapokoleosho5@gmail.com"
                  className="w-full p-4 bg-white border-2 border-black rounded-2xl flex items-center justify-between group hover-glow cursor-pointer transition-all shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent-purple/10 border border-accent-purple/30 flex items-center justify-center text-accent-purple group-hover:bg-accent-purple group-hover:text-white transition-colors">
                      <EnvelopeSimple size={20} weight="bold" />
                    </div>
                    <div>
                      <span className="font-bold text-xs sm:text-sm text-ink block leading-tight">
                        Send An Email
                      </span>
                      <span className="text-[10px] text-ink-muted font-medium">
                        Official proposals &amp; briefs
                      </span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-black text-white group-hover:bg-accent-purple flex items-center justify-center transition-colors">
                    <ArrowUpRight size={14} weight="bold" />
                  </div>
                </a>

                {/* Phone Call */}
                <a
                  href="tel:+2348022218971"
                  className="w-full p-4 bg-white border-2 border-black rounded-2xl flex items-center justify-between group hover-glow cursor-pointer transition-all shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-black/5 border border-black/20 flex items-center justify-center text-black group-hover:bg-accent-yellow group-hover:text-black transition-colors">
                      <PhoneCall size={20} weight="bold" />
                    </div>
                    <div>
                      <span className="font-bold text-xs sm:text-sm text-ink block leading-tight">
                        Direct Phone Call
                      </span>
                      <span className="text-[10px] text-ink-muted font-medium">
                        Voice &amp; urgent appointments
                      </span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-black text-white group-hover:bg-accent-yellow group-hover:text-black flex items-center justify-center transition-colors">
                    <ArrowUpRight size={14} weight="bold" />
                  </div>
                </a>

              </div>

            </div>

            <div className="mt-8 pt-4 border-t border-black/10 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-ink-muted">
              <span>Nigeria</span>
            </div>

          </div>

          {/* Right Column: Clean Editorial Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 bg-white flex flex-col justify-center">

            <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">

              {/* Service Selection Pills */}
              <div>
                <label className="block text-[11px] font-mono font-bold tracking-widest text-ink-muted uppercase mb-2">
                  SELECT SERVICE
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Creative Media',
                    'Real Estate Advisory',
                    'Brand Storytelling',
                    'On-Site Tour'
                  ].map((srv) => (
                    <button
                      type="button"
                      key={srv}
                      onClick={() => setSelectedService(srv)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border-2 border-black ${selectedService === srv
                        ? 'bg-black text-white shadow-xs'
                        : 'bg-[#faf8f2] text-ink hover:bg-accent-yellow'
                        }`}
                    >
                      {srv}
                    </button>
                  ))}
                </div>
              </div>

              {/* Your Name */}
              <div>
                <label className="block text-[11px] font-mono font-bold tracking-widest text-ink-muted uppercase mb-1.5">
                  YOUR NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="What do I call you?"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#faf8f2] border-2 border-black rounded-xl px-4 py-3 text-xs sm:text-sm text-ink focus:outline-none transition-all hover-glow-subtle"
                />
              </div>

              {/* Phone / Email Contact */}
              <div>
                <label className="block text-[11px] font-mono font-bold tracking-widest text-ink-muted uppercase mb-1.5">
                  YOUR CONTACT (PHONE OR EMAIL)
                </label>
                <input
                  type="text"
                  placeholder="Where should we reply?"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full bg-[#faf8f2] border-2 border-black rounded-xl px-4 py-3 text-xs sm:text-sm text-ink focus:outline-none transition-all hover-glow-subtle"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-[11px] font-mono font-bold tracking-widest text-ink-muted uppercase mb-1.5">
                  MESSAGE
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Say what you need. Be direct."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#faf8f2] border-2 border-black rounded-xl p-4 text-xs sm:text-sm placeholder:text-neutral-400 focus:outline-none transition-all hover-glow-subtle resize-none"
                />
              </div>

              {/* Submit Transmit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-black hover:bg-accent-yellow hover:text-black text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border-2 border-black active:scale-[0.98] hover-glow"
              >
                <PaperPlaneTilt size={16} weight="bold" />
                <span>TRANSMIT MESSAGE</span>
              </button>

              {submitted && (
                <div className="p-3 bg-[#25D366]/10 border-2 border-[#25D366] rounded-xl flex items-center gap-2 text-xs font-bold text-[#128C7E]">
                  <CheckCircle size={18} weight="fill" />
                  <span>Message generated. Opening WhatsApp window...</span>
                </div>
              )}

            </form>

          </div>

        </div>

      </div>

    </section>
  );
}
