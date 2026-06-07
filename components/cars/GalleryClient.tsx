'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'

interface Props {
  photos: string[]
  title: string
}

export function GalleryClient({ photos, title }: Props) {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const [loaded, setLoaded] = useState<Record<number, boolean>>({})
  const stripRef = useRef<HTMLDivElement>(null)
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([])
  const touchStartX = useRef(0)

  const prev = useCallback(() =>
    setActive((i) => (i - 1 + photos.length) % photos.length), [photos.length])
  const next = useCallback(() =>
    setActive((i) => (i + 1) % photos.length), [photos.length])

  // Auto-scroll thumbnail strip
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

  // Keyboard nav + body scroll lock
  useEffect(() => {
    if (!lightbox) return
    document.body.style.overflow = 'hidden'
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape')     setLightbox(false)
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
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
      {/* ── Main photo ─────────────────────────────────────── */}
      <div
        className="relative w-full rounded-2xl overflow-hidden bg-graphite-600 border border-white/8 cursor-zoom-in"
        style={{ aspectRatio: '16/9' }}
        onClick={() => setLightbox(true)}
      >
        {/* Loading skeleton — visible until image loads */}
        {!loaded[active] && (
          <div className="absolute inset-0 bg-graphite-600 animate-pulse" />
        )}

        <Image
          key={active}
          src={photos[active]}
          alt={`${title} — foto ${active + 1}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) calc(100vw - 2rem), calc(100vw - 440px)"
          className="object-cover"
          priority
          onLoad={() => setLoaded((prev) => ({ ...prev, [active]: true }))}
        />

        {photos.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label="Predchádzajúca fotka"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

        {photos.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label="Nasledujúca fotka"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

        {photos.length > 1 && (
          <span className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/50 text-white/80 text-[12px] font-semibold rounded-md" style={{ fontFamily: 'var(--font-barlow), sans-serif' }}>
            {active + 1} / {photos.length}
          </span>
        )}

        <span className="absolute bottom-3 left-3 w-7 h-7 flex items-center justify-center bg-black/50 rounded-md">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>

      {/* ── Thumbnail strip ────────────────────────────────── */}
      {photos.length > 1 && (
        <div ref={stripRef} className="flex gap-2 mt-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {photos.map((src, i) => (
            <button
              key={i}
              ref={(el) => { thumbRefs.current[i] = el }}
              onClick={() => setActive(i)}
              aria-label={`Fotka ${i + 1}`}
              aria-pressed={i === active}
              className={`relative shrink-0 rounded-lg overflow-hidden border-2 bg-graphite-600 transition-[border-color,opacity] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60 ${i === active ? 'border-amber opacity-100' : 'border-transparent opacity-55 hover:opacity-85 hover:border-white/25'}`}
              style={{ width: 80, height: 56 }}
            >
              <Image
                src={src}
                alt={`${title} — náhľad ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* ── Lightbox — rendered via portal outside any transform context ── */}
      {lightbox && createPortal(
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 9999, animation: 'fadeIn 0.2s ease both' }}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
          onTouchEnd={(e) => {
            const diff = touchStartX.current - e.changedTouches[0].clientX
            if (Math.abs(diff) > 50) { diff > 0 ? next() : prev() }
          }}
        >
          {/* Backdrop */}
          <div
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.92)', cursor: 'zoom-out' }}
            onClick={() => setLightbox(false)}
          />

          {/* Image — fills the inset area, contain-fit preserves aspect ratio */}
          <div
            style={{ position: 'absolute', inset: '52px 12px 44px 12px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image
                key={active}
                src={photos[active]}
                alt={`${title} — foto ${active + 1}`}
                fill
                sizes="100vw"
                priority
                style={{ objectFit: 'contain', borderRadius: '8px', animation: 'fadeIn 0.15s ease both' }}
              />
            </div>
          </div>

          {/* Close */}
          <button
            onClick={() => setLightbox(false)}
            aria-label="Zatvoriť"
            style={{ position: 'absolute', top: 12, right: 12, zIndex: 1, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', borderRadius: '50%', cursor: 'pointer', border: 'none', color: 'white' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.75)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.5)')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Prev */}
          {photos.length > 1 && (
            <button
              onClick={prev}
              aria-label="Predchádzajúca fotka"
              style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', zIndex: 1, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', borderRadius: '50%', cursor: 'pointer', border: 'none', color: 'white' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.75)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.5)')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}

          {/* Next */}
          {photos.length > 1 && (
            <button
              onClick={next}
              aria-label="Nasledujúca fotka"
              style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', zIndex: 1, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', borderRadius: '50%', cursor: 'pointer', border: 'none', color: 'white' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.75)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.5)')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}

          {/* Counter */}
          {photos.length > 1 && (
            <div
              style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', zIndex: 1, padding: '5px 14px', background: 'rgba(0,0,0,0.5)', borderRadius: 20, color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-barlow), sans-serif', whiteSpace: 'nowrap' }}
            >
              {active + 1} / {photos.length}
            </div>
          )}
        </div>,
        document.body
      )}
    </>
  )
}
