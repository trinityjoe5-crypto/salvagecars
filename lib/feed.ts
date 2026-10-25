import { getFeedUrl } from './config'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface FeedCar {
  id: string
  brand: string
  model: string
  title: string
  content: string
  contentExtend: string
  contentOptions: string
  link: string
  isReserved: boolean
  timeCreated: string
  photos: string[]
  price: number
  year?: number
  mileageKm?: number
  fuelLabel?: string
  transmissionLabel?: string
  powerKw?: number
  engineCc?: number
  typeLabel?: string
  bedCount?: number
  maxWeightLabel?: string
  badges: string[]
  stateLabel?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Regex-based XML parser — no external dependencies, works in all envs
// ─────────────────────────────────────────────────────────────────────────────

function getTag(xml: string, tag: string): string {
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([^<]*))<\\/${tag}>`)
  const m = xml.match(re)
  if (!m) return ''
  return (m[1] ?? m[2] ?? '').trim()
}

function getTagAll(xml: string, tag: string): string[] {
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([^<]*))<\\/${tag}>`, 'g')
  const results: string[] = []
  let m: RegExpExecArray | null
  while ((m = re.exec(xml)) !== null) {
    const val = (m[1] ?? m[2] ?? '').trim()
    if (val) results.push(val)
  }
  return results
}

function getBlock(xml: string, tag: string): string {
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${tag}>`)
  const m = xml.match(re)
  return m ? m[0] : ''
}

function getBlockAll(xml: string, tag: string): string[] {
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${tag}>`, 'g')
  const results: string[] = []
  let m: RegExpExecArray | null
  while ((m = re.exec(xml)) !== null) {
    results.push(m[0])
  }
  return results
}

function toInt(s: string): number | undefined {
  if (!s || s === '-1' || s === '0') return undefined
  const n = parseInt(s, 10)
  return isNaN(n) ? undefined : n
}

function parseAd(xml: string): FeedCar {
  const params = getBlock(xml, 'params')
  const photosBlock = getBlock(xml, 'photos')
  const photos = getTagAll(photosBlock, 'photo')

  const badgeRaw = getTag(params, 'doplnujuce-udaje_value')
  const badges = badgeRaw ? badgeRaw.split('|').map(b => b.trim()).filter(Boolean) : []

  return {
    id: getTag(xml, 'idAdvertisement'),
    brand: getTag(xml, 'brand'),
    model: getTag(xml, 'model'),
    title: getTag(xml, 'title'),
    content: getTag(xml, 'content'),
    contentExtend: getTag(xml, 'contentExtend'),
    contentOptions: getTag(xml, 'contentOptions'),
    link: getTag(xml, 'link'),
    isReserved: getTag(xml, 'isReserved') === 'true',
    timeCreated: getTag(xml, 'timeCreated'),
    photos,
    price: parseInt(getTag(params, 'cena'), 10) || 0,
    year: toInt(getTag(params, 'rok')),
    mileageKm: toInt(getTag(params, 'najazdene-km')),
    fuelLabel: getTag(params, 'palivo_value') || undefined,
    transmissionLabel: getTag(params, 'prevodovka_value') || undefined,
    powerKw: toInt(getTag(params, 'vykon-motora')),
    engineCc: toInt(getTag(params, 'objem-motora')),
    typeLabel: getTag(params, 'druh_value') || undefined,
    bedCount: toInt(getTag(params, 'pocet-lozok')),
    maxWeightLabel: getTag(params, 'maximalna-hmotnost_value') || undefined,
    badges,
    stateLabel: getTag(params, 'stav_value') || undefined,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

export function parseFeed(xml: string): FeedCar[] {
  const cars = getBlockAll(xml, 'advertisement').map(parseAd).filter(car => car.id)
  // Some exports repeat the same inventory; render each vehicle only once.
  return [...new Map(cars.map(car => [car.id, car])).values()]
}

export async function fetchCars(): Promise<FeedCar[]> {
  const url = getFeedUrl()
  if (!url) {
    console.error('[feed] FEED_URL or AUTOBAZAR_FEED_URL is not configured')
    return []
  }
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(15000),
    })

    if (!res.ok) {
      console.error(`[feed] HTTP ${res.status}`)
      return []
    }

    const xml = await res.text()
    const cars = parseFeed(xml)
    if (cars.length === 0) console.error('[feed] no valid advertisements found')
    return cars
  } catch {
    // URLs can contain feed access tokens; do not log fetch exceptions.
    console.error('[feed] request failed or timed out')
    return []
  }
}

export async function fetchCarById(id: string): Promise<FeedCar | undefined> {
  const cars = await fetchCars()
  return cars.find((c) => c.id === id)
}