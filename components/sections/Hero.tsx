import Link from 'next/link'
import { site } from '@/config/site'

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden bg-graphite"
      aria-labelledby="hero-heading"
    >
      {/* Dot grid texture */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Radial vignette to fade the dot grid at edges */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, #2B2D31 100%)',
        }}
      />

      {/* Amber glow accent */}
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.06] blur-[100px] pointer-events-none"
        aria-hidden="true"
        style={{ background: '#E8870C' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <div className="max-w-2xl">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 mb-7">
            <span className="h-[2px] w-8 bg-amber" aria-hidden="true" />
            <span
              className="text-[12px] font-semibold uppercase tracking-[0.2em] text-amber"
              style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
            >
              Slovensko — najlepšie ceny
            </span>
          </div>

          {/* Main heading — no animation, visible immediately */}
          <h1
            id="hero-heading"
            style={{
              fontFamily: 'var(--font-barlow), sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(3rem, 8vw, 5.5rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              color: '#ffffff',
            }}
          >
            VÝKUP &amp;{' '}
            <span style={{ color: '#E8870C' }}>PREDAJ</span>
            <br />
            HAVAROVANÝCH
            <br />
            VOZIDIEL
          </h1>

          {/* Sub */}
          <p
            className="mt-7 text-[16px] sm:text-[17px] text-white/60 leading-[1.65] max-w-[500px]"
            style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
          >
            Kupujeme a predávame vraky, havarované a poškodené autá na Slovensku.
            Férová cena, rýchle vybavenie, bez komplikácií.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mt-9">
            <Link
              href="/ponuka"
              className="
                inline-flex items-center gap-2.5
                px-7 py-4 bg-amber text-white font-bold rounded-xl
                hover:bg-amber-600 active:scale-[0.97]
                transition-[background-color,transform,box-shadow] duration-200
                shadow-[0_4px_20px_rgba(232,135,12,0.35)]
                hover:shadow-[0_6px_28px_rgba(232,135,12,0.5)]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60
              "
              style={{ fontFamily: 'var(--font-barlow), sans-serif', fontSize: '16px', letterSpacing: '0.04em' }}
            >
              ZOBRAZIŤ PONUKU
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>

            <a
              href={`tel:${site.phone.replace(/\s/g, '')}`}
              className="
                inline-flex items-center gap-2.5
                px-7 py-4 text-white font-semibold rounded-xl
                border border-white/20
                hover:bg-white/8 hover:border-white/30 active:scale-[0.97]
                transition-[background-color,border-color,transform] duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30
              "
              style={{ fontFamily: 'var(--font-barlow), sans-serif', fontSize: '16px', letterSpacing: '0.02em' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C9.6 21 3 14.4 3 6c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
              </svg>
              {site.phoneDisplay}
            </a>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap gap-6 mt-12">
            {[
              { value: '6+', label: 'rokov na trhu' },
              { value: '150+', label: 'vozidiel ročne' },
              { value: '100%', label: 'férovosť & transparentnosť' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col">
                <span
                  className="text-[28px] font-black text-white leading-none"
                  style={{ fontFamily: 'var(--font-barlow), sans-serif', letterSpacing: '-0.03em' }}
                >
                  {value}
                </span>
                <span
                  className="text-[12px] text-white/40 mt-0.5"
                  style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-1.5 opacity-30">
          <span className="text-[10px] tracking-widest text-white uppercase" style={{ fontFamily: 'var(--font-barlow), sans-serif' }}>Scroll</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
            <rect x="6" y="0" width="4" height="12" rx="2" fill="white" opacity="0.6"/>
            <path d="M4 16l4 5 4-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </section>
  )
}