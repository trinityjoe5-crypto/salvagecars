import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { fetchCarById } from '@/lib/feed'
import { GalleryClient } from '@/components/cars/GalleryClient'
import { site } from '@/config/site'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const car = await fetchCarById(id)
  if (!car) return {}
  return {
    title: car.title,
    description: `${car.brand} ${car.model}, ${car.year ?? ''}${car.mileageKm ? `, ${car.mileageKm.toLocaleString('sk-SK')} km` : ''}`,
  }
}

export default async function FeedCarDetailPage({ params }: Props) {
  const { id } = await params
  const car = await fetchCarById(id)
  if (!car) notFound()

  // Build tech specs — only include fields that exist
  const specs: { label: string; value: string }[] = []
  if (car.year)              specs.push({ label: 'Rok výroby',    value: String(car.year) })
  if (car.mileageKm)         specs.push({ label: 'Najazdené',     value: `${car.mileageKm.toLocaleString('sk-SK')} km` })
  if (car.fuelLabel)         specs.push({ label: 'Palivo',        value: car.fuelLabel })
  if (car.transmissionLabel) specs.push({ label: 'Prevodovka',    value: car.transmissionLabel })
  if (car.powerKw)           specs.push({ label: 'Výkon',         value: `${car.powerKw} kW` })
  if (car.engineCc)          specs.push({ label: 'Objem motora',  value: `${car.engineCc} cm³` })
  if (car.typeLabel)         specs.push({ label: 'Druh',          value: car.typeLabel })
  if (car.bedCount)          specs.push({ label: 'Počet lôžok',   value: String(car.bedCount) })
  if (car.maxWeightLabel)    specs.push({ label: 'Max. hmotnosť', value: car.maxWeightLabel })
  if (car.stateLabel)        specs.push({ label: 'Stav',          value: car.stateLabel })

  const priceLabel = car.price > 0
    ? `${car.price.toLocaleString('sk-SK')} €`
    : 'Cena na vyžiadanie'

  return (
    <div className="min-h-screen bg-graphite pt-20 pb-20 sm:pb-28 overflow-x-hidden">

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-8 pb-6">
        <nav
          className="flex items-center gap-2 text-[13px] text-white/35"
          style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
          aria-label="Drobky chleba"
        >
          <Link href="/" className="hover:text-white transition-colors duration-150">Domov</Link>
          <span aria-hidden="true">/</span>
          <Link href="/ponuka-vozidiel" className="hover:text-white transition-colors duration-150">Ponuka vozidiel</Link>
          <span aria-hidden="true">/</span>
          <span className="text-white/60 truncate max-w-[180px]">{car.title}</span>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10" style={{ alignItems: 'start' }}>

          {/* ── Left column ─────────────────────────────── */}
          <div className="min-w-0" style={{ alignSelf: 'start' }}>

            {/* Gallery */}
            <GalleryClient photos={car.photos} title={car.title} />

            {/* Výbava */}
            {car.contentExtend && (
              <div className="mt-8">
                <h2
                  className="text-[19px] font-bold text-white mb-4"
                  style={{ fontFamily: 'var(--font-barlow), sans-serif', letterSpacing: '-0.01em' }}
                >
                  Výbava
                </h2>
                <p
                  className="text-[14px] text-white/55 leading-[1.75] whitespace-pre-line"
                  style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
                >
                  {car.contentExtend.trim()}
                </p>
              </div>
            )}

            {/* Podmienky predaja — collapsible */}
            {car.contentOptions && (
              <div className="mt-6">
                <details className="group">
                  <summary
                    className="
                      flex items-center justify-between gap-3 cursor-pointer
                      px-5 py-4 bg-surface rounded-xl border border-white/6
                      hover:border-white/12 transition-colors duration-200
                      list-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60
                    "
                  >
                    <span
                      className="text-[15px] font-semibold text-white/70"
                      style={{ fontFamily: 'var(--font-barlow), sans-serif', letterSpacing: '-0.01em' }}
                    >
                      Podmienky predaja
                    </span>
                    <svg
                      width="16" height="16" viewBox="0 0 24 24" fill="none"
                      className="shrink-0 text-white/40 transition-transform duration-200 group-open:rotate-180"
                      aria-hidden="true"
                    >
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </summary>
                  <div className="px-5 pt-4 pb-5 bg-surface/50 rounded-b-xl border-x border-b border-white/6 -mt-1">
                    <p
                      className="text-[13px] text-white/45 leading-[1.75] whitespace-pre-line"
                      style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
                    >
                      {car.contentOptions.trim()}
                    </p>
                  </div>
                </details>
              </div>
            )}

            {/* Back link */}
            <Link
              href="/ponuka-vozidiel"
              className="mt-2 flex items-center gap-2 text-[13px] text-white/35 hover:text-white/60 transition-colors duration-150 px-1"
              style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Späť na ponuku
            </Link>
          </div>

          {/* ── Right column — card is the direct grid item ── */}
          <div className="lg:sticky lg:top-24 bg-surface rounded-2xl p-6 border border-white/8" style={{ alignSelf: 'start' }}>

              {/* Reserved badge */}
              {car.isReserved && (
                <span
                  className="inline-block px-2.5 py-1 mb-3 bg-amber text-white text-[11px] font-bold rounded-md uppercase tracking-wider"
                  style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
                >
                  Rezervované
                </span>
              )}

              {/* Badges */}
              {car.badges.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {car.badges.map((b) => (
                    <span
                      key={b}
                      className="px-2.5 py-1 bg-amber/10 border border-amber/20 text-amber text-[11px] font-semibold rounded-md"
                      style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
                    >
                      {b}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1
                className="text-[24px] font-black text-white leading-tight mb-2"
                style={{ fontFamily: 'var(--font-barlow), sans-serif', letterSpacing: '-0.025em' }}
              >
                {car.title}
              </h1>

              {/* Price */}
              <div className="py-4 border-t border-b border-white/8 my-4">
                <p
                  className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-1"
                  style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
                >
                  Cena
                </p>
                <span
                  className="text-[36px] font-black text-amber leading-none"
                  style={{ fontFamily: 'var(--font-barlow), sans-serif', letterSpacing: '-0.03em' }}
                >
                  {priceLabel}
                </span>
              </div>

              {/* Tech specs grid */}
              {specs.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {specs.map(({ label, value }) => (
                    <div key={label} className="flex flex-col px-3 py-2.5 bg-graphite-600/50 rounded-lg min-w-0 overflow-hidden">
                      <span
                        className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-0.5 truncate"
                        style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
                      >
                        {label}
                      </span>
                      <span
                        className="text-[13px] font-semibold text-white truncate"
                        style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
                        title={value}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* CTAs */}
              <div className="flex flex-col gap-3">
                <a
                  href={`tel:${site.phone.replace(/\s/g, '')}`}
                  className="
                    flex items-center justify-center gap-2.5
                    w-full px-6 py-4 bg-amber text-white font-bold rounded-xl
                    hover:bg-amber-600 active:scale-[0.97]
                    transition-[background-color,transform,box-shadow] duration-200
                    shadow-[0_4px_20px_rgba(232,135,12,0.35)]
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60
                  "
                  style={{ fontFamily: 'var(--font-barlow), sans-serif', fontSize: '16px', letterSpacing: '0.04em' }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C9.6 21 3 14.4 3 6c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                  </svg>
                  ZAVOLAŤ: {site.phoneDisplay}
                </a>

                <Link
                  href="/#kontakt"
                  className="
                    flex items-center justify-center gap-2
                    w-full px-6 py-3.5 text-white font-semibold rounded-xl
                    border border-white/15
                    hover:bg-white/6 hover:border-white/25 active:scale-[0.97]
                    transition-[background-color,border-color,transform] duration-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30
                  "
                  style={{ fontFamily: 'var(--font-barlow), sans-serif', fontSize: '14px', letterSpacing: '0.03em' }}
                >
                  NAPÍSAŤ SPRÁVU
                </Link>

                {car.link && (
                  <a
                    href={car.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex items-center justify-center gap-2
                      w-full px-6 py-3 text-white/40 text-[13px] font-medium rounded-xl
                      border border-white/8
                      hover:text-white/60 hover:border-white/15
                      transition-[color,border-color] duration-200
                    "
                    style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
                  >
                    Pozrieť pôvodný inzerát
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>

        </div>
      </div>
    </div>
  )
}