export function getFeedUrl(): string | undefined {
  return process.env.FEED_URL?.trim() || process.env.AUTOBAZAR_FEED_URL?.trim() || undefined
}
