import Link from 'next/link'
import { site } from '@/config/site'
import { CountUp } from '@/components/ui/CountUp'

export function Hero() {
  return (
    <section
      className="relative min-h-[88vh] sm:min-h-screen flex flex-col justify-start sm:justify-center pt-16 overflow-hidden bg-graphite"
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
        className="absolute -top-40 -right-40 w-[600px] h-[600px] pointer-events-none"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(232,135,12,0.07) 0%, transparent 70%)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 pt-10 pb-6 sm:py-16">
        <div className="max-w-2xl">

          {/* Eyebrow */}
          <div
            className="hero-reveal inline-flex items-center gap-2.5 mb-7"
            style={{ animationDelay: '0ms' }}
          >
            <span className="h-[2px] w-8 bg-amber" aria-hidden="true" />
            <span
              className="text-[12px] font-semibold uppercase tracking-[0.2em] text-amber"
              style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
            >
              Slovensko — najlepšie ceny
            </span>
          </div>

          {/* Main heading */}
          <h1
            id="hero-heading"
            className="hero-reveal"
            style={{
              fontFamily: 'var(--font-barlow), sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(3rem, 8vw, 5.5rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              animationDelay: '120ms',
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
            className="hero-reveal mt-7 text-[16px] sm:text-[17px] text-white/60 leading-[1.65] max-w-[500px]"
            style={{ fontFamily: 'var(--font-figtree), sans-serif', animationDelay: '280ms' }}
          >
            Kupujeme a predávame vraky, havarované a poškodené autá na Slovensku.
            Férová cena, rýchle vybavenie, bez komplikácií.
          </p>

          {/* CTAs */}
          <div className="hero-reveal flex gap-3 mt-9" style={{ animationDelay: '400ms' }}>
            <Link
              href="/ponuka-vozidiel"
              className="
                flex-1 sm:flex-none inline-flex items-center justify-center gap-2
                text-[14px] sm:text-[16px]
                px-4 py-3.5 sm:px-7 sm:py-4 bg-amber text-white font-bold rounded-xl
                hover:bg-amber-600 active:scale-[0.97]
                transition-[background-color,transform,box-shadow] duration-200
                shadow-[0_4px_20px_rgba(232,135,12,0.35)]
                hover:shadow-[0_6px_28px_rgba(232,135,12,0.5)]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60
              "
              style={{ fontFamily: 'var(--font-barlow), sans-serif', letterSpacing: '0.04em' }}
            >
              ZOBRAZIŤ PONUKU
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>

            <a
              href={`tel:${site.phone.replace(/\s/g, '')}`}
              className="
                flex-1 sm:flex-none inline-flex items-center justify-center gap-2
                text-[15px] sm:text-[16px]
                px-4 py-3.5 sm:px-7 sm:py-4 text-white font-semibold rounded-xl
                border border-white/20
                hover:bg-white/8 hover:border-white/30 active:scale-[0.97]
                transition-[background-color,border-color,transform] duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30
              "
              style={{ fontFamily: 'var(--font-barlow), sans-serif', letterSpacing: '0.02em' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="shrink-0">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C9.6 21 3 14.4 3 6c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
              </svg>
              {site.phoneDisplay}
            </a>
          </div>

          {/* Trust row */}
          <div className="hero-reveal flex flex-wrap gap-6 mt-16 sm:mt-12" style={{ animationDelay: '520ms' }}>
            <CountUp target={6}   suffix="+" label="rokov na trhu"               delay={650} />
            <CountUp target={150} suffix="+" label="vozidiel ročne"              delay={650} />
            <CountUp target={100} suffix="%" label="férovosť & transparentnosť" delay={650} />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-3 left-1/2 -translate-x-1/2"
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