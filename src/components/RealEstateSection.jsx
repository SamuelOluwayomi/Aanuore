import React, { useState } from 'react';
import {
  Sparkle,
  House,
  ArrowRight,
  CheckCircle,
  ArrowsOut,
  X,
  MapPin
} from '@phosphor-icons/react';

export default function RealEstateSection() {
  const [lightboxImage, setLightboxImage] = useState(null);

  return (
    <section id="realestate" className="w-full bg-[#ede9df] border-t-2 border-black/15 relative">

      {/* Decorative Sparkles */}
      <div className="absolute top-10 right-8 pointer-events-none opacity-40 hidden sm:block">
        <img src="/sparkles.svg" alt="" className="w-14 h-14" />
      </div>

      <div className="max-w-[1360px] mx-auto">

        {/* ── ROW 1: LARGE STATEMENT & ON-SITE PORTRAIT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-black/15">

          {/* Left Cell: Headline & Brand Narrative (8 cols) */}
          <div className="lg:col-span-8 p-5 sm:p-10 md:p-14 lg:border-r border-black/15 flex flex-col justify-center" data-reveal>
            <div>

              {/* Category Tag */}
              <div className="flex items-center gap-2 text-xs font-bold text-ink-muted uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-4 sm:mb-5">
                <Sparkle size={13} weight="fill" className="text-accent-purple" />
                <span>Real Estate Spotlight</span>
                <span className="text-accent-purple font-black">/</span>
                <span>Land &amp; Property Advisory</span>
              </div>

              {/* Giant Headline with estate-building.svg inline */}
              <h2 className="font-condensed text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-ink uppercase leading-[0.88] sm:leading-[0.86] tracking-tight mb-5 sm:mb-6">
                <span className="inline-flex items-center gap-2 sm:gap-4 flex-wrap">
                  <span>REAL ESTATE.</span>
                  <img
                    src="/estate-building.svg"
                    alt=""
                    className="w-8 h-8 sm:w-16 sm:h-16 md:w-20 md:h-20 inline-block object-contain drop-shadow-xs -rotate-6"
                  />
                </span>
                <br />
                SPACES &amp; WEALTH.
              </h2>

              {/* Narrative Paragraphs */}
              <div className="space-y-3 sm:space-y-4 max-w-2xl text-sm sm:text-lg text-ink font-medium leading-relaxed">
                <p>
                  Aanuore connects individuals, diaspora investors, and forward-thinking businesses with vetted lands, strategic property developments, and tangible capital growth.
                </p>
                <p className="text-ink-muted font-normal text-xs sm:text-base">
                  We combine rigorous on-ground site inspections with deep market intelligence to ensure every investment is secure, documented, and positioned for compounding value.
                </p>
                <p className="text-ink-muted font-normal text-xs sm:text-base">
                  From land banking and buy-to-resell schemes to prime commercial plots and structured income notes, we bring transparency and strategy to real estate.
                </p>
              </div>

            </div>
          </div>

          {/* Right Cell: Portrait Photo of Aanu on Site (4 cols - Snug with No Dead Space) */}
          <div className="lg:col-span-4 p-4 sm:p-8 flex items-center justify-center bg-[#f2eee4]" data-reveal data-reveal-delay="150">
            <div className="relative group w-full max-w-xs sm:max-w-sm">

              {/* Car Badge on top-left of photo */}
              <div className="absolute -top-3.5 -left-2.5 sm:-top-4 sm:-left-3 z-20 pointer-events-none drop-shadow-md">
                <div className="bg-accent-yellow border-2 border-black p-1 sm:p-1.5 rounded-xl sm:rounded-2xl shadow-sm -rotate-6">
                  <img src="/car2.svg" alt="On Site Inspection" className="w-7 h-7 sm:w-8 sm:h-8 object-contain" />
                </div>
              </div>

              {/* Photo Card with Dark Bottom Overlay */}
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl border-2 border-black bg-neutral-200 shadow-md">
                <img
                  src="/real estate/Aanuonsite.jpg"
                  alt="Aanuoluwapo on-site property inspection"
                  className="w-full h-full object-cover object-top group-hover:scale-104 transition-transform duration-500"
                />

                {/* Dark gradient overlay for readability */}
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Overlaid Label on Image */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 sm:bottom-4 sm:left-4 sm:right-4 text-white z-10">
                  <div className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-widest text-accent-yellow mb-0.5 sm:mb-1 flex items-center gap-1">
                    <MapPin size={12} weight="bold" />
                    <span>On-Site Ground Truth</span>
                  </div>
                  <span className="text-xs sm:text-base font-bold tracking-tight text-white block">
                    Aanuoluwapo Koleosho on Location
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ── ROW 2: DYNAMIC CASCADING BENTO GRID (Properties & Investments) ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 border-b border-black/15 bg-white">

          {/* Card 1: Buy To Resell Scheme (Large Spanning Left Block - 7 cols) */}
          <div className="md:col-span-7 p-5 sm:p-10 md:p-12 md:border-r border-b border-black/15 flex flex-col justify-between group hover:bg-[#faf7f0] transition-colors relative" data-reveal>
            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border-2 border-black/15 p-2.5 sm:p-3 flex items-center justify-center group-hover:bg-accent-yellow transition-colors shadow-sm">
                  <img src="/investment.svg" alt="Buy To Resell" className="w-7 h-7 sm:w-8 sm:h-8 object-contain" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-accent-purple bg-accent-purple/10 px-2.5 sm:px-3 py-1 rounded-full">
                    LAND BANKING
                  </span>
                  <div className="w-7 h-7 rounded-xl bg-canvas border border-black/15 p-1 hidden sm:flex items-center justify-center">
                    <img src="/sold.svg" alt="" className="w-4 h-4 object-contain" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center mb-4">
                <div
                  onClick={() => setLightboxImage('/real estate/Buytoresel.jpg')}
                  className="sm:col-span-5 relative aspect-4/3 rounded-xl border-2 border-black overflow-hidden bg-neutral-100 cursor-pointer shadow-xs group/img"
                >
                  <img
                    src="/real estate/Buytoresel.jpg"
                    alt="Buy to Resell Scheme"
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center shadow-md">
                      <ArrowsOut size={14} weight="bold" />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-7">
                  <h3 className="font-display-title font-bold text-xl sm:text-2xl text-ink mb-2 group-hover:text-accent-purple transition-colors">
                    Buy To Resell Scheme
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-muted font-normal leading-relaxed">
                    Strategic short-to-medium term land banking in emerging high-growth corridors engineered for compounding capital returns.
                  </p>
                </div>
              </div>

            </div>

            <div className="mt-4 sm:mt-6 pt-3 border-t border-black/10 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-ink">
              <span>Capital Multiplication</span>
              <span className="text-accent-purple font-black">/</span>
              <span>Guaranteed Liquidity Exit</span>
            </div>
          </div>

          {/* Card 2: On-Site Field Verification Showcase (5 cols) */}
          <div className="md:col-span-5 p-6 sm:p-10 flex flex-col items-center justify-center bg-[#f7f4ec] border-b border-black/15 relative overflow-hidden group" data-reveal data-reveal-delay="150">

            {/* Background Twist SVG Decoration */}
            <div className="absolute top-4 right-4 pointer-events-none opacity-40">
              <img src="/twist.svg" alt="" className="w-8 h-8" />
            </div>

            {/* Photo Card with Static Tilt and Purple Border Glow on Hover */}
            <div 
              onClick={() => setLightboxImage('/real estate/Aanuonsite1.jpg')}
              className="relative w-full max-w-xs sm:max-w-sm -rotate-2 group/site cursor-pointer transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Car SVG Badge Floating on Top-Left Corner (Outside overflow-hidden so it is never clipped) */}
              <div className="absolute -top-3.5 -left-3 z-30 pointer-events-none drop-shadow-md">
                <div className="bg-accent-yellow border-2 border-black p-1 sm:p-1.5 rounded-xl shadow-sm -rotate-6 flex items-center gap-1.5 px-2.5">
                  <img src="/car2.svg" alt="" className="w-5 h-5 object-contain" />
                  <span className="text-[9px] font-black uppercase tracking-wider text-black">GROUND TRUTH</span>
                </div>
              </div>

              {/* Image Container with Border & Glow on Hover */}
              <div className="relative aspect-16/10 rounded-2xl border-2 border-black overflow-hidden shadow-lg bg-white transition-all duration-300 group-hover/site:border-accent-purple group-hover/site:shadow-[0_0_30px_rgba(124,58,237,0.35)]">
                <img
                  src="/real estate/Aanuonsite1.jpg"
                  alt="On-Site Inspection"
                  className="w-full h-full object-cover group-hover/site:scale-104 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3.5 right-3.5 text-white z-10">
                  <span className="text-[9px] font-mono font-bold tracking-wider uppercase block text-accent-yellow mb-0.5">
                    FIELD INSPECTION &amp; SURVEY
                  </span>
                  <span className="text-xs sm:text-sm font-bold leading-snug block">
                    Topography, Access &amp; Beacon Verification
                  </span>
                </div>
              </div>
            </div>

            <span className="mt-4 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-ink-muted">
              Physical Site Verifications &amp; Beacon Checks
            </span>
          </div>

          {/* Card 3: Prime Estate Plots - Now Selling (4 cols) */}
          <div className="md:col-span-4 p-5 sm:p-8 md:p-10 md:border-r border-b md:border-b-0 border-black/15 flex flex-col justify-between group hover:bg-[#faf7f0] transition-colors" data-reveal>
            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-5">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border-2 border-black/15 p-2 sm:p-2.5 flex items-center justify-center group-hover:bg-accent-yellow transition-colors shadow-2xs">
                  <img src="/estate-building.svg" alt="Now Selling" className="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
                </div>
                <span className="text-[8.5px] sm:text-[9px] font-extrabold uppercase tracking-widest text-accent-purple bg-accent-purple/10 px-2.5 py-0.5 rounded-full">
                  NOW SELLING
                </span>
              </div>

              {/* Flyer Thumbnail */}
              <div
                onClick={() => setLightboxImage('/real estate/nowselling.jpg')}
                className="relative aspect-4/3 w-full rounded-xl border-2 border-black overflow-hidden mb-3 cursor-pointer bg-neutral-100 shadow-2xs group/img"
              >
                <img
                  src="/real estate/nowselling.jpg"
                  alt="Now Selling Estate"
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center shadow-md">
                    <ArrowsOut size={14} weight="bold" />
                  </div>
                </div>
              </div>

              <h3 className="font-display-title font-bold text-lg sm:text-xl text-ink mb-1.5 group-hover:text-accent-purple transition-colors">
                Prime Estate Plots
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted font-normal leading-relaxed">
                Verified dry residential and commercial lands with clean titles, infrastructure access, and instant allocation.
              </p>
            </div>

            <div className="mt-4 sm:mt-6 pt-3 border-t border-black/10 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-ink-muted">
              Immediate Allocation
            </div>
          </div>

          {/* Card 4: Trustline Investment Note (4 cols) */}
          <div className="md:col-span-4 p-5 sm:p-8 md:p-10 md:border-r border-b md:border-b-0 border-black/15 flex flex-col justify-between group hover:bg-[#faf7f0] transition-colors" data-reveal data-reveal-delay="100">
            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-5">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border-2 border-black/15 p-2 sm:p-2.5 flex items-center justify-center group-hover:bg-accent-yellow transition-colors shadow-2xs">
                  <img src="/house2.svg" alt="Investment Note" className="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
                </div>
                <span className="text-[8.5px] sm:text-[9px] font-extrabold uppercase tracking-widest text-accent-purple bg-accent-purple/10 px-2.5 py-0.5 rounded-full">
                  FIXED INCOME
                </span>
              </div>

              {/* Flyer Thumbnail */}
              <div
                onClick={() => setLightboxImage('/real estate/Trustline real estate investment note.jpg')}
                className="relative aspect-4/3 w-full rounded-xl border-2 border-black overflow-hidden mb-3 cursor-pointer bg-neutral-100 shadow-2xs group/img"
              >
                <img
                  src="/real estate/Trustline real estate investment note.jpg"
                  alt="Trustline Investment Note"
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center shadow-md">
                    <ArrowsOut size={14} weight="bold" />
                  </div>
                </div>
              </div>

              <h3 className="font-display-title font-bold text-lg sm:text-xl text-ink mb-1.5 group-hover:text-accent-purple transition-colors">
                Trustline Real Estate Note
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted font-normal leading-relaxed">
                Asset-backed investment vehicle offering structured, predictable capital returns without property management hassle.
              </p>
            </div>

            <div className="mt-4 sm:mt-6 pt-3 border-t border-black/10 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-ink-muted">
              Asset Backed Returns
            </div>
          </div>

          {/* Card 5: Dividend Payment & Yield (4 cols) */}
          <div className="md:col-span-4 p-5 sm:p-8 md:p-10 flex flex-col justify-between group hover:bg-[#faf7f0] transition-colors" data-reveal data-reveal-delay="200">
            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-5">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border-2 border-black/15 p-2 sm:p-2.5 flex items-center justify-center group-hover:bg-accent-yellow transition-colors shadow-2xs">
                  <img src="/houses.svg" alt="Dividend Yield" className="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
                </div>
                <span className="text-[8.5px] sm:text-[9px] font-extrabold uppercase tracking-widest text-accent-purple bg-accent-purple/10 px-2.5 py-0.5 rounded-full">
                  DIVIDEND YIELD
                </span>
              </div>

              {/* Flyer Thumbnail */}
              <div
                onClick={() => setLightboxImage('/real estate/dividend payment.jpg')}
                className="relative aspect-4/3 w-full rounded-xl border-2 border-black overflow-hidden mb-3 cursor-pointer bg-neutral-100 shadow-2xs group/img"
              >
                <img
                  src="/real estate/dividend payment.jpg"
                  alt="Dividend Payment"
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center shadow-md">
                    <ArrowsOut size={14} weight="bold" />
                  </div>
                </div>
              </div>

              <h3 className="font-display-title font-bold text-lg sm:text-xl text-ink mb-1.5 group-hover:text-accent-purple transition-colors">
                Dividend Payment Program
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted font-normal leading-relaxed">
                Structured cashflow distribution and return disbursements tied directly to verified commercial property operations.
              </p>
            </div>

            <div className="mt-4 sm:mt-6 pt-3 border-t border-black/10 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-ink-muted">
              Structured Payouts
            </div>
          </div>

        </div>

        {/* ── ROW 3: CLOSING REAL ESTATE CALL TO ACTION BANNER ── */}
        <div className="p-4 sm:p-10 md:p-14" data-reveal>
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 border-2 border-black shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover-glow">
            <div>
              <h3 className="font-condensed text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-ink leading-none mb-2">
                START YOUR PROPERTY JOURNEY TODAY.
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted max-w-xl font-medium">
                Whether you are looking to invest in land banking, purchase your next residential plot, or schedule a physical inspection, Aanuore is ready.
              </p>
            </div>

            <a
              href="mailto:anuoluwapokoleosho5@gmail.com?subject=Real%20Estate%20Inquiry%20-%20Aanuore"
              className="bg-black hover:bg-accent-yellow hover:text-black text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-8 py-3.5 rounded-full flex items-center gap-2 shadow-md transition-all duration-200 shrink-0 active:scale-95 border-2 border-black cursor-pointer"
            >
              <span>Inquire on Real Estate</span>
              <ArrowRight size={15} weight="bold" />
            </a>
          </div>
        </div>

      </div>

      {/* ── FULL SCREEN LIGHTBOX MODAL ── */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[90vh] bg-white border-2 border-black rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b-2 border-black flex items-center justify-between bg-canvas">
              <span className="font-mono text-sm font-black text-ink">
                REAL ESTATE SPOTLIGHT &amp; DOCUMENTATION
              </span>

              <button
                onClick={() => setLightboxImage(null)}
                className="w-9 h-9 rounded-full bg-black hover:bg-accent-purple text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={18} weight="bold" />
              </button>
            </div>

            {/* Modal Image Body */}
            <div className="relative flex-1 overflow-hidden bg-neutral-950 flex items-center justify-center p-2 sm:p-4">
              <img
                src={lightboxImage}
                alt="Property View"
                className="max-h-[72vh] w-auto max-w-full object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
