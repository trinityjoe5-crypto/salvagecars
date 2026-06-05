'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const pathname = usePathname()
  const scale = size === 'sm' ? 0.8 : size === 'lg' ? 1.2 : 1

  return (
    <Link
      href="/"
      onClick={() => {
        if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' })
      }}
      className={`inline-flex items-center gap-2.5 group select-none active:scale-95 transition-transform duration-150 ${className}`}
      aria-label="SalvageCars — domovská stránka"
    >
      {/* Diamond mark */}
      <span
        className="shrink-0 relative"
        style={{ width: 22 * scale, height: 22 * scale }}
      >
        <svg
          width={22 * scale}
          height={22 * scale}
          viewBox="0 0 22 22"
          fill="none"
          aria-hidden="true"
        >
          {/* Outer diamond */}
          <rect
            x="3"
            y="3"
            width="16"
            height="16"
            rx="1.5"
            transform="rotate(45 11 11)"
            fill="#E8870C"
            className="transition-transform duration-300 group-hover:scale-110"
            style={{ transformOrigin: '11px 11px' }}
          />
          {/* Inner cutout */}
          <rect
            x="6.5"
            y="6.5"
            width="9"
            height="9"
            rx="0.5"
            transform="rotate(45 11 11)"
            fill="#2B2D31"
          />
          {/* Center dot */}
          <circle cx="11" cy="11" r="2" fill="#E8870C" />
        </svg>
      </span>

      {/* Text stack */}
      <span className="leading-none flex flex-col">
        <span
          className="block font-black text-white leading-none tracking-tight"
          style={{
            fontFamily: 'var(--font-barlow), sans-serif',
            fontSize: 20 * scale,
            letterSpacing: '-0.02em',
          }}
        >
          SALVAGE
        </span>
        <span
          className="block font-semibold leading-none"
          style={{
            fontFamily: 'var(--font-barlow), sans-serif',
            fontSize: 10 * scale,
            letterSpacing: '0.22em',
            color: '#E8870C',
            marginTop: 2 * scale,
          }}
        >
          CARS
        </span>
      </span>
    </Link>
  )
}