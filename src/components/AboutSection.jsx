import React from 'react';
import {
  ArrowRight,
  Sparkle,
  CheckCircle
} from '@phosphor-icons/react';

export default function AboutSection() {
  const coreBeliefs = [
    'A good idea deserves good communication.',
    'A good brand deserves good storytelling.',
    'A good property deserves good presentation.',
    'And every opportunity deserves to be seen.'
  ];

  return (
    <section id="about" className="w-full bg-[#ede9df] border-t-2 border-black/15 relative">

      {/* Decorative Sparkles */}
      <div className="absolute top-10 right-8 pointer-events-none opacity-40 hidden sm:block">
        <img src="/sparkles.svg" alt="" className="w-14 h-14" />
      </div>

      <div className="max-w-[1360px] mx-auto">

        {/* ── ROW 1: LARGE STATEMENT & TIGHT PORTRAIT PHOTO ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-black/15">

          {/* Left Cell: Headline & Brand Narrative (8 cols) */}
          <div className="lg:col-span-8 p-8 sm:p-12 md:p-14 lg:border-r border-black/15 flex flex-col justify-center">
            <div>
              {/* Category Tag (No naked dot) */}
              <div className="flex items-center gap-2 text-xs font-bold text-ink-muted uppercase tracking-[0.25em] mb-5">
                <Sparkle size={13} weight="fill" className="text-accent-purple" />
                <span>About Aanuore</span>
                <span className="text-accent-purple font-black">/</span>
                <span>Vision &amp; Craft</span>
              </div>

              {/* Giant Headline with dance.svg inline */}
              <h2 className="font-condensed text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-ink uppercase leading-[0.86] tracking-tight mb-6">
                <span className="inline-flex items-center gap-4 flex-wrap">
                  <span>STORYTELLING.</span>
                  <img
                    src="/dance.svg"
                    alt=""
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 inline-block object-contain drop-shadow-xs -rotate-6"
                  />
                </span>
                <br />
                CREATIVITY &amp; OPPORTUNITY.
              </h2>

              {/* Narrative Paragraphs */}
              <div className="space-y-4 max-w-2xl text-base sm:text-lg text-ink font-medium leading-relaxed">
                <p>
                  Aanuore is a creative, media, and real estate brand built around storytelling, communication, creativity, and opportunity.
                </p>
                <p className="text-ink-muted font-normal text-sm sm:text-base">
                  We help individuals, businesses, organizations, and property brands communicate their stories through compelling visuals, strategic digital content, and purposeful marketing.
                </p>
                <p className="text-ink-muted font-normal text-sm sm:text-base">
                  From photography and videography to social media management, content creation, and real estate consultancy, Aanuore brings creativity and strategy together to create work that connects.
                </p>
              </div>
            </div>
          </div>

          {/* Right Cell: Portrait Photo of Aanuoluwapo (4 cols - Snug with No Dead Space) */}
          <div className="lg:col-span-4 p-6 sm:p-8 flex items-center justify-center bg-[#f2eee4]">

            <div className="relative group w-full max-w-xs sm:max-w-sm">

              {/* Camera Badge on top-left of photo */}
              <div className="absolute -top-4 -left-3 z-20 pointer-events-none drop-shadow-md">
                <div className="bg-white border-2 border-black p-1.5 rounded-2xl shadow-sm -rotate-6">
                  <img src="/camera1.svg" alt="Creative Lead" className="w-8 h-8 object-contain" />
                </div>
              </div>

              {/* Photo Card with Dark Bottom Overlay */}
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl border-2 border-black bg-neutral-200 shadow-md">
                <img
                  src="/about.jpg"
                  alt="Aanuoluwapo Ajoke Oreoluwa Koleosho"
                  className="w-full h-full object-cover object-top group-hover:scale-104 transition-transform duration-500"
                />

                {/* Dark gradient overlay for readability */}
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Overlaid Label on Image */}
                <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-accent-yellow mb-1">
                    Creative Direction &amp; Real Estate
                  </div>
                  <span className="text-sm sm:text-base font-bold tracking-tight text-white block">
                    Aanuoluwapo Ajoke Oreoluwa Koleosho
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ── ROW 2: DYNAMIC CASCADING BENTO GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 border-b border-black/15 bg-white">

          {/* Card 1: Creative Media (Large Spanning Left Block - 7 cols) */}
          <div className="md:col-span-7 p-8 sm:p-12 md:border-r border-b border-black/15 flex flex-col justify-between group hover:bg-[#faf7f0] transition-colors relative">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-white border-2 border-black/15 p-3 flex items-center justify-center group-hover:bg-accent-yellow transition-colors shadow-sm">
                  <img src="/camera2.svg" alt="Creative Media" className="w-8 h-8 object-contain" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent-purple bg-accent-purple/10 px-3 py-1 rounded-full">
                    VISUAL ARTS
                  </span>
                  <div className="w-7 h-7 rounded-xl bg-canvas border border-black/15 p-1 hidden sm:flex items-center justify-center">
                    <img src="/camera3.svg" alt="" className="w-4 h-4 object-contain" />
                  </div>
                </div>
              </div>

              <h3 className="font-display-title font-bold text-2xl sm:text-3xl text-ink mb-3 group-hover:text-accent-purple transition-colors">
                Creative Media
              </h3>
              <p className="text-sm sm:text-base text-ink-muted font-normal leading-relaxed max-w-xl">
                Photography, videography, video editing, and visual storytelling captured with precision, mood, and aesthetic intention.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-ink">
              <span>Studio &amp; Location Shoots</span>
              <span className="text-accent-purple font-black">/</span>
              <span>Editorial Direction</span>
            </div>
          </div>

          {/* Card 2: Cascading Polaroid Art & On-Location Showcase (5 cols) */}
          <div className="md:col-span-5 p-8 sm:p-10 flex flex-col items-center justify-center bg-[#f7f4ec] border-b border-black/15 relative overflow-hidden group">

            {/* Background Twist SVG Decoration */}
            <div className="absolute top-4 right-4 pointer-events-none opacity-40">
              <img src="/twist.svg" alt="" className="w-8 h-8" />
            </div>

            {/* Tilted Polaroid Art Frame */}
            <div className="relative w-44 sm:w-52 aspect-square rotate-3 group-hover:rotate-0 transition-transform duration-300">

              {/* Car SVG Badge On Top Corner of Polaroid */}
              <div className="absolute -top-4 -left-4 z-20 pointer-events-none drop-shadow-md">
                <div className="bg-accent-yellow border-2 border-black p-1.5 rounded-2xl shadow-sm -rotate-12">
                  <img src="/car2.svg" alt="On Location" className="w-7 h-7 object-contain" />
                </div>
              </div>

              {/* The Polaroid Frame */}
              <img
                src="/polaroid frame.png"
                alt="Polaroid Art"
                className="w-full h-full object-contain drop-shadow-lg"
              />

              {/* Sparkles on Bottom-Right */}
              <div className="absolute -bottom-3 -right-3 z-20 pointer-events-none drop-shadow-xs">
                <img src="/sparkles.svg" alt="" className="w-8 h-8" />
              </div>
            </div>

            <span className="mt-4 text-[11px] font-bold uppercase tracking-widest text-ink-muted">
              On Location &amp; Property Tours
            </span>
          </div>

          {/* Card 3: Content & Digital Media (4 cols) */}
          <div className="md:col-span-4 p-8 sm:p-10 md:border-r border-b md:border-b-0 border-black/15 flex flex-col justify-between group hover:bg-[#faf7f0] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-white border-2 border-black/15 p-2.5 flex items-center justify-center group-hover:bg-accent-yellow transition-colors shadow-2xs">
                  <img src="/think.svg" alt="Digital Media" className="w-7 h-7 object-contain" />
                </div>
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-accent-purple bg-accent-purple/10 px-2.5 py-0.5 rounded-full">
                  DIGITAL
                </span>
              </div>

              <h3 className="font-display-title font-bold text-xl text-ink mb-2 group-hover:text-accent-purple transition-colors">
                Content &amp; Digital Media
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted font-normal leading-relaxed">
                Content creation, social media management, digital marketing, and strategic digital brand communication.
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-black/10 text-[11px] font-bold uppercase tracking-wider text-ink-muted">
              Organic Reach &amp; Strategy
            </div>
          </div>

          {/* Card 4: Real Estate & Properties (4 cols) */}
          <div className="md:col-span-4 p-8 sm:p-10 md:border-r border-b md:border-b-0 border-black/15 flex flex-col justify-between group hover:bg-[#faf7f0] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-white border-2 border-black/15 p-2.5 flex items-center justify-center group-hover:bg-accent-yellow transition-colors shadow-2xs">
                  <img src="/house2.svg" alt="Real Estate" className="w-7 h-7 object-contain" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-accent-purple bg-accent-purple/10 px-2.5 py-0.5 rounded-full">
                    REAL ESTATE
                  </span>
                </div>
              </div>

              <h3 className="font-display-title font-bold text-xl text-ink mb-2 group-hover:text-accent-purple transition-colors">
                Real Estate &amp; Properties
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted font-normal leading-relaxed">
                Property marketing, real estate consultancy, architectural imagery, and connecting clients with valuable spaces.
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-black/10 text-[11px] font-bold uppercase tracking-wider text-ink-muted">
              Consultancy &amp; Spaces
            </div>
          </div>

          {/* Card 5: Brand Storytelling (4 cols) */}
          <div className="md:col-span-4 p-8 sm:p-10 flex flex-col justify-between group hover:bg-[#faf7f0] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-white border-2 border-black/15 p-2.5 flex items-center justify-center group-hover:bg-accent-yellow transition-colors shadow-2xs">
                  <img src="/investment.svg" alt="Brand Storytelling" className="w-7 h-7 object-contain" />
                </div>
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-accent-purple bg-accent-purple/10 px-2.5 py-0.5 rounded-full">
                  GROWTH
                </span>
              </div>

              <h3 className="font-display-title font-bold text-xl text-ink mb-2 group-hover:text-accent-purple transition-colors">
                Brand Storytelling
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted font-normal leading-relaxed">
                Helping brands communicate who they are, what they offer, and why their audience should care and connect.
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-black/10 text-[11px] font-bold uppercase tracking-wider text-ink-muted">
              Positioning &amp; Voice
            </div>
          </div>

        </div>

        {/* ── ROW 3: SPACIOUS LIGHT MANIFESTO BLOCK ── */}
        <div className="p-6 sm:p-10 md:p-14">
          <div className="bg-white rounded-3xl p-8 sm:p-12 md:p-14 border-2 border-black shadow-lg relative overflow-hidden">

            {/* Top Accent Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 border-b-2 border-black/10 pb-5">
              <div className="flex items-center gap-2">
                <Sparkle size={15} weight="fill" className="text-accent-purple" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-ink">
                  WHY AANUORE?
                </span>
              </div>
              <span className="text-xs sm:text-sm text-ink-muted font-medium tracking-wide">
                Because presentation matters.
              </span>
            </div>

            {/* 4 Core Beliefs in 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10">
              {coreBeliefs.map((belief, idx) => (
                <div key={idx} className="bg-[#faf7f0] border-2 border-black/10 rounded-2xl p-5 sm:p-6 flex items-start gap-3.5 hover:border-black transition-colors">
                  <CheckCircle size={20} weight="fill" className="text-accent-purple shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-semibold text-ink leading-snug">
                    {belief}
                  </span>
                </div>
              ))}
            </div>

            {/* Closing Call to Action Row */}
            <div className="pt-6 border-t-2 border-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h3 className="font-condensed text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-ink leading-none mb-2">
                  LET US CREATE SOMETHING THAT MATTERS.
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted max-w-xl font-medium">
                  Whether you are looking for creative media, property marketing, or strategic brand communication, Aanuore is ready to work with you.
                </p>
              </div>

              <a
                href="#contact"
                className="bg-black hover:bg-accent-purple text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-3.5 rounded-full flex items-center gap-2 shadow-md transition-all duration-200 shrink-0 active:scale-95"
              >
                <span>Work With Us</span>
                <ArrowRight size={16} weight="bold" />
              </a>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
