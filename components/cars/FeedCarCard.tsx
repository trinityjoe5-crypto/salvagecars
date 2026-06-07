import Link from 'next/link'
import Image from 'next/image'
import type { FeedCar } from '@/lib/feed'

interface Props {
  car: FeedCar
}

export function FeedCarCard({ car }: Props) {
  const thumb = car.photos[0]

  const specs: string[] = []
  if (car.year) specs.push(String(car.year))
  if (car.mileageKm) specs.push(`${car.mileageKm.toLocaleString('sk-SK')} km`)
  if (car.fuelLabel) specs.push(car.fuelLabel)
  if (car.transmissionLabel) specs.push(car.transmissionLabel)

  return (
    <Link
      href={`/ponuka-vozidiel/${car.id}`}
      className="
        group relative flex flex-col
        bg-surface rounded-2xl overflow-hidden
        border border-white/6
        hover:border-amber/30
        shadow-[0_2px_16px_rgba(0,0,0,0.3)]
        hover:shadow-[0_6px_32px_rgba(0,0,0,0.45),0_0_0_1px_rgba(232,135,12,0.2)]
        transition-[border-color,box-shadow,transform] duration-200
        hover:-translate-y-1 active:scale-[0.97] active:translate-y-0
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60
      "
    >
      {/* Amber top accent on hover */}
      <span
        className="absolute top-0 left-0 right-0 h-[2px] bg-amber opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        aria-hidden="true"
      />

      {/* Photo */}
      <div className="relative aspect-[16/10] overflow-hidden bg-graphite-700">
        {thumb ? (
          <Image
            src={thumb}
            alt={car.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/20">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M21 15V19a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
            </svg>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface/70 via-transparent to-transparent" />

        {/* Rezervované badge */}
        {car.isReserved && (
          <span
            className="absolute top-3 left-3 px-2.5 py-1 bg-amber text-white text-[11px] font-bold rounded-md z-10 uppercase tracking-wider"
            style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
          >
            Rezervované
          </span>
        )}

        {/* Year badge */}
        {car.year && (
          <span
            className="absolute top-3 right-3 px-2.5 py-1 bg-graphite-800/80 backdrop-blur-sm text-white/80 text-[12px] font-semibold rounded-md"
            style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
          >
            {car.year}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 flex-1">

        {/* Badges */}
        {car.badges.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {car.badges.map((b) => (
              <span
                key={b}
                className="px-2 py-0.5 bg-amber/10 border border-amber/20 text-amber text-[11px] font-semibold rounded"
                style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
              >
                {b}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3
          className="text-[16px] font-bold text-white leading-tight group-hover:text-amber transition-colors duration-200 line-clamp-2"
          style={{ fontFamily: 'var(--font-barlow), sans-serif', letterSpacing: '-0.01em' }}
        >
          {car.title}
        </h3>

        {/* Specs */}
        {specs.length > 0 && (
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {specs.map((s) => (
              <span
                key={s}
                className="text-[12px] text-white/45"
                style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-white/6">
          <span
            className="text-[22px] font-black text-amber leading-none"
            style={{ fontFamily: 'var(--font-barlow), sans-serif', letterSpacing: '-0.02em' }}
          >
            {car.price > 0 ? `${car.price.toLocaleString('sk-SK')} €` : 'Cena na vyžiadanie'}
          </span>
          <span
            className="flex items-center gap-1.5 text-[13px] font-semibold text-white/45 group-hover:text-amber transition-colors duration-200"
            style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
          >
            Detail
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}