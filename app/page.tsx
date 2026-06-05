import { Hero } from '@/components/sections/Hero'
import { WhatWeDo } from '@/components/sections/WhatWeDo'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { FeaturedCars } from '@/components/sections/FeaturedCars'
import { Vykup } from '@/components/sections/Vykup'
import { Contact } from '@/components/sections/Contact'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <HowItWorks />
      <FeaturedCars />
      <Vykup />
      <Contact />
    </>
  )
}