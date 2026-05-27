export type Fuel = 'diesel' | 'benzin' | 'hybrid' | 'elektro'
export type Transmission = 'manualna' | 'automaticka'

export interface Car {
  id: string
  title: string
  price: number           // EUR
  year: number
  mileageKm: number
  fuel: Fuel
  transmission: Transmission
  shortDescription: string
  longDescription: string
  damageDescription: string
  images: string[]        // URLs — first image is thumbnail/hero
  sourceUrl?: string      // optional link to autobazar.eu listing
}
