import { NextResponse } from 'next/server'
import { fetchCars } from '@/lib/feed'

export const dynamic = 'force-dynamic'

export async function GET() {
  const url = process.env.AUTOBAZAR_FEED_URL

  // Step 1: check env var
  if (!url) {
    return NextResponse.json({ step: 'env', error: 'AUTOBAZAR_FEED_URL not set' }, { status: 500 })
  }

  // Step 2: raw fetch
  let rawPreview = ''
  let rawStatus = 0
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
      cache: 'no-store',
    })
    rawStatus = res.status
    rawPreview = (await res.text()).slice(0, 200)
  } catch (e) {
    return NextResponse.json({ step: 'fetch', error: String(e) }, { status: 500 })
  }

  // Step 3: full fetchCars() pipeline
  let cars: Awaited<ReturnType<typeof fetchCars>> = []
  let parseError = ''
  try {
    cars = await fetchCars()
  } catch (e) {
    parseError = String(e)
  }

  return NextResponse.json({
    env: 'ok',
    rawStatus,
    rawPreview,
    carsCount: cars.length,
    firstCar: cars[0] ? { id: cars[0].id, title: cars[0].title, price: cars[0].price } : null,
    parseError: parseError || null,
  })
}