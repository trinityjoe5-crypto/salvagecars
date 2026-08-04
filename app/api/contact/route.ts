import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { site } from '@/config/site'

export async function POST(request: Request) {
  const { name, phone, message } = await request.json()

  if (!name || !phone) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
  }

  const resend = new Resend(apiKey)

  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev'

  const { error } = await resend.emails.send({
    from: `${site.name} <${fromEmail}>`,
    to: site.email,
    subject: `Nová správa z webu — ${name}`,
    text: `Meno: ${name}\nTelefón: ${phone}\n\nSpráva:\n${message || '—'}`,
  })

  if (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
