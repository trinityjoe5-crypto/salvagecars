'use client'

import { useEffect } from 'react'

export function ScrollRevealProvider() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))

    // Hide only elements currently below the viewport
    els.forEach(el => {
      const top = el.getBoundingClientRect().top
      if (top >= window.innerHeight * 0.98) {
        el.style.opacity = '0'
        el.style.transform = 'translateY(10px)'
      }
    })

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const delay = el.dataset.revealDelay ?? '0'
          el.style.transition = `opacity 0.38s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms, transform 0.38s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms`
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          observer.unobserve(el)
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    )

    els.forEach(el => {
      if (el.style.opacity === '0') observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return null
}