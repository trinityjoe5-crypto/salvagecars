'use client'

import { site } from '@/config/site'

export function StickyCallButton() {
  return (
    <a
      href={`tel:${site.phone.replace(/\s/g, '')}`}
      className="
        fixed bottom-5 right-5 z-50
        flex items-center gap-2.5
        bg-amber text-white font-bold
        px-5 py-3.5 rounded-full
        shadow-[0_4px_24px_rgba(232,135,12,0.45)]
        hover:bg-amber-600 active:scale-95
        transition-[background-color,transform,box-shadow] duration-200
        sm:hidden
      "
      aria-label={`Zavolať na ${site.phoneDisplay}`}
    >
      {/* Phone icon */}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C9.6 21 3 14.4 3 6c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"
          fill="currentColor"
        />
      </svg>
      <span className="text-[15px]" style={{ fontFamily: 'var(--font-barlow), sans-serif', letterSpacing: '0.01em' }}>
        Zavolať
      </span>
    </a>
  )
}