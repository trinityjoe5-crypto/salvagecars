import { site } from '@/config/site'

const steps = [
  {
    number: '01',
    title: 'Zavolajte alebo napíšte',
    description:
      'Kontaktujte nás telefonicky alebo cez formulár. Opíšte auto — rok, značku, rozsah poškodenia.',
  },
  {
    number: '02',
    title: 'Cenovú ponuku dostanete rýchlo',
    description:
      'Do 24 hodín vám zašleme záväznú cenovú ponuku. Bez skrytých podmienok, bez záväzkov.',
  },
  {
    number: '03',
    title: 'Rýchle prevzatie a platba',
    description:
      'Po dohode si auto prevezme náš pracovník priamo u vás. Platba ihneď, papiere vybavíme za vás.',
  },
]

export function HowItWorks() {
  return (
    <section
      id="vykup"
      className="relative bg-graphite py-20 sm:py-28"
      aria-labelledby="how-it-works-heading"
    >
      {/* Amber accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber/40 to-transparent" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-4">
          <span className="h-[2px] w-6 bg-amber" aria-hidden="true" />
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber"
            style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
          >
            Výkup vozidiel
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <h2
            id="how-it-works-heading"
            style={{
              fontFamily: 'var(--font-barlow), sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              letterSpacing: '-0.025em',
              color: '#ffffff',
              lineHeight: 1.1,
            }}
          >
            Ako prebieha{' '}
            <span style={{ color: '#E8870C' }}>výkup</span>
            <br />
            vášho auta?
          </h2>

          <a
            href={`tel:${site.phone.replace(/\s/g, '')}`}
            className="
              shrink-0 inline-flex items-center gap-2.5 self-start md:self-auto
              px-6 py-3.5 bg-amber text-white font-bold rounded-xl
              hover:bg-amber-600 active:scale-[0.97]
              transition-[background-color,transform] duration-200
              shadow-[0_4px_20px_rgba(232,135,12,0.3)]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60
            "
            style={{ fontFamily: 'var(--font-barlow), sans-serif', fontSize: '15px', letterSpacing: '0.03em' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C9.6 21 3 14.4 3 6c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
            </svg>
            ZAVOLAJTE TERAZ
          </a>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative bg-surface rounded-2xl p-7 border border-white/6"
            >
              {/* Connector line (not on last) */}
              {i < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-10 -right-3 w-6 h-[2px] bg-white/10"
                  aria-hidden="true"
                />
              )}

              {/* Step number */}
              <span
                className="block text-[40px] font-black leading-none mb-5"
                style={{
                  fontFamily: 'var(--font-barlow), sans-serif',
                  color: '#E8870C',
                  letterSpacing: '-0.04em',
                  opacity: 0.9,
                }}
                aria-hidden="true"
              >
                {step.number}
              </span>

              <h3
                className="text-[18px] font-bold text-white mb-3 leading-tight"
                style={{ fontFamily: 'var(--font-barlow), sans-serif', letterSpacing: '-0.01em' }}
              >
                {step.title}
              </h3>
              <p
                className="text-[14px] text-white/50 leading-[1.7]"
                style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Rýchle vybavenie', sub: 'Do 24 hodín cenovú ponuku' },
            { label: 'Férová cena', sub: 'Hodnotíme podľa trhu, úprimne' },
            { label: 'Akýkoľvek stav', sub: 'Odkúpime aj totálnu škodu' },
          ].map(({ label, sub }) => (
            <div
              key={label}
              className="flex items-start gap-3 px-5 py-4 bg-surface/50 rounded-xl border border-white/5"
            >
              <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-amber/15 border border-amber/30 flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" stroke="#E8870C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <div>
                <p className="text-[14px] font-semibold text-white" style={{ fontFamily: 'var(--font-figtree), sans-serif' }}>
                  {label}
                </p>
                <p className="text-[12px] text-white/40 mt-0.5" style={{ fontFamily: 'var(--font-figtree), sans-serif' }}>
                  {sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}