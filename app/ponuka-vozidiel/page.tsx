import type { Metadata } from 'next'
import { fetchCars } from '@/lib/feed'
import { FeedCarCard } from '@/components/cars/FeedCarCard'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Ponuka vozidiel',
  description: 'Aktuálna ponuka havarovaných a poškodených vozidiel na predaj.',
}

export default async function PonukaVozidielPage() {
  const cars = await fetchCars()

  return (
    <div className="min-h-screen bg-graphite pt-20 pb-20 sm:pb-28">

      {/* Page header */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-10 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-[2px] w-6 bg-amber" aria-hidden="true" />
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber"
            style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
          >
            Aktuálna ponuka
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h1
            style={{
              fontFamily: 'var(--font-barlow), sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: '#ffffff',
            }}
          >
            Ponuka <span style={{ color: '#E8870C' }}>vozidiel</span>
          </h1>
          {cars.length > 0 && (
            <p
              className="text-[14px] text-white/40 sm:text-right"
              style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
            >
              {cars.length} {cars.length === 1 ? 'inzerát' : cars.length < 5 ? 'inzeráty' : 'inzerátov'}
            </p>
          )}
        </div>
      </div>

      {/* Grid or empty state */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {cars.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cars.map((car) => (
              <FeedCarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-surface border border-white/8 flex items-center justify-center mb-6">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 5h12m-10 0a1 1 0 102 0 1 1 0 00-2 0m8 0a1 1 0 102 0 1 1 0 00-2 0" stroke="#E8870C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h2
        className="text-[22px] font-bold text-white mb-2"
        style={{ fontFamily: 'var(--font-barlow), sans-serif', letterSpacing: '-0.02em' }}
      >
        Ponuka sa práve pripravuje
      </h2>
      <p
        className="text-[14px] text-white/45 max-w-xs leading-relaxed"
        style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
      >
        Aktuálne vozidlá nie sú dostupné. Kontaktujte nás priamo — radi vám
        pomôžeme.
      </p>
      <a
        href="/#kontakt"
        className="
          mt-8 inline-flex items-center gap-2 px-7 py-3.5
          bg-amber text-white font-bold rounded-xl
          hover:bg-amber-600 active:scale-[0.97]
          transition-[background-color,transform] duration-200
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60
        "
        style={{ fontFamily: 'var(--font-barlow), sans-serif', letterSpacing: '0.03em' }}
      >
        Kontaktovať nás
      </a>
    </div>
  )
}