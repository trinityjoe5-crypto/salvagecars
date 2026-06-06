import type { Metadata } from 'next'
import { getCars } from '@/lib/cars'
import { CarCard } from '@/components/cars/CarCard'

export const metadata: Metadata = {
  title: 'Ponuka vozidiel',
  description: 'Prehliadajte všetky aktuálne dostupné havarované a poškodené vozidlá v ponuke Damage Auto.',
}

export default function PonukaPage() {
  const cars = getCars()

  return (
    <div className="min-h-screen bg-graphite pt-28 pb-20 sm:pb-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[2px] w-6 bg-amber" aria-hidden="true" />
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber"
              style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
            >
              Všetky vozidlá
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <h1
              style={{
                fontFamily: 'var(--font-barlow), sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                letterSpacing: '-0.03em',
                color: '#ffffff',
                lineHeight: 1.0,
              }}
            >
              PONUKA <span style={{ color: '#E8870C' }}>VOZIDIEL</span>
            </h1>

            <span
              className="text-[14px] text-white/40"
              style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
            >
              {cars.length} vozidiel k dispozícii
            </span>
          </div>
        </div>

        {/* Grid */}
        {cars.length === 0 ? (
          <div className="text-center py-24 text-white/30 text-[15px]" style={{ fontFamily: 'var(--font-figtree), sans-serif' }}>
            Momentálne nie sú k dispozícii žiadne vozidlá.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}