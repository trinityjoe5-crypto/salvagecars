'use client'

import { useState, useCallback, useEffect, useRef } from 'react'

interface Props {
  photos: string[]
  title: string
}

export function GalleryClient({ photos, title }: Props) {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const stripRef = useRef<HTMLDivElement>(null)
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([])
  const touchStartX = useRef(0)

  const prev = useCallback(() =>
    setActive((i) => (i - 1 + photos.length) % photos.length), [photos.length])
  const next = useCallback(() =>
    setActive((i) => (i + 1) % photos.length), [photos.length])

  // Auto-scroll strip when active changes
  useEffect(() => {
    const strip = stripRef.current
    const thumb = thumbRefs.current[active]
    if (!strip || !thumb) return
    if (active === photos.length - 1) {
      strip.scrollTo({ left: 0, behavior: 'smooth' })
    } else {
      const thumbLeft = thumb.getBoundingClientRect().left
      const stripLeft = strip.getBoundingClientRect().left
      strip.scrollTo({ left: strip.scrollLeft + (thumbLeft - stripLeft), behavior: 'smooth' })
    }
  }, [active, photos.length])

  // Keyboard + body scroll lock for lightbox
  useEffect(() => {
    if (!lightbox) return
    document.body.style.overflow = 'hidden'
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape')      setLightbox(false)
      if (e.key === 'ArrowLeft')   prev()
      if (e.key === 'ArrowRight')  next()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, prev, next])

  if (photos.length === 0) {
    return (
      <div className="w-full rounded-2xl bg-graphite-600 flex items-center justify-center text-white/20" style={{ aspectRatio: '16/9' }}>
        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M4 16l4-4 3 3 4-5 5 6H4zm16-12H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm-8 6a2 2 0 110-4 2 2 0 010 4z"/>
        </svg>
      </div>
    )
  }

  return (
    <>
      {/* ── Main photo ─────────────────────────────────────────── */}
      <div
        className="relative w-full rounded-2xl overflow-hidden bg-graphite-600 border border-white/8 cursor-zoom-in"
        style={{ aspectRatio: '16/9' }}
        onClick={() => setLightbox(true)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photos[active]}
          alt={`${title} — foto ${active + 1}`}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* Prev */}
        {photos.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label="Predchádzajúca fotka"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-graphite-800/70 hover:bg-graphite-800/90 text-white rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

        {/* Next */}
        {photos.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label="Nasledujúca fotka"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-graphite-800/70 hover:bg-graphite-800/90 text-white rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

        {/* Counter + expand hint */}
        {photos.length > 1 && (
          <span className="absolute bottom-3 right-3 px-2.5 py-1 bg-graphite-800/70 text-white/80 text-[12px] font-semibold rounded-md" style={{ fontFamily: 'var(--font-barlow), sans-serif' }}>
            {active + 1} / {photos.length}
          </span>
        )}

        {/* Expand icon hint */}
        <span className="absolute bottom-3 left-3 w-7 h-7 flex items-center justify-center bg-graphite-800/60 rounded-md opacity-70">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>

      {/* ── Thumbnail strip ────────────────────────────────────── */}
      {photos.length > 1 && (
        <div ref={stripRef} className="flex gap-2 mt-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {photos.map((src, i) => (
            <button
              key={i}
              ref={(el) => { thumbRefs.current[i] = el }}
              onClick={() => { setActive(i); setLightbox(true) }}
              aria-label={`Fotka ${i + 1}`}
              aria-pressed={i === active}
              className={`
                relative shrink-0 rounded-lg overflow-hidden border-2
                transition-[border-color,opacity] duration-150
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60
                ${i === active ? 'border-amber opacity-100' : 'border-transparent opacity-55 hover:opacity-85 hover:border-white/25'}
              `}
              style={{ width: 80, height: 56 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`${title} — náhľad ${i + 1}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      )}

      {/* ── Lightbox ───────────────────────────────────────────── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ animation: 'fadeIn 0.2s ease both' }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/92"
            onClick={() => setLightbox(false)}
          />

          {/* Image */}
          <div
            className="relative z-10 flex items-center justify-center w-full h-full px-16 py-12"
            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
            onTouchEnd={(e) => {
              const diff = touchStartX.current - e.changedTouches[0].clientX
              if (Math.abs(diff) > 50) { diff > 0 ? next() : prev() }
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photos[active]}
              alt={`${title} — foto ${active + 1}`}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                borderRadius: '12px',
                animation: 'fadeIn 0.18s ease both',
              }}
            />
          </div>

          {/* Close */}
          <button
            onClick={() => setLightbox(false)}
            aria-label="Zatvoriť"
            className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Prev */}
          {photos.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              aria-label="Predchádzajúca fotka"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}

          {/* Next */}
          {photos.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              aria-label="Nasledujúca fotka"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}

          {/* Counter */}
          {photos.length > 1 && (
            <span
              className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 px-3 py-1.5 bg-white/10 text-white/80 text-[13px] font-semibold rounded-full"
              style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
            >
              {active + 1} / {photos.length}
            </span>
          )}
        </div>
      )}
    </>
  )
}