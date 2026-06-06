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
  const height = size === 'sm' ? 34 : size === 'lg' ? 52 : 42

  return (
    <Link
      href="/"
      onClick={() => {
        if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' })
      }}
      className={`inline-flex items-center select-none active:scale-95 transition-transform duration-150 ${className}`}
      aria-label="Damage Auto — domovská stránka"
    >
      <Image
        src="/9DAE4401-8F4F-4A1C-942A-1E8F7B82072A.PNG"
        alt="Damage Auto"
        height={height}
        width={height}
        style={{ objectFit: 'contain', height, width: 'auto' }}
        priority
        unoptimized
      />
    </Link>
  )
}