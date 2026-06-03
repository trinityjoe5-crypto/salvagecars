import { XMLParser } from 'fast-xml-parser'
import { FEED_URL, REVALIDATE_SECONDS } from './config'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface FeedCar {
  id: string
  brand: string
  model: string
  title: string
  content: string
  contentExtend: string   // vehicle features / výbava
  contentOptions: string  // generic sales conditions — shown collapsed
  link: string            // original autobazar.sk URL
  isReserved: boolean
  timeCreated: string
  photos: string[]
  // parsed params
  price: number
  year?: number
  mileageKm?: number
  fuelLabel?: string
  transmissionLabel?: string
  powerKw?: number
  engineCc?: number
  typeLabel?: string          // druh_value (Autokaravan, Karavan…)
  bedCount?: number
  maxWeightLabel?: string
  badges: string[]            // doplnujuce-udaje_value split by "|"
  stateLabel?: string         // stav_value
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function cdata(val: unknown): string {
  if (val === null || val === undefined) return ''
  if (typeof val === 'object' && '__cdata' in (val as Record<string, unknown>)) {
    return String((val as Record<string, unknown>).__cdata ?? '')
  }
  return String(val)
}

function cdataInt(val: unknown): number | undefined {
  const s = cdata(val).trim()
  if (!s || s === '-1' || s === '0') return undefined
  const n = parseInt(s, 10)
  return isNaN(n) ? undefined : n
}

function cdataStr(val: unknown): string | undefined {
  const s = cdata(val).trim()
  return s || undefined
}

// ─────────────────────────────────────────────────────────────────────────────
// Parser
// ─────────────────────────────────────────────────────────────────────────────

const parser = new XMLParser({
  ignoreAttributes: false,
  cdataPropName: '__cdata',
  isArray: (name) => ['advertisement', 'photo'].includes(name),
})

function parseAd(ad: Record<string, unknown>): FeedCar {
  const p = (ad.params ?? {}) as Record<string, unknown>

  const photosObj = (ad.photos ?? {}) as Record<string, unknown>
  const rawPhotos = Array.isArray(photosObj.photo)
    ? (photosObj.photo as unknown[])
    : photosObj.photo
    ? [photosObj.photo]
    : []
  const photos = rawPhotos.map(cdata).filter(Boolean)

  const badgeRaw = cdata(p['doplnujuce-udaje_value'])
  const badges = badgeRaw
    ? badgeRaw.split('|').map((b) => b.trim()).filter(Boolean)
    : []

  return {
    id: cdata(ad.idAdvertisement),
    brand: cdata(ad.brand),
    model: cdata(ad.model),
    title: cdata(ad.title),
    content: cdata(ad.content),
    contentExtend: cdata(ad.contentExtend),
    contentOptions: cdata(ad.contentOptions),
    link: cdata(ad.link),
    isReserved: cdata(ad.isReserved) === 'true',
    timeCreated: cdata(ad.timeCreated),
    photos,
    price: parseInt(cdata(p.cena), 10) || 0,
    year: cdataInt(p.rok),
    mileageKm: cdataInt(p['najazdene-km']),
    fuelLabel: cdataStr(p.palivo_value),
    transmissionLabel: cdataStr(p.prevodovka_value),
    powerKw: cdataInt(p['vykon-motora']),
    engineCc: cdataInt(p['objem-motora']),
    typeLabel: cdataStr(p.druh_value),
    bedCount: cdataInt(p['pocet-lozok']),
    maxWeightLabel: cdataStr(p['maximalna-hmotnost_value']),
    badges,
    stateLabel: cdataStr(p.stav_value),
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

export async function fetchCars(): Promise<FeedCar[]> {
  try {
    const res = await fetch(FEED_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SalvageCarsBot/1.0)',
      },
      next: { revalidate: REVALIDATE_SECONDS },
    })

    if (!res.ok) {
      console.error(`[feed] HTTP ${res.status} from feed URL`)
      return []
    }

    const xml = await res.text()
    const parsed = parser.parse(xml)
    const ads: unknown[] = parsed?.advertisements?.advertisement ?? []

    return ads.map((ad) => parseAd(ad as Record<string, unknown>))
  } catch (err) {
    console.error('[feed] fetch/parse error:', err)
    return []
  }
}

export async function fetchCarById(id: string): Promise<FeedCar | undefined> {
  const cars = await fetchCars()
  return cars.find((c) => c.id === id)
}