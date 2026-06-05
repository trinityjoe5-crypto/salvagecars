'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  target: number
  suffix?: string
  label: string
  duration?: number
  delay?: number  // ms before count starts (e.g. after hero fade-in)
}

export function CountUp({ target, suffix = '', label, duration = 1600, delay = 0 }: Props) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true
        observer.disconnect()

        setTimeout(() => {
          const startTime = performance.now()

          function tick(now: number) {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            // Ease-out cubic: fast at start, slow near end
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }

          requestAnimationFrame(tick)
        }, delay)
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration, delay])

  return (
    <div ref={ref} className="flex flex-col">
      <span
        className="text-[34px] sm:text-[28px] font-black text-white leading-none tabular-nums"
        style={{ fontFamily: 'var(--font-barlow), sans-serif', letterSpacing: '-0.03em' }}
      >
        {count}{suffix}
      </span>
      <span
        className="text-[13px] sm:text-[12px] text-white/40 mt-1 sm:mt-0.5"
        style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
      >
        {label}
      </span>
    </div>
  )
}