import { site } from '@/config/site'

export function Vykup() {
  return (
    <section
      className="relative bg-graphite py-20 sm:py-28 overflow-hidden"
      aria-labelledby="vykup-heading"
    >
      {/* Amber glow */}
      <div
        className="absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.07] blur-[100px] pointer-events-none"
        aria-hidden="true"
        style={{ background: '#E8870C' }}
      />

      {/* Amber accent border top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber/40 to-transparent" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Text */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-6 bg-amber" aria-hidden="true" />
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber"
                style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
              >
                Výkup havarovaných áut
              </span>
            </div>

            <h2
              id="vykup-heading"
              className="mb-6"
              style={{
                fontFamily: 'var(--font-barlow), sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                letterSpacing: '-0.03em',
                color: '#ffffff',
                lineHeight: 1.0,
              }}
            >
              MÁTE HAVAROVANÉ
              <br />
              AUTO?{' '}
              <span style={{ color: '#E8870C' }}>VYKÚPIME HO.</span>
            </h2>

            <p
              className="text-[15px] text-white/55 leading-[1.7] max-w-[460px] mb-8"
              style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
            >
              Nezáleží na stave. Čelný náraz, totálka, krúpy, povodeň —
              každé auto má svoju cenu. Zavolajte nám a do 24 hodín máte záväznú ponuku.
              Príde za vami, zaplatí v hotovosti a papiere vybavíme za vás.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${site.phone.replace(/\s/g, '')}`}
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C9.6 21 3 14.4 3 6c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                </svg>
                ZAVOLAJTE TERAZ
              </a>

              <a
                href="#kontakt"
                className="
                  inline-flex items-center gap-2 px-7 py-4
                  text-white font-semibold rounded-xl
                  border border-white/15
                  hover:bg-white/6 hover:border-white/25 active:scale-[0.97]
                  transition-[background-color,border-color,transform] duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30
                "
                style={{ fontFamily: 'var(--font-barlow), sans-serif', fontSize: '15px', letterSpacing: '0.02em' }}
              >
                Napísať správu
              </a>
            </div>
          </div>

          {/* Right: Benefits */}
          <div className="grid grid-cols-1 gap-4">
            {[
              {
                title: 'Rýchle vybavenie',
                description: 'Cenovú ponuku dostanete do 24 hodín od kontaktu. Bez čakania a zbytočných prieťahov.',
              },
              {
                title: 'Férová, trhová cena',
                description: 'Hodnotíme každé auto individuálne a úprimne. Dostanete reálnu trhovú cenu, nie smiešne peniaze.',
              },
              {
                title: 'Akýkoľvek stav',
                description: 'Havarované, krupy, voda, totálna škoda — neexistuje auto, o ktoré by sme nemali záujem.',
              },
              {
                title: 'Platba ihneď',
                description: 'Po dohode zaplatíme na mieste, v hotovosti alebo prevodom podľa vašej preferencie.',
              },
            ].map(({ title, description }) => (
              <div
                key={title}
                className="flex gap-4 p-5 bg-surface/60 rounded-xl border border-white/6 hover:border-amber/20 transition-colors duration-300"
              >
                <span className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-amber/15 border border-amber/30 flex items-center justify-center">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" stroke="#E8870C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <div>
                  <p
                    className="text-[15px] font-bold text-white mb-1"
                    style={{ fontFamily: 'var(--font-barlow), sans-serif', letterSpacing: '-0.01em' }}
                  >
                    {title}
                  </p>
                  <p
                    className="text-[13px] text-white/45 leading-relaxed"
                    style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
                  >
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}