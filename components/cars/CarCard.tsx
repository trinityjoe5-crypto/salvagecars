import Link from 'next/link'
import Image from 'next/image'
import type { Car } from '@/types/car'

// Label maps for Slovak display
const fuelLabel: Record<Car['fuel'], string> = {
  diesel:  'Nafta',
  benzin:  'Benzín',
  hybrid:  'Hybrid',
  elektro: 'Elektro',
}

const transmissionLabel: Record<Car['transmission'], string> = {
  manualna:    'Manuál',
  automaticka: 'Automat',
}

interface CarCardProps {
  car: Car
}

export function CarCard({ car }: CarCardProps) {
  return (
    <Link
      href={`/ponuka/${car.id}`}
      className="
        group relative flex flex-col
        bg-surface rounded-2xl overflow-hidden
        border border-white/6
        hover:border-amber/30
        shadow-[0_2px_16px_rgba(0,0,0,0.3)]
        hover:shadow-[0_6px_32px_rgba(0,0,0,0.45),0_0_0_1px_rgba(232,135,12,0.2)]
        transition-[border-color,box-shadow,transform] duration-300
        hover:-translate-y-1
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60
      "
    >
      {/* Amber top accent line */}
      <span
        className="absolute top-0 left-0 right-0 h-[2px] bg-amber opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        aria-hidden="true"
      />

      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-graphite-700">
        <Image
          src={car.images[0]}
          alt={car.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent" />

        {/* Year badge */}
        <span
          className="absolute top-3 right-3 px-2.5 py-1 bg-graphite-800/80 backdrop-blur-sm text-white/80 text-[12px] font-semibold rounded-md"
          style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
        >
          {car.year}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 flex-1">

        {/* Title */}
        <h3
          className="text-[17px] font-bold text-white leading-tight group-hover:text-amber transition-colors duration-200"
          style={{ fontFamily: 'var(--font-barlow), sans-serif', letterSpacing: '-0.01em' }}
        >
          {car.title}
        </h3>

        {/* Short description */}
        <p
          className="text-[13px] text-white/50 leading-relaxed line-clamp-2"
          style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
        >
          {car.shortDescription}
        </p>

        {/* Specs row */}
        <div className="flex flex-wrap gap-2 mt-auto pt-1">
          {[
            { icon: '⊙', label: `${(car.mileageKm / 1000).toFixed(0)} tis. km` },
            { icon: '⛽', label: fuelLabel[car.fuel] },
            { icon: '⚙', label: transmissionLabel[car.transmission] },
          ].map(({ icon, label }) => (
            <span
              key={label}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-graphite-600/60 rounded-md text-[12px] text-white/60"
              style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
            >
              <span aria-hidden="true" className="text-[10px]">{icon}</span>
              {label}
            </span>
          ))}
        </div>

        {/* Price + CTA row */}
        <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/6">
          <span
            className="text-[22px] font-black text-amber leading-none"
            style={{ fontFamily: 'var(--font-barlow), sans-serif', letterSpacing: '-0.02em' }}
          >
            {car.price.toLocaleString('sk-SK')} €
          </span>
          <span
            className="
              flex items-center gap-1.5 text-[13px] font-semibold text-white/50
              group-hover:text-amber transition-colors duration-200
            "
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