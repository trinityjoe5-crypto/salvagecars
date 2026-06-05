'use client'

import { useState, useCallback } from 'react'

interface Props {
  photos: string[]
  title: string
}

export function GalleryClient({ photos, title }: Props) {
  const [active, setActive] = useState(0)

  const prev = useCallback(() =>
    setActive((i) => (i - 1 + photos.length) % photos.length), [photos.length])
  const next = useCallback(() =>
    setActive((i) => (i + 1) % photos.length), [photos.length])

  if (photos.length === 0) {
    return (
      <div className="w-full rounded-2xl bg-graphite-600 flex items-center justify-center text-white/20"
        style={{ aspectRatio: '16/9' }}>
        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M4 16l4-4 3 3 4-5 5 6H4zm16-12H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm-8 6a2 2 0 110-4 2 2 0 010 4z"/>
        </svg>
      </div>
    )
  }

  return (
    <>
      {/* Main photo with prev/next arrows */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-graphite-600 border border-white/8"
        style={{ aspectRatio: '16/9' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photos[active]}
          alt={`${title} — foto ${active + 1}`}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* Prev button */}
        {photos.length > 1 && (
          <button
            onClick={prev}
            aria-label="Predchádzajúca fotka"
            className="
              absolute left-3 top-1/2 -translate-y-1/2
              w-9 h-9 flex items-center justify-center
              bg-graphite-800/70 hover:bg-graphite-800/90
              text-white rounded-full
              transition-colors duration-150
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60
            "
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

        {/* Next button */}
        {photos.length > 1 && (
          <button
            onClick={next}
            aria-label="Nasledujúca fotka"
            className="
              absolute right-3 top-1/2 -translate-y-1/2
              w-9 h-9 flex items-center justify-center
              bg-graphite-800/70 hover:bg-graphite-800/90
              text-white rounded-full
              transition-colors duration-150
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60
            "
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

        {/* Counter */}
        {photos.length > 1 && (
          <span
            className="absolute bottom-3 right-3 px-2.5 py-1 bg-graphite-800/70 text-white/80 text-[12px] font-semibold rounded-md"
            style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
          >
            {active + 1} / {photos.length}
          </span>
        )}
      </div>
    </>
  )
}