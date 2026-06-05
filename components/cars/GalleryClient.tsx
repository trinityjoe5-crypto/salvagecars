'use client'

import { useState } from 'react'

interface Props {
  photos: string[]
  title: string
}

export function GalleryClient({ photos, title }: Props) {
  const [active, setActive] = useState(0)

  if (photos.length === 0) {
    return (
      <div className="w-full h-[260px] sm:h-[400px] rounded-2xl bg-graphite-600 flex items-center justify-center text-white/20">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M4 16l4-4 3 3 4-5 5 6H4zm16-12H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm-8 6a2 2 0 110-4 2 2 0 010 4z"/>
        </svg>
      </div>
    )
  }

  return (
    <div>
      {/* Main photo */}
      <div className="relative rounded-2xl overflow-hidden bg-graphite-600 mb-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photos[active]}
          alt={`${title} — foto ${active + 1}`}
          className="w-full h-[260px] sm:h-[420px] object-contain"
        />
        {/* Counter */}
        {photos.length > 1 && (
          <span
            className="absolute bottom-3 right-3 px-2.5 py-1 bg-graphite-800/80 text-white/70 text-[12px] font-semibold rounded-md"
            style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
          >
            {active + 1} / {photos.length}
          </span>
        )}
      </div>

      {/* Thumbnails */}
      {photos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {photos.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Foto ${i + 1}`}
              className={`
                shrink-0 w-20 h-14 rounded-lg overflow-hidden
                border-2 transition-[border-color,opacity] duration-150
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60
                ${i === active
                  ? 'border-amber opacity-100'
                  : 'border-white/10 opacity-50 hover:opacity-80 hover:border-white/30'}
              `}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${title} — náhľad ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}