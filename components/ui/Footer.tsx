import Link from 'next/link'
import { Logo } from './Logo'
import { site } from '@/config/site'

export function Footer() {
  return (
    <footer className="bg-graphite-800 border-t border-white/6">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">

          {/* Brand column */}
          <div>
            <Logo size="md" />
            <p
              className="mt-4 text-[14px] text-white/50 leading-relaxed max-w-[260px]"
              style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
            >
              {site.tagline}. Kupujeme a predávame havarované vozidlá na Slovensku za najlepšie ceny.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p
              className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-4"
              style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
            >
              Navigácia
            </p>
            <nav className="flex flex-col gap-2.5">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[14px] text-white/60 hover:text-white transition-colors duration-150"
                  style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p
              className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-4"
              style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
            >
              Kontakt
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href={`tel:${site.phone.replace(/\s/g, '')}`}
                className="text-[14px] text-white/60 hover:text-amber transition-colors duration-150"
                style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
              >
                {site.phoneDisplay}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="text-[14px] text-white/60 hover:text-amber transition-colors duration-150"
                style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
              >
                {site.email}
              </a>
              <p
                className="text-[14px] text-white/40"
                style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
              >
                {site.address}
              </p>
              <p
                className="text-[13px] text-white/30 mt-1"
                style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
              >
                {site.ico} &nbsp;·&nbsp; {site.dic}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p
            className="text-[13px] text-white/30"
            style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
          >
            © {site.year} {site.name}. Všetky práva vyhradené.
          </p>
        </div>
      </div>
    </footer>
  )
}