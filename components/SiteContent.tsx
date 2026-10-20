'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import Header from './Header'
import SectionContainer, { sectionContainerClassName } from './SectionContainer'
import { HomeNavigationContext } from './HomeNavigationContext'
import styles from './HomeHero.module.css'

export default function SiteContent({ children }: { children: ReactNode }) {
  const isHome = usePathname() === '/'
  const [hasVisitedInternalPage, setHasVisitedInternalPage] = useState(!isHome)
  const headerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<SVGSVGElement>(null)
  const [controlsReady, setControlsReady] = useState(false)
  const intro = isHome && !hasVisitedInternalPage

  useEffect(() => {
    if (!isHome) {
      setHasVisitedInternalPage(true)
      return
    }
    if (document.referrer) {
      const referrer = new URL(document.referrer)
      if (
        referrer.origin === window.location.origin &&
        referrer.pathname !== window.location.pathname
      ) {
        setHasVisitedInternalPage(true)
      }
    }
  }, [isHome])

  return (
    <HomeNavigationContext.Provider value={{ intro, headerRef, logoRef, setControlsReady }}>
      <div
        ref={headerRef}
        className={isHome ? styles.homeNavigation : undefined}
        data-intro={intro || undefined}
        inert={intro}
      >
        <SectionContainer>
          <Header
            morphingLogo={intro}
            introControls={intro}
            controlsReady={controlsReady}
            logoRef={logoRef}
          />
        </SectionContainer>
      </div>
      <main className={isHome ? undefined : sectionContainerClassName}>{children}</main>
    </HomeNavigationContext.Provider>
  )
}
