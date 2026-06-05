'use client'

import { useState, useCallback, useEffect, useRef } from 'react'

interface Props {
  photos: string[]
  title: string
}

export function GalleryClient({ photos, title }: Props) {
  const [active, setActive] = useState(0)
  const stripRef = useRef<HTMLDivElement>(null)
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([])

  const prev = useCallback(() =>
    setActive((i) => (i - 1 + photos.length) % photos.length), [photos.length])
  const next = useCallback(() =>
    setActive((i) => (i + 1) % photos.length), [photos.length])

  // Auto-scroll strip when active thumbnail changes
  useEffect(() => {
    const strip = stripRef.current
    const thumb = thumbRefs.current[active]
    if (!strip || !thumb) return

    if (active === photos.length - 1) {
      // Last thumbnail — wrap strip back to the beginning
      strip.scrollTo({ left: 0, behavior: 'smooth' })
    } else {
      // Scroll so the active thumb sits at the left edge of the visible strip
      const thumbLeft = thumb.getBoundingClientRect().left
      const stripLeft = strip.getBoundingClientRect().left
      strip.scrollTo({
        left: strip.scrollLeft + (thumbLeft - stripLeft),
        behavior: 'smooth',
      })
    }
  }, [active, photos.length])

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

      {/* Thumbnail strip */}
      {photos.length > 1 && (
        <div
          ref={stripRef}
          className="flex gap-2 mt-3 overflow-x-auto pb-1"
          style={{ scrollbarWidth: 'none' }}
        >
          {photos.map((src, i) => (
            <button
              key={i}
              ref={(el) => { thumbRefs.current[i] = el }}
              onClick={() => setActive(i)}
              aria-label={`Fotka ${i + 1}`}
              aria-pressed={i === active}
              className={`
                relative shrink-0 rounded-lg overflow-hidden border-2
                transition-[border-color,opacity] duration-150
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60
                ${i === active
                  ? 'border-amber opacity-100'
                  : 'border-transparent opacity-55 hover:opacity-85 hover:border-white/25'}
              `}
              style={{ width: 80, height: 56 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${title} — náhľad ${i + 1}`}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </button>
          ))}
        </div>
      )}
    </>
  )
}