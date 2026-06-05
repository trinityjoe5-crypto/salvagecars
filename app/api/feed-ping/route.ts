import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const url = process.env.AUTOBAZAR_FEED_URL

  if (!url) {
    return NextResponse.json({ error: 'AUTOBAZAR_FEED_URL is not set' }, { status: 500 })
  }

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      cache: 'no-store',
    })
    const text = await res.text()
    return NextResponse.json({
      status: res.status,
      ok: res.ok,
      urlSet: true,
      preview: text.slice(0, 300),
    })
  } catch (err) {
    return NextResponse.json({ error: String(err), urlSet: true }, { status: 500 })
  }
}