export function WhatWeDo() {
  return (
    <section
      className="relative bg-graphite-700 py-20 sm:py-28 overflow-hidden"
      aria-labelledby="what-we-do-heading"
    >
      {/* Subtle diagonal top edge */}
      <div
        className="absolute top-0 left-0 right-0 h-12 bg-graphite"
        aria-hidden="true"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 0%, 0 100%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-4">
          <span className="h-[2px] w-6 bg-amber" aria-hidden="true" />
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber"
            style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
          >
            Čo robíme
          </span>
        </div>

        <h2
          id="what-we-do-heading"
          className="mb-14"
          style={{
            fontFamily: 'var(--font-barlow), sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            letterSpacing: '-0.025em',
            color: '#ffffff',
            lineHeight: 1.1,
          }}
        >
          Výkup aj predaj —{' '}
          <span style={{ color: '#E8870C' }}>jedno miesto</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Card: Predaj */}
          <div className="relative bg-surface rounded-2xl p-8 border border-white/6 overflow-hidden group hover:border-amber/20 transition-colors duration-300">
            <div className="absolute -right-6 -bottom-6 opacity-[0.03] pointer-events-none" aria-hidden="true">
              <svg width="160" height="160" viewBox="0 0 24 24" fill="white">
                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </div>

            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-amber/10 border border-amber/20 flex items-center justify-center mb-6">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 5h12m-10 0a1 1 0 102 0 1 1 0 00-2 0m8 0a1 1 0 102 0 1 1 0 00-2 0" stroke="#E8870C" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <h3
              className="text-[22px] font-bold text-white mb-3"
              style={{ fontFamily: 'var(--font-barlow), sans-serif', letterSpacing: '-0.02em' }}
            >
              Predaj vrakov
            </h3>
            <p
              className="text-[14px] text-white/55 leading-[1.7]"
              style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
            >
              V našej ponuke nájdete havarované, poškodené a totálne odpísané vozidlá za ceny,
              ktoré sa neoplatí ignorovať. Každý voz je opraviteľný — záleží len na tom,
              koľko do neho chcete investovať.
            </p>
          </div>

          {/* Card: Výkup */}
          <div className="relative bg-surface rounded-2xl p-8 border border-white/6 overflow-hidden group hover:border-amber/20 transition-colors duration-300">
            <div className="w-12 h-12 rounded-xl bg-amber/10 border border-amber/20 flex items-center justify-center mb-6">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="#E8870C"/>
              </svg>
            </div>

            <h3
              className="text-[22px] font-bold text-white mb-3"
              style={{ fontFamily: 'var(--font-barlow), sans-serif', letterSpacing: '-0.02em' }}
            >
              Výkup poškodených áut
            </h3>
            <p
              className="text-[14px] text-white/55 leading-[1.7]"
              style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
            >
              Máte havarované auto, ktoré nechcete opravovať? Vykúpime ho za férovú trhovú cenu —
              rýchlo, bez zbytočnej byrokracie, s okamžitou platbou. Stačí zavolať.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}