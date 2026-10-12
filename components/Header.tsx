'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import siteMetadata from '@/data/siteMetadata'
import Link from './Link'
import HeaderNavigation from './HeaderNavigation'
import SearchButton from './SearchButton'
import styles from './Header.module.css'

const MobileNav = dynamic(() => import('./MobileNav'), { ssr: false })

const Header = () => {
  const pathname = usePathname().replace(/\/$/, '') || '/'
  const [heightScale, setHeightScale] = useState(0.75)

  useEffect(() => {
    // Local comparisons only; production keeps the selected default height.
    if (process.env.NODE_ENV !== 'development') return

    const reduction = new URLSearchParams(window.location.search).get('headerReduction')
    if (reduction !== null && ['0', '10', '20', '25', '30'].includes(reduction)) {
      setHeightScale(1 - Number(reduction) / 100)
    }
  }, [])

  return (
    <header
      className={`${styles.header} ${siteMetadata.stickyNav ? styles.sticky : ''}`}
      style={{ '--header-height-scale': heightScale } as CSSProperties}
    >
      <div className={styles.background} aria-hidden="true" />

      <Link
        id="site-home"
        href="/"
        aria-label={`${siteMetadata.headerTitle} — Home`}
        className={styles.home}
      >
        <svg viewBox="0 0 126 24" className={styles.logo} aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M0 0h24v24H0zM34 0h24v24H34zM68 0h24v24H68zM102 0h24v24h-24z"
          />
        </svg>
      </Link>

      <div className={styles.controls}>
        <HeaderNavigation key={`desktop-${pathname}`} pathname={pathname} />
        <div className={styles.search}>
          <SearchButton />
        </div>
        <MobileNav key={`mobile-${pathname}`} />
      </div>
    </header>
  )
}

export default Header
