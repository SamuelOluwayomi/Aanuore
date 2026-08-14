import React from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  House,
  Camera
} from '@phosphor-icons/react';

export default function AboutSection() {
  const pillars = [
    {
      title: 'Creative Media',
      description: 'Photography, videography, video editing, and visual storytelling captured with precision.',
      iconSvg: '/camera2.svg',
      tag: 'VISUAL ARTS'
    },
    {
      title: 'Content & Digital Media',
      description: 'Content creation, social media management, digital marketing, and strategic brand communication.',
      iconSvg: '/think.svg',
      tag: 'COMMUNICATION'
    },
    {
      title: 'Real Estate & Properties',
      description: 'Property marketing, real estate consultancy, architectural photography, and valuable investments.',
      iconSvg: '/house2.svg',
      tag: 'REAL ESTATE'
    },
    {
      title: 'Brand Storytelling',
      description: 'Helping brands communicate who they are, what they offer, and why people should care.',
      iconSvg: '/investment.svg',
      tag: 'GROWTH'
    }
  ];

  const coreBeliefs = [
    'A good idea deserves good communication.',
    'A good brand deserves good storytelling.',
    'A good property deserves good presentation.',
    'And every opportunity deserves to be seen.'
  ];

  return (
    <section id="about" className="w-full bg-[#ede9df] py-16 sm:py-24 px-4 sm:px-8 md:px-12 border-t-2 border-black/10 relative overflow-hidden">

      {/* Subtle Background Decorative Sparkles */}
      <div className="absolute top-12 right-8 pointer-events-none opacity-40 hidden sm:block">
        <img src="/sparkles.svg" alt="" className="w-16 h-16" />
      </div>

      <div className="max-w-[1360px] mx-auto">

        {/* ── SECTION HEADER (With dance.svg beside STORYTELLING.) ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16 border-b-2 border-black/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-ink-muted uppercase tracking-[0.25em] mb-3">
              <span className="w-2 h-2 rounded-full bg-accent-purple" />
              <span>About Aanuore</span>
              <span className="text-accent-purple">•</span>
              <span>Vision &amp; Craft</span>
            </div>

            <h2 className="font-condensed text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-ink uppercase leading-[0.88] tracking-tight">
              <span className="inline-flex items-center gap-3 sm:gap-4 flex-wrap">
                <span>STORYTELLING.</span>
                <img
                  src="/dance.svg"
                  alt=""
                  className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 inline-block object-contain drop-shadow-xs -rotate-6"
                />
              </span>
              <br />
              CREATIVITY &amp; OPPORTUNITY.
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm sm:text-base text-ink-muted font-medium leading-relaxed">
              A creative, media, and real estate brand built around purposeful communication, visual clarity, and lasting human connection.
            </p>
          </div>
        </div>

        {/* ── 2-COLUMN TOP SECTION: Photo & Philosophy + 4 Pillars ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12 sm:mb-16">

          {/* LEFT COLUMN: Polaroid Framed Portrait of Aanuoluwapo */}
          <div className="lg:col-span-5 flex flex-col items-center">

            <div className="relative w-full max-w-md group">

              {/* Top Left Floating Camera SVG Badge */}
              <div className="absolute -top-5 -left-4 z-30 pointer-events-none drop-shadow-lg">
                <div className="bg-white/95 border-2 border-black p-2 rounded-2xl shadow-md -rotate-6">
                  <img src="/camera1.svg" alt="Creative Lead" className="w-10 h-10 object-contain" />
                </div>
              </div>

              {/* Polaroid Frame Container */}
              <div className="bg-white border-2 border-black p-4 sm:p-5 pb-6 rounded-3xl shadow-xl">

                {/* Photo with dark bottom overlay */}
                <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-neutral-200">
                  <img
                    src="/about.jpg"
                    alt="Aanuoluwapo Ajoke Oreoluwa Koleoso"
                    className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-500"
                  />

                  {/* Dark gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* On-Image Label */}
                  <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-accent-yellow mb-1">
                      Creative Direction &amp; Real Estate
                    </div>
                    <span className="text-sm sm:text-base font-bold tracking-tight text-white block">
                      Aanuoluwapo Ajoke Oreoluwa Koleoso
                    </span>
                  </div>
                </div>

                {/* Polaroid Caption Area Below Photo */}
                <div className="pt-4 px-2 flex items-center justify-between">
                  <div>
                    <h3 className="font-display-title font-bold text-sm text-ink uppercase tracking-wide">
                      Aanuore Visionary
                    </h3>
                    <p className="text-xs text-ink-muted font-medium">
                      Founder &amp; Creative Strategist
                    </p>
                  </div>

                  <div className="w-9 h-9 rounded-full bg-[#111114] text-white flex items-center justify-center group-hover:bg-accent-purple transition-colors">
                    <ArrowUpRight size={16} weight="bold" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stat Pill Under Photo */}
            <div className="w-full max-w-md mt-6">
              <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-sm flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#111114] text-white flex items-center justify-center shrink-0">
                    <Camera size={20} weight="bold" className="text-accent-yellow" />
                  </div>
                  <div>
                    <span className="font-condensed text-2xl text-ink leading-none block">100%</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">Intentional Media</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-l-2 border-black/10 pl-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-purple text-white flex items-center justify-center shrink-0">
                    <House size={20} weight="bold" />
                  </div>
                  <div>
                    <span className="font-condensed text-2xl text-ink leading-none block">EXCELLENCE</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">Real Estate &amp; Spaces</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: The Story & 4 Pillars */}
          <div className="lg:col-span-7 flex flex-col gap-6">

            {/* Story Introduction Card */}
            <div className="bg-white border-2 border-black rounded-3xl p-6 sm:p-8 shadow-md relative">
              <div className="flex items-center justify-between mb-4 border-b border-black/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent-purple" />
                  <span className="font-display-title font-bold text-xs uppercase tracking-widest text-ink">
                    Our Philosophy
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest bg-black text-white px-2.5 py-0.5 rounded-full">
                  At Aanuore
                </span>
              </div>

              <p className="text-sm sm:text-base text-ink font-medium leading-relaxed mb-4">
                Aanuore is a creative, media, and real estate brand built around storytelling, communication, creativity, and opportunity.
              </p>
              <p className="text-sm sm:text-base text-ink-muted font-normal leading-relaxed mb-4">
                We help individuals, businesses, organizations, and property brands communicate their stories through compelling visuals, strategic digital content, and purposeful marketing.
              </p>
              <p className="text-sm sm:text-base text-ink-muted font-normal leading-relaxed">
                From photography and videography to social media management, content creation, and real estate consultancy, Aanuore brings creativity and strategy together to create work that connects.
              </p>
            </div>

            {/* What We Do: 4 Core Pillars Grid */}
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="font-condensed text-3xl sm:text-4xl text-ink uppercase tracking-tight">
                  WHAT WE DO
                </h3>
                <span className="text-xs font-bold text-ink-muted uppercase tracking-widest">
                  Core Capabilities
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {pillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="bg-white border-2 border-black rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <div className="w-10 h-10 rounded-xl bg-canvas border border-black/15 p-1.5 flex items-center justify-center group-hover:bg-accent-yellow transition-colors">
                          <img src={pillar.iconSvg} alt="" className="w-6 h-6 object-contain" />
                        </div>
                        <span className="text-[9px] font-extrabold uppercase tracking-widest text-accent-purple bg-accent-purple/10 px-2 py-0.5 rounded-full">
                          {pillar.tag}
                        </span>
                      </div>

                      <h4 className="font-display-title font-bold text-sm text-ink mb-1 group-hover:text-accent-purple transition-colors">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-ink-muted font-medium leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* ── BOTTOM SECTION: DARK MANIFESTO BOX + POLAROID WITH CAR SVG ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Dark Manifesto Box (8 columns) */}
          <div className="lg:col-span-8 bg-[#111114] text-white rounded-3xl p-6 sm:p-8 md:p-10 border-2 border-black shadow-2xl relative overflow-hidden">

            {/* Top Accent Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-white/15 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-accent-yellow" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-accent-yellow">
                  WHY AANUORE?
                </span>
              </div>
              <span className="text-xs sm:text-sm text-white/70 font-medium tracking-wide">
                Because presentation matters.
              </span>
            </div>

            {/* 4 Core Beliefs in Balanced Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
              {coreBeliefs.map((belief, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-3.5 sm:p-4 flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full bg-accent-purple flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-white/90 leading-snug">
                    {belief}
                  </span>
                </div>
              ))}
            </div>

            {/* Closing Banner Call to Action */}
            <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-condensed text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-white leading-none mb-1">
                  LET US CREATE SOMETHING THAT MATTERS.
                </h4>
                <p className="text-xs text-white/70 max-w-md">
                  Ready to bring your visuals, story, or property to life.
                </p>
              </div>

              <a
                href="#contact"
                className="bg-accent-yellow hover:bg-white text-black font-bold text-xs uppercase tracking-wider px-7 py-3 rounded-full flex items-center gap-2 shadow-lg transition-all duration-200 shrink-0 active:scale-95"
              >
                <span>Work With Us</span>
                <ArrowRight size={15} weight="bold" />
              </a>
            </div>

          </div>

          {/* Polaroid Frame PNG with On-Location Image & Car SVG Badge on Top (4 columns) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="relative w-64 sm:w-72 aspect-square group">

              {/* Tilted Polaroid Frame Container */}
              <div className="relative w-full h-full rotate-3 group-hover:rotate-0 transition-transform duration-300">

                {/* Polaroid Frame PNG on Top */}
                <img
                  src="/polaroid frame.png"
                  alt="Polaroid Frame"
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-xl z-10"
                />

                {/* Car SVG Badge On Top of Polaroid */}
                <div className="absolute -top-5 -left-4 z-20 pointer-events-none drop-shadow-lg">
                  <div className="bg-accent-yellow border-2 border-black p-2 rounded-2xl shadow-md -rotate-12">
                    <img src="/car2.svg" alt="Tours &amp; Travel" className="w-10 h-10 object-contain" />
                  </div>
                </div>

                {/* Sparkles on corner */}
                <div className="absolute -bottom-3 -right-3 z-20 pointer-events-none drop-shadow-md">
                  <img src="/sparkles.svg" alt="" className="w-9 h-9" />
                </div>

              </div>

              <div className="mt-3 text-center">
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
