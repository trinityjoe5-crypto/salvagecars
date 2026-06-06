'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Logo } from './Logo'
import { site } from '@/config/site'
import { useTranslation, LANGS, type Lang } from '@/lib/i18n'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { lang, setLang, t } = useTranslation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { href: '/',                 label: t.nav.home },
    { href: '/ponuka-vozidiel',  label: t.nav.listings },
    { href: '/#vykup',           label: t.nav.buyout },
    { href: '/#kontakt',         label: t.nav.contact },
  ]

  function LangSwitcher({ mobile = false }: { mobile?: boolean }) {
    return (
      <div className={`flex items-center gap-1 ${mobile ? 'px-4 pt-2 pb-1' : ''}`}>
        {LANGS.map(({ code, label, flag }) => (
          <button
            key={code}
            onClick={() => { setLang(code as Lang); if (mobile) setOpen(false) }}
            className={`
              flex items-center gap-1 px-2 py-1 rounded-md text-[12px] font-semibold
              transition-[background-color,color] duration-150
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60
              ${lang === code
                ? 'bg-amber/15 text-amber'
                : 'text-white/40 hover:text-white/70 hover:bg-white/6'}
            `}
            style={{ fontFamily: 'var(--font-barlow), sans-serif', letterSpacing: '0.05em' }}
            aria-pressed={lang === code}
          >
            <span>{flag}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>
    )
  }

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-40
        transition-[background-color,box-shadow] duration-300
        ${scrolled
          ? 'bg-graphite-800/98 shadow-[0_1px_0_rgba(255,255,255,0.06)]'
          : 'bg-transparent'}
      `}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">

        <Logo />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Hlavná navigácia">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="
                px-4 py-2 text-[14px] font-medium text-white/70
                hover:text-white rounded-lg
                hover:bg-white/6 active:scale-95
                transition-[color,background-color,transform] duration-150
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60
              "
              style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
            >
              {item.label}
            </Link>
          ))}

          {/* Language switcher */}
          <div className="ml-2 flex items-center gap-0.5 border-l border-white/10 pl-3">
            <LangSwitcher />
          </div>

          <a
            href={`tel:${site.phone.replace(/\s/g, '')}`}
            className="
              ml-3 flex items-center gap-2 px-4 py-2
              bg-amber text-white text-[14px] font-bold rounded-lg
              hover:bg-amber-600 active:scale-95
              transition-[background-color,transform] duration-150
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60
            "
            style={{ fontFamily: 'var(--font-barlow), sans-serif', letterSpacing: '0.02em' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C9.6 21 3 14.4 3 6c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
            </svg>
            {site.phoneDisplay}
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="
            md:hidden w-10 h-10 flex items-center justify-center
            text-white rounded-lg hover:bg-white/8
            transition-colors duration-150
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60
          "
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Zatvoriť menu' : 'Otvoriť menu'}
          aria-expanded={open}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            ) : (
              <>
                <line x1="3" y1="6"  x2="21" y2="6"  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`
          md:hidden overflow-hidden
          transition-[max-height,opacity] duration-300 ease-in-out
          bg-graphite-800 border-t border-white/6
          ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <nav className="px-5 py-4 flex flex-col gap-1" aria-label="Mobilná navigácia">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="
                px-4 py-3 text-[15px] font-medium text-white/80
                hover:text-white rounded-lg hover:bg-white/6 active:scale-95
                transition-[color,background-color,transform] duration-150
              "
              style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
            >
              {item.label}
            </Link>
          ))}

          {/* Language switcher mobile */}
          <LangSwitcher mobile />

          <a
            href={`tel:${site.phone.replace(/\s/g, '')}`}
            onClick={() => setOpen(false)}
            className="
              mt-2 flex items-center justify-center gap-2
              px-4 py-3.5 bg-amber text-white font-bold rounded-xl
              hover:bg-amber-600 transition-colors duration-150
            "
            style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C9.6 21 3 14.4 3 6c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
            </svg>
            {site.phoneDisplay}
          </a>
        </nav>
      </div>
    </header>
  )
}