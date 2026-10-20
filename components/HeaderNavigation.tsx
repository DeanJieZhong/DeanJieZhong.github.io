'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import styles from './Header.module.css'

export default function HeaderNavigation({
  pathname,
  enabled = true,
}: {
  pathname: string
  enabled?: boolean
}) {
  const [openItem, setOpenItem] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const focusFirstLink = useRef(false)

  useEffect(() => {
    if (!enabled) setOpenItem(null)
  }, [enabled])

  const closeWithEscape = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Escape') return
    event.preventDefault()
    setOpenItem(null)
    event.currentTarget
      .closest('li[data-section]')
      ?.querySelector<HTMLAnchorElement>('a[aria-controls]')
      ?.focus()
  }

  useEffect(() => {
    if (!openItem) return

    // Wait for React to remove inert before moving keyboard focus into the panel.
    if (focusFirstLink.current) {
      navRef.current?.querySelector<HTMLAnchorElement>('[data-open="true"] ul a')?.focus()
      focusFirstLink.current = false
    }

    const dismiss = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenItem(null)
    }

    document.addEventListener('pointerdown', dismiss)
    return () => document.removeEventListener('pointerdown', dismiss)
  }, [openItem])

  return (
    <nav ref={navRef} className={styles.desktopNav} aria-label="Main navigation">
      <ul className={styles.navList}>
        {headerNavLinks.map((link) => {
          const isOpen = openItem === link.href
          const hasChildren = Boolean(link.children?.length)
          const id = `header-${link.title.toLowerCase()}`

          return (
            <li
              key={link.href}
              className={styles.navItem}
              data-section={link.title.toLowerCase()}
              data-open={isOpen}
              onPointerEnter={(event) => {
                if (event.pointerType === 'mouse') setOpenItem(link.href)
              }}
              onPointerLeave={(event) => {
                if (!event.currentTarget.contains(document.activeElement)) setOpenItem(null)
              }}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setOpenItem(null)
              }}
            >
              <Link
                id={`${id}-trigger`}
                href={link.href}
                className={styles.trigger}
                aria-expanded={hasChildren ? isOpen : undefined}
                aria-controls={hasChildren ? `${id}-panel` : undefined}
                aria-current={pathname === link.href ? 'page' : undefined}
                onClick={() => setOpenItem(null)}
                onKeyDown={(event) => {
                  if (!hasChildren) return
                  closeWithEscape(event)
                  if (event.key === ' ') {
                    event.preventDefault()
                    setOpenItem(isOpen ? null : link.href)
                  }
                  if (event.key === 'ArrowDown') {
                    event.preventDefault()
                    if (isOpen) {
                      event.currentTarget
                        .closest('li')
                        ?.querySelector<HTMLAnchorElement>('ul a')
                        ?.focus()
                    } else {
                      focusFirstLink.current = true
                      setOpenItem(link.href)
                    }
                  }
                }}
              >
                <span className={styles.label} data-nav-label>
                  {link.title}
                </span>
              </Link>

              {/* One clipping surface keeps the square, white panel and bold title in sync. */}
              <div className={styles.reveal} data-nav-reveal>
                <div className={styles.titleSurface} aria-hidden="true">
                  <span className={styles.revealedLabel}>{link.title}</span>
                </div>
                {hasChildren && (
                  <div
                    id={`${id}-panel`}
                    className={styles.dropdown}
                    aria-labelledby={`${id}-trigger`}
                    aria-hidden={!isOpen}
                    inert={!isOpen}
                  >
                    <ul className={styles.submenu}>
                      {link.children?.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={styles.navigationLink}
                            aria-current={pathname === child.href ? 'page' : undefined}
                            onClick={() => setOpenItem(null)}
                            onKeyDown={closeWithEscape}
                          >
                            <span className={styles.navigationLabel}>{child.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
