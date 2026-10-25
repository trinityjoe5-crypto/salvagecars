import { NextResponse } from 'next/server'
import { fetchCars } from '@/lib/feed'
import { getFeedUrl } from '@/lib/config'

export const dynamic = 'force-dynamic'

export async function GET() {
  if (!getFeedUrl()) {
    return NextResponse.json({ ok: false, error: 'Feed is not configured' }, { status: 503 })
  }
  const cars = await fetchCars()
  // Never expose feed URLs, keys, raw provider responses or contact credentials.
  return NextResponse.json(
    { ok: cars.length > 0, carsCount: cars.length },
    { status: cars.length > 0 ? 200 : 503, headers: { 'Cache-Control': 'no-store' } },
  )
}
