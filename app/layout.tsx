import type { Metadata } from 'next'
import { Barlow_Condensed, Figtree } from 'next/font/google'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { StickyCallButton } from '@/components/ui/StickyCallButton'
import { site } from '@/config/site'
import './globals.css'

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-barlow',
  display: 'swap',
})

const figtree = Figtree({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-figtree',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL('https://salvagecars.sk'), // TODO: update to real domain
  openGraph: {
    type: 'website',
    locale: 'sk_SK',
    siteName: site.name,
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="sk"
      className={`${barlowCondensed.variable} ${figtree.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyCallButton />
      </body>
    </html>
  )
}