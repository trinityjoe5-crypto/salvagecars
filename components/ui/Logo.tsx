'use client'

import Link from 'next/link'
import Image from 'next/image'
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
      className={`inline-flex items-center gap-2 select-none active:scale-95 transition-transform duration-150 ${className}`}
      aria-label="Damage Auto — domovská stránka"
    >
      {/* Car icon — sized so the visible car matches the text block height.
          PNG has ~22% whitespace on top, ~13% on bottom, car = ~65% of height.
          To get car visually ≈32px: total image height = 32/0.65 ≈ 49px.
          Transparent areas are invisible on dark bg. */}
      <Image
        src="/7D756145-2940-404C-B0B5-C5F38869C367-removebg-preview.png"
        alt=""
        aria-hidden="true"
        width={Math.round(56 * scale)}
        height={Math.round(49 * scale)}
        style={{ objectFit: 'contain', width: Math.round(56 * scale), height: Math.round(49 * scale), flexShrink: 0 }}
        priority
        unoptimized
      />

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
          DAMAGE
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
          AUTO
        </span>
      </span>
    </Link>
  )
}