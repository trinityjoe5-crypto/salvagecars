import { Hero } from '@/components/sections/Hero'
import { WhatWeDo } from '@/components/sections/WhatWeDo'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { FeaturedCars } from '@/components/sections/FeaturedCars'
import { Vykup } from '@/components/sections/Vykup'
import { Contact } from '@/components/sections/Contact'
import { fetchCars } from '@/lib/feed'

export const revalidate = 3600

export default async function HomePage() {
  const featured = (await fetchCars()).slice(0, 3)

  return (
    <>
      <Hero />
      <WhatWeDo />
      <HowItWorks />
      <FeaturedCars cars={featured} />
      <Vykup />
      <Contact />
    </>
  )
}