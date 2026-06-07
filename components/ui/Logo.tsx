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
      className={`inline-flex items-center select-none active:scale-95 transition-transform duration-150 ${className}`}
      aria-label="Damaged Auto — domovská stránka"
    >
      {/* Square holder — height matches full text stack (DAMAGE + gap + AUTO) */}
      <div
        style={{
          width: Math.round(32 * scale),
          height: Math.round(32 * scale),
          flexShrink: 0,
          position: 'relative',
          marginRight: Math.round(12 * scale),
        }}
      >
        <Image
          src="/7D756145-2940-404C-B0B5-C5F38869C367-removebg-preview-2.png"
          alt=""
          aria-hidden="true"
          fill
          style={{ objectFit: 'contain' }}
          priority
          unoptimized
        />
      </div>

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
          DAMAGED
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