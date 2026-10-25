import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { afterEach, test } from 'node:test'
import { fetchCars, fetchCarById, parseFeed } from '../lib/feed'
import { getFeedUrl } from '../lib/config'

const fixture = readFileSync(new URL('../public/326481-2.xml', import.meta.url), 'utf8')
const originalFetch = globalThis.fetch
const originalEnv = { FEED_URL: process.env.FEED_URL, AUTOBAZAR_FEED_URL: process.env.AUTOBAZAR_FEED_URL }
afterEach(() => {
  globalThis.fetch = originalFetch
  for (const [key, value] of Object.entries(originalEnv)) {
    if (value === undefined) delete process.env[key]
    else process.env[key] = value
  }
})

test('runtime FEED_URL takes precedence and legacy name remains supported', () => {
  process.env.AUTOBAZAR_FEED_URL = 'https://legacy.example/feed'
  delete process.env.FEED_URL
  assert.equal(getFeedUrl(), 'https://legacy.example/feed')
  process.env.FEED_URL = ' https://current.example/feed '
  assert.equal(getFeedUrl(), 'https://current.example/feed')
  process.env.FEED_URL = ' '
  assert.equal(getFeedUrl(), 'https://legacy.example/feed')
})

test('parses and deduplicates advertisements in the repository XML fixture', () => {
  const cars = parseFeed(fixture)
  const ids = [...fixture.matchAll(/<idAdvertisement>([^<]+)<\/idAdvertisement>/g)].map(match => match[1])
  assert.equal(cars.length, new Set(ids).size)
  assert.ok(cars.length >= 6)
  assert.equal(cars[0].id, '28245323')
  assert.equal(cars[0].brand, 'Mercedes-Benz')
  assert.ok(cars[0].photos.length > 0)
  assert.ok(cars[0].price > 0)
  assert.ok(cars[0].contentExtend.includes('AMG'))
  assert.equal(new Set(cars.map(car => car.id)).size, cars.length)
})

test('missing configuration does not make a network request', async () => {
  delete process.env.FEED_URL
  delete process.env.AUTOBAZAR_FEED_URL
  globalThis.fetch = async () => { throw new Error('Must not fetch') }
  assert.deepEqual(await fetchCars(), [])
})

test('new requests use current feed and detail lookup works', async () => {
  process.env.FEED_URL = 'https://feed.example/inventory'
  let calls = 0
  globalThis.fetch = async (url, options) => {
    assert.equal(url, process.env.FEED_URL)
    assert.equal(options?.cache, 'no-store')
    assert.ok(options?.signal)
    calls++
    return new Response(calls === 1 ? fixture : fixture.replaceAll('28245323', 'NEW-ID'))
  }
  assert.equal((await fetchCars())[0].id, '28245323')
  assert.equal((await fetchCarById('NEW-ID'))?.id, 'NEW-ID')
  assert.equal(calls, 2)
})

test('upstream failures and invalid responses safely return an empty offer', async () => {
  process.env.FEED_URL = 'https://feed.example/inventory'
  globalThis.fetch = async () => new Response('Unavailable', { status: 503 })
  assert.deepEqual(await fetchCars(), [])
  globalThis.fetch = async () => new Response('<html>Access denied</html>')
  assert.deepEqual(await fetchCars(), [])
  globalThis.fetch = async () => { throw new Error('Timed out') }
  assert.deepEqual(await fetchCars(), [])
})

test('exact tags prevent contentExtend being read as content', () => {
  const cars = parseFeed('<advertisements><advertisement><idAdvertisement>1</idAdvertisement><contentExtend>Extras</contentExtend></advertisement></advertisements>')
  assert.equal(cars.length, 1)
  assert.equal(cars[0].content, '')
  assert.equal(cars[0].contentExtend, 'Extras')
  assert.deepEqual(parseFeed('<advertisements/>'), [])
})
