'use client'

import { useEffect } from 'react'
import { useTranslation } from '@/lib/i18n'

export function ScrollRevealProvider() {
  const { lang } = useTranslation()

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))

    // Reset all elements to hidden so they animate in again
    els.forEach(el => {
      el.style.transition = 'none'
      el.style.opacity = '0'
      el.style.transform = 'translateY(26px)'
    })

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const delay = el.dataset.revealDelay ?? '0'
          el.style.transition = `opacity 0.85s cubic-bezier(0.215,0.61,0.355,1) ${delay}ms, transform 0.85s cubic-bezier(0.215,0.61,0.355,1) ${delay}ms`
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          observer.unobserve(el)
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -60px 0px' }
    )

    els.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [lang])

  return null
}