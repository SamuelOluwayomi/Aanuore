import React from 'react';
import {
  ArrowRight,
  Sparkle,
  CheckCircle
} from '@phosphor-icons/react';

export default function AboutSection() {
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
          <div className="lg:col-span-8 p-5 sm:p-10 md:p-14 lg:border-r border-black/15 flex flex-col justify-center">
            <div>
              {/* Category Tag (No naked dot) */}
              <div className="flex items-center gap-2 text-xs font-bold text-ink-muted uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-4 sm:mb-5">
                <Sparkle size={13} weight="fill" className="text-accent-purple" />
                <span>About Aanuore</span>
                <span className="text-accent-purple font-black">/</span>
                <span>Vision &amp; Craft</span>
              </div>

              {/* Giant Headline with dance.svg inline */}
              <h2 className="font-condensed text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-ink uppercase leading-[0.88] sm:leading-[0.86] tracking-tight mb-5 sm:mb-6">
                <span className="inline-flex items-center gap-2 sm:gap-4 flex-wrap">
                  <span>STORYTELLING.</span>
                  <img
                    src="/dance.svg"
                    alt=""
                    className="w-9 h-9 sm:w-16 sm:h-16 md:w-20 md:h-20 inline-block object-contain drop-shadow-xs -rotate-6"
                  />
                </span>
                <br />
                CREATIVITY &amp; OPPORTUNITY.
              </h2>

              {/* Narrative Paragraphs */}
              <div className="space-y-3 sm:space-y-4 max-w-2xl text-sm sm:text-lg text-ink font-medium leading-relaxed">
                <p>
                  Aanuore is a creative, media, and real estate brand built around storytelling, communication, creativity, and opportunity.
                </p>
                <p className="text-ink-muted font-normal text-xs sm:text-base">
                  We help individuals, businesses, organizations, and property brands communicate their stories through compelling visuals, strategic digital content, and purposeful marketing.
                </p>
                <p className="text-ink-muted font-normal text-xs sm:text-base">
                  From photography and videography to social media management, content creation, and real estate consultancy, Aanuore brings creativity and strategy together to create work that connects.
                </p>
              </div>
            </div>
          </div>

          {/* Right Cell: Portrait Photo of Aanuoluwapo (4 cols - Snug with No Dead Space) */}
          <div className="lg:col-span-4 p-4 sm:p-8 flex items-center justify-center bg-[#f2eee4]">

            <div className="relative group w-full max-w-xs sm:max-w-sm">

              {/* Camera Badge on top-left of photo */}
              <div className="absolute -top-3.5 -left-2.5 sm:-top-4 sm:-left-3 z-20 pointer-events-none drop-shadow-md">
                <div className="bg-white border-2 border-black p-1 sm:p-1.5 rounded-xl sm:rounded-2xl shadow-sm -rotate-6">
                  <img src="/camera1.svg" alt="Creative Lead" className="w-7 h-7 sm:w-8 sm:h-8 object-contain" />
                </div>
              </div>

              {/* Photo Card with Dark Bottom Overlay */}
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl border-2 border-black bg-neutral-200 shadow-md hover-glow cursor-pointer">
                <img
                  src="/about.jpg"
                  alt="Aanuoluwapo Ajoke Oreoluwa Koleosho"
                  className="w-full h-full object-cover object-top group-hover:scale-104 transition-transform duration-500"
                />

                {/* Dark gradient overlay for readability */}
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Overlaid Label on Image */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 sm:bottom-4 sm:left-4 sm:right-4 text-white z-10">
                  <div className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-widest text-accent-yellow mb-0.5 sm:mb-1">
                    Creative Direction &amp; Real Estate
                  </div>
                  <span className="text-xs sm:text-base font-bold tracking-tight text-white block">
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
          <div className="md:col-span-7 p-5 sm:p-10 md:p-12 md:border-r border-b border-black/15 flex flex-col justify-between group hover:bg-[#faf7f0] transition-colors relative">
            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border-2 border-black/15 p-2.5 sm:p-3 flex items-center justify-center group-hover:bg-accent-yellow transition-colors shadow-sm">
                  <img src="/camera2.svg" alt="Creative Media" className="w-7 h-7 sm:w-8 sm:h-8 object-contain" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-accent-purple bg-accent-purple/10 px-2.5 sm:px-3 py-1 rounded-full">
                    VISUAL ARTS
                  </span>
                  <div className="w-7 h-7 rounded-xl bg-canvas border border-black/15 p-1 hidden sm:flex items-center justify-center">
                    <img src="/camera3.svg" alt="" className="w-4 h-4 object-contain" />
                  </div>
                </div>
              </div>

              <h3 className="font-display-title font-bold text-xl sm:text-3xl text-ink mb-2 sm:mb-3 group-hover:text-accent-purple transition-colors">
                Creative Media
              </h3>
              <p className="text-xs sm:text-base text-ink-muted font-normal leading-relaxed max-w-xl">
                Photography, videography, video editing, and visual storytelling captured with precision, mood, and aesthetic intention.
              </p>
            </div>

            <div className="mt-6 sm:mt-8 flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-ink">
              <span>Studio &amp; Location Shoots</span>
              <span className="text-accent-purple font-black">/</span>
              <span>Editorial Direction</span>
            </div>
          </div>

          {/* Card 2: Cascading Polaroid Art & On-Location Showcase (5 cols) */}
          <div className="md:col-span-5 p-6 sm:p-10 flex flex-col items-center justify-center bg-[#f7f4ec] border-b border-black/15 relative overflow-hidden group">

            {/* Background Twist SVG Decoration */}
            <div className="absolute top-4 right-4 pointer-events-none opacity-40">
              <img src="/twist.svg" alt="" className="w-8 h-8" />
            </div>

            {/* Tilted Polaroid Art Frame with Static Angle & Purple Glow on Hover */}
            <div className="relative w-44 sm:w-56 aspect-square rotate-3 transition-all duration-300 group-hover:scale-[1.03] group-hover:drop-shadow-[0_12px_30px_rgba(124,58,237,0.35)]">

              {/* Car SVG Badge On Top Corner of Polaroid */}
              <div className="absolute -top-3.5 -left-3.5 sm:-top-4 sm:-left-4 z-20 pointer-events-none drop-shadow-md">
                <div className="bg-accent-yellow border-2 border-black p-1 sm:p-1.5 rounded-xl sm:rounded-2xl shadow-sm -rotate-12">
                  <img src="/car2.svg" alt="On Location" className="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
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
                <img src="/sparkles.svg" alt="" className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
            </div>
          </div>

          {/* Card 3: Content & Digital Media (4 cols) */}
          <div className="md:col-span-4 p-5 sm:p-8 md:p-10 md:border-r border-b md:border-b-0 border-black/15 flex flex-col justify-between group hover:bg-[#faf7f0] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-5">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border-2 border-black/15 p-2 sm:p-2.5 flex items-center justify-center group-hover:bg-accent-yellow transition-colors shadow-2xs">
                  <img src="/think.svg" alt="Digital Media" className="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
                </div>
                <span className="text-[8.5px] sm:text-[9px] font-extrabold uppercase tracking-widest text-accent-purple bg-accent-purple/10 px-2.5 py-0.5 rounded-full">
                  DIGITAL
                </span>
              </div>

              <h3 className="font-display-title font-bold text-lg sm:text-xl text-ink mb-1.5 sm:mb-2 group-hover:text-accent-purple transition-colors">
                Content &amp; Digital Media
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted font-normal leading-relaxed">
                Content creation, social media management, digital marketing, and strategic digital brand communication.
              </p>
            </div>

            <div className="mt-4 sm:mt-6 pt-3 border-t border-black/10 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-ink-muted">
              Organic Reach &amp; Strategy
            </div>
          </div>

          {/* Card 4: Real Estate & Properties (4 cols) */}
          <div className="md:col-span-4 p-5 sm:p-8 md:p-10 md:border-r border-b md:border-b-0 border-black/15 flex flex-col justify-between group hover:bg-[#faf7f0] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-5">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border-2 border-black/15 p-2 sm:p-2.5 flex items-center justify-center group-hover:bg-accent-yellow transition-colors shadow-2xs">
                  <img src="/house2.svg" alt="Real Estate" className="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[8.5px] sm:text-[9px] font-extrabold uppercase tracking-widest text-accent-purple bg-accent-purple/10 px-2.5 py-0.5 rounded-full">
                    REAL ESTATE
                  </span>
                </div>
              </div>

              <h3 className="font-display-title font-bold text-lg sm:text-xl text-ink mb-1.5 sm:mb-2 group-hover:text-accent-purple transition-colors">
                Real Estate &amp; Properties
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted font-normal leading-relaxed">
                Strategic property presentation, high-impact marketing, and connecting spaces with individuals and investors.
              </p>
            </div>

            <div className="mt-4 sm:mt-6 pt-3 border-t border-black/10 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-ink-muted">
              Spaces &amp; Investment
            </div>
          </div>

          {/* Card 5: Brand Storytelling (4 cols) */}
          <div className="md:col-span-4 p-5 sm:p-8 md:p-10 flex flex-col justify-between group hover:bg-[#faf7f0] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-5">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border-2 border-black/15 p-2 sm:p-2.5 flex items-center justify-center group-hover:bg-accent-yellow transition-colors shadow-2xs">
                  <img src="/twist.svg" alt="Storytelling" className="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
                </div>
                <span className="text-[8.5px] sm:text-[9px] font-extrabold uppercase tracking-widest text-accent-purple bg-accent-purple/10 px-2.5 py-0.5 rounded-full">
                  STORYTELLING
                </span>
              </div>

              <h3 className="font-display-title font-bold text-lg sm:text-xl text-ink mb-1.5 sm:mb-2 group-hover:text-accent-purple transition-colors">
                Brand Storytelling
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted font-normal leading-relaxed">
                Helping brands communicate who they are, what they offer, and why their audience should care and connect.
              </p>
            </div>

            <div className="mt-4 sm:mt-6 pt-3 border-t border-black/10 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-ink-muted">
              Positioning &amp; Voice
            </div>
          </div>

        </div>

        {/* ── ROW 3: CLOSING CALL TO ACTION BANNER ── */}
        <div className="p-4 sm:p-10 md:p-14">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 border-2 border-black shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover-glow">
            <div>
              <h3 className="font-condensed text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-ink leading-none mb-2">
                LET US CREATE SOMETHING THAT MATTERS.
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted max-w-xl font-medium">
                Whether you are looking for creative media, property marketing, or strategic brand communication, Aanuore is ready to work with you.
              </p>
            </div>

            <a
              href="mailto:anuoluwapokoleosho5@gmail.com?subject=Inquiry%20from%20Aanuore%20Website"
              className="bg-black hover:bg-accent-yellow hover:text-black text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-8 py-3.5 rounded-full flex items-center gap-2 shadow-md transition-all duration-200 shrink-0 active:scale-95 border-2 border-black cursor-pointer"
            >
              <span>Work With Us</span>
              <ArrowRight size={15} weight="bold" />
            </a>
          </div>
        </div>

      </div>

    </section>
  );
}
