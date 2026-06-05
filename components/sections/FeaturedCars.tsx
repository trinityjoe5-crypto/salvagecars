import Link from 'next/link'
import { getCars } from '@/lib/cars'
import { CarCard } from '@/components/cars/CarCard'

export function FeaturedCars() {
  const featured = getCars().slice(0, 3)

  return (
    <section
      className="relative bg-graphite-800 py-20 sm:py-28"
      aria-labelledby="featured-cars-heading"
    >
      {/* Amber accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber/30 to-transparent" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-6 bg-amber" aria-hidden="true" />
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber"
                style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
              >
                Z našej ponuky
              </span>
            </div>
            <h2
              id="featured-cars-heading"
              style={{
                fontFamily: 'var(--font-barlow), sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                letterSpacing: '-0.025em',
                color: '#ffffff',
                lineHeight: 1.1,
              }}
            >
              Aktuálne <span style={{ color: '#E8870C' }}>vozidlá</span>
            </h2>
          </div>

          <Link
            href="/ponuka-vozidiel"
            className="
              shrink-0 self-start sm:self-auto
              inline-flex items-center gap-2 text-[14px] font-semibold text-white/60
              hover:text-amber transition-colors duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60 rounded
            "
            style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
          >
            Zobraziť všetky
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Car grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        {/* "View all" CTA */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/ponuka-vozidiel"
            className="
              inline-flex items-center gap-2.5
              px-8 py-4 bg-surface text-white font-bold rounded-xl
              border border-white/10
              hover:bg-surface-raised hover:border-amber/30 active:scale-[0.97]
              transition-[background-color,border-color,transform] duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60
            "
            style={{ fontFamily: 'var(--font-barlow), sans-serif', fontSize: '15px', letterSpacing: '0.03em' }}
          >
            CELÁ PONUKA VOZIDIEL
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}