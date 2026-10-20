'use client'

import {
  createContext,
  useContext,
  type RefObject,
  type Dispatch,
  type SetStateAction,
} from 'react'

export const HomeNavigationContext = createContext<{
  intro: boolean
  headerRef: RefObject<HTMLDivElement | null>
  logoRef: RefObject<SVGSVGElement | null>
  setControlsReady: Dispatch<SetStateAction<boolean>>
} | null>(null)

export function useHomeNavigation() {
  const navigation = useContext(HomeNavigationContext)
  if (!navigation) throw new Error('HomeHero requires SiteContent')
  return navigation
}
