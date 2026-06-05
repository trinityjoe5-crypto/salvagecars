'use client'

import { useState } from 'react'
import { site } from '@/config/site'

export function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // TODO: Wire up form submission here.
    // Options:
    //   A) Email via Resend / SendGrid: POST to /api/contact with form data
    //   B) Supabase: insert into 'contacts' table
    //   C) Any other provider
    // Example:
    //   await fetch('/api/contact', { method: 'POST', body: JSON.stringify(form) })
    console.log('Form submitted (not wired up yet):', form)
    setSent(true)
  }

  return (
    <section
      id="kontakt"
      className="relative bg-graphite-700 py-20 sm:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber/30 to-transparent" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div data-reveal className="flex items-center gap-3 mb-4">
          <span className="h-[2px] w-6 bg-amber" aria-hidden="true" />
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber"
            style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
          >
            Kontakt
          </span>
        </div>

        <div data-reveal data-reveal-delay="80" className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <h2
            id="contact-heading"
            style={{
              fontFamily: 'var(--font-barlow), sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              letterSpacing: '-0.025em',
              color: '#ffffff',
              lineHeight: 1.1,
            }}
          >
            Spojte sa s <span style={{ color: '#E8870C' }}>nami</span>
          </h2>
        </div>

        <div data-reveal data-reveal-delay="160" className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Contact info */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              {[
                {
                  label: 'Telefón',
                  value: site.phoneDisplay,
                  href: `tel:${site.phone.replace(/\s/g, '')}`,
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C9.6 21 3 14.4 3 6c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                    </svg>
                  ),
                },
                {
                  label: 'E-mail',
                  value: site.email,
                  href: `mailto:${site.email}`,
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                },
                {
                  label: 'Adresa',
                  value: site.address,
                  href: undefined,
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke="currentColor" strokeWidth="1.75"/>
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="1.75"/>
                    </svg>
                  ),
                },
              ].map(({ label, value, href, icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-white/6"
                >
                  <span className="shrink-0 w-10 h-10 rounded-lg bg-amber/10 border border-amber/20 flex items-center justify-center text-amber">
                    {icon}
                  </span>
                  <div>
                    <p
                      className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-0.5"
                      style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
                    >
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-[15px] font-medium text-white hover:text-amber transition-colors duration-150"
                        style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
                      >
                        {value}
                      </a>
                    ) : (
                      <p
                        className="text-[15px] text-white/60"
                        style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
                      >
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-surface rounded-2xl p-7 sm:p-8 border border-white/6">
            {sent ? (
              <div className="flex flex-col items-center justify-center text-center py-10 gap-4">
                <div className="w-14 h-14 rounded-full bg-amber/15 border border-amber/30 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" stroke="#E8870C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3
                  className="text-[22px] font-bold text-white"
                  style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
                >
                  Správa odoslaná
                </h3>
                <p
                  className="text-[14px] text-white/50"
                  style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
                >
                  Ozveme sa vám čo najskôr.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', phone: '', message: '' }) }}
                  className="mt-2 text-[13px] text-amber hover:text-amber-600 underline underline-offset-2 transition-colors duration-150"
                  style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
                >
                  Odoslať ďalšiu správu
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <h3
                  className="text-[20px] font-bold text-white mb-1"
                  style={{ fontFamily: 'var(--font-barlow), sans-serif', letterSpacing: '-0.01em' }}
                >
                  Napíšte nám
                </h3>

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-name"
                    className="text-[12px] font-semibold uppercase tracking-widest text-white/40"
                    style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
                  >
                    Meno *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Vaše meno"
                    className="
                      w-full px-4 py-3 bg-graphite-600 text-white text-[15px] rounded-xl
                      border border-white/10
                      placeholder:text-white/25
                      focus:outline-none focus:border-amber/50 focus:ring-1 focus:ring-amber/30
                      transition-[border-color] duration-150
                    "
                    style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-phone"
                    className="text-[12px] font-semibold uppercase tracking-widest text-white/40"
                    style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
                  >
                    Telefón *
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+421 9XX XXX XXX"
                    className="
                      w-full px-4 py-3 bg-graphite-600 text-white text-[15px] rounded-xl
                      border border-white/10
                      placeholder:text-white/25
                      focus:outline-none focus:border-amber/50 focus:ring-1 focus:ring-amber/30
                      transition-[border-color] duration-150
                    "
                    style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-message"
                    className="text-[12px] font-semibold uppercase tracking-widest text-white/40"
                    style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
                  >
                    Správa
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Opíšte váš záujem alebo vozidlo, ktoré chcete predať..."
                    className="
                      w-full px-4 py-3 bg-graphite-600 text-white text-[15px] rounded-xl
                      border border-white/10
                      placeholder:text-white/25 resize-none
                      focus:outline-none focus:border-amber/50 focus:ring-1 focus:ring-amber/30
                      transition-[border-color] duration-150
                    "
                    style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
                  />
                </div>

                <button
                  type="submit"
                  className="
                    mt-1 w-full flex items-center justify-center gap-2.5
                    px-6 py-4 bg-amber text-white font-bold rounded-xl
                    hover:bg-amber-600 active:scale-[0.98]
                    transition-[background-color,transform] duration-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60
                  "
                  style={{ fontFamily: 'var(--font-barlow), sans-serif', fontSize: '16px', letterSpacing: '0.04em' }}
                >
                  ODOSLAŤ SPRÁVU
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}