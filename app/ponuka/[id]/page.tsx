import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCars, getCarById } from '@/lib/cars'
import { site } from '@/config/site'
import type { Car } from '@/types/car'

const fuelLabel: Record<Car['fuel'], string> = {
  diesel:  'Nafta',
  benzin:  'Benzín',
  hybrid:  'Hybrid',
  elektro: 'Elektro',
}

const transmissionLabel: Record<Car['transmission'], string> = {
  manualna:    'Manuálna',
  automaticka: 'Automatická',
}

// Pre-generate all car detail pages at build time
export function generateStaticParams() {
  return getCars().map((car) => ({ id: car.id }))
}

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const car = getCarById(id)
  if (!car) return {}
  return {
    title: car.title,
    description: car.shortDescription,
  }
}

export default async function CarDetailPage({ params }: Props) {
  const { id } = await params
  const car = getCarById(id)
  if (!car) notFound()

  const specs = [
    { label: 'Rok výroby',   value: String(car.year) },
    { label: 'Najazdené',    value: `${car.mileageKm.toLocaleString('sk-SK')} km` },
    { label: 'Palivo',       value: fuelLabel[car.fuel] },
    { label: 'Prevodovka',   value: transmissionLabel[car.transmission] },
  ]

  return (
    <div className="min-h-screen bg-graphite pt-20 pb-20 sm:pb-28">

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-8 pb-6">
        <nav
          className="flex items-center gap-2 text-[13px] text-white/35"
          style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
          aria-label="Drobky chleba"
        >
          <Link href="/" className="hover:text-white transition-colors duration-150">Domov</Link>
          <span aria-hidden="true">/</span>
          <Link href="/ponuka" className="hover:text-white transition-colors duration-150">Ponuka vozidiel</Link>
          <span aria-hidden="true">/</span>
          <span className="text-white/60">{car.title}</span>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/*
          Mobile order:  1. Gallery  2. Info card  3. Popis + poškodenie
          Desktop order: col-1/row-1 Gallery | col-2/row-1+2 Info card (sticky)
                         col-1/row-2 Popis + poškodenie
        */}
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1fr_380px] lg:gap-x-10 lg:gap-y-8 lg:items-start">

          {/* Gallery — always first */}
          <div className="order-1 lg:col-start-1 lg:row-start-1 min-w-0">

            {/* Main image */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-graphite-600 mb-4">
              <Image
                src={car.images[0]}
                alt={car.title}
                fill
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover"
                priority
                unoptimized
              />
            </div>

            {/* Thumbnail gallery (if >1 image) */}
            {car.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {car.images.map((src, i) => (
                  <div
                    key={i}
                    className="relative shrink-0 w-20 h-14 rounded-lg overflow-hidden bg-graphite-600 border border-white/10"
                  >
                    <Image
                      src={src}
                      alt={`${car.title} — foto ${i + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right column — 2nd on mobile, sticky right on desktop */}
          <div className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-24 flex flex-col gap-4">

            <div className="bg-surface rounded-2xl p-6 border border-white/8">

              {/* Year badge */}
              <span
                className="inline-block px-2.5 py-1 mb-3 bg-graphite-600 text-white/60 text-[12px] font-semibold rounded-md"
                style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
              >
                {car.year}
              </span>

              <h1
                className="text-[26px] font-black text-white leading-tight mb-2"
                style={{ fontFamily: 'var(--font-barlow), sans-serif', letterSpacing: '-0.025em' }}
              >
                {car.title}
              </h1>
              <p
                className="text-[14px] text-white/45 leading-relaxed mb-5"
                style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
              >
                {car.shortDescription}
              </p>

              {/* Price */}
              <div className="py-4 border-t border-b border-white/8 mb-5">
                <p
                  className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-1"
                  style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
                >
                  Cena
                </p>
                <span
                  className="text-[38px] font-black text-amber leading-none"
                  style={{ fontFamily: 'var(--font-barlow), sans-serif', letterSpacing: '-0.03em' }}
                >
                  {car.price.toLocaleString('sk-SK')} €
                </span>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-2.5 mb-5">
                {specs.map(({ label, value }) => (
                  <div key={label} className="flex flex-col px-3 py-2.5 bg-graphite-600/50 rounded-lg">
                    <span
                      className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-0.5"
                      style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
                    >
                      {label}
                    </span>
                    <span
                      className="text-[14px] font-semibold text-white"
                      style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>

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

                {car.sourceUrl && (
                  <a
                    href={car.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex items-center justify-center gap-2
                      w-full px-6 py-3 text-white/50 text-[13px] font-medium rounded-xl
                      border border-white/8
                      hover:text-white/70 hover:border-white/15
                      transition-[color,border-color] duration-200
                    "
                    style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
                  >
                    Zobraziť na autobazar.eu
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>

          </div>

          {/* Popis + poškodenie — 3rd on mobile, col-1/row-2 on desktop */}
          <div className="order-3 lg:col-start-1 lg:row-start-2 min-w-0">

            {/* Description */}
            <div>
              <h2
                className="text-[20px] font-bold text-white mb-3"
                style={{ fontFamily: 'var(--font-barlow), sans-serif', letterSpacing: '-0.01em' }}
              >
                Popis
              </h2>
              <p
                className="text-[15px] text-white/60 leading-[1.75]"
                style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
              >
                {car.longDescription}
              </p>
            </div>

            {/* Damage description */}
            <div className="mt-6 p-5 bg-amber/6 border border-amber/20 rounded-xl">
              <div className="flex items-center gap-2.5 mb-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#E8870C" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3
                  className="text-[16px] font-bold text-amber"
                  style={{ fontFamily: 'var(--font-barlow), sans-serif', letterSpacing: '-0.01em' }}
                >
                  Popis poškodenia
                </h3>
              </div>
              <p
                className="text-[14px] text-white/55 leading-[1.7]"
                style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
              >
                {car.damageDescription}
              </p>
            </div>

            {/* Back link */}
            <Link
              href="/ponuka"
              className="mt-6 flex items-center gap-2 text-[13px] text-white/35 hover:text-white/60 transition-colors duration-150 px-1"
              style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Späť na ponuku
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}