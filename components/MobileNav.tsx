'use client'

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import styles from './Header.module.css'

const MobileNav = () => {
  const pathname = usePathname().replace(/\/$/, '') || '/'
  const [navShow, setNavShow] = useState(false)

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)')
    const closeOnDesktop = () => {
      if (desktop.matches) setNavShow(false)
    }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])

  return (
    <>
      <button
        type="button"
        aria-label="Open navigation"
        aria-expanded={navShow}
        onClick={() => setNavShow(true)}
        className="interaction-icon grid h-12 w-10 place-items-center text-white md:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
          className="h-7 w-7"
        >
          {[0, 1, 2].map((line) => (
            <path
              key={line}
              d={`M3 ${6 + line * 4}h14`}
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={`var(--home-menu-line-${line}, 0)`}
              opacity={`var(--home-menu-line-${line}-visible, 1)`}
            />
          ))}
        </svg>
      </button>
      <Dialog open={navShow} onClose={() => setNavShow(false)} className="relative z-[70]">
        <div className="fixed inset-0 bg-black/25" aria-hidden="true" />
        <DialogPanel
          transition
          className="fixed inset-y-0 right-0 w-full overflow-y-auto bg-white text-black transition duration-300 ease-out data-closed:translate-x-full motion-reduce:transition-none sm:max-w-md"
        >
          <DialogTitle className="sr-only">Navigation</DialogTitle>
          <button
            type="button"
            className="interaction-icon absolute top-4 right-4 grid h-12 w-12 place-items-center"
            aria-label="Close navigation"
            onClick={() => setNavShow(false)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path d="m6 6 12 12M18 6 6 18" strokeWidth="1.5" />
            </svg>
          </button>
          <nav aria-label="Mobile navigation" className="px-8 pt-20 pb-10">
            <ul className="space-y-7">
              {headerNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={pathname === link.href ? 'page' : undefined}
                    className={`${styles.navigationLink} flex min-h-11 items-center gap-3 text-xl font-bold`}
                    onClick={() => setNavShow(false)}
                  >
                    <span className="h-2 w-2 self-start bg-black" aria-hidden="true" />
                    <span className={styles.navigationLabel}>{link.title}</span>
                  </Link>
                  {Boolean(link.children?.length) && (
                    <ul className="ml-5">
                      {link.children?.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            aria-current={pathname === child.href ? 'page' : undefined}
                            className={`${styles.navigationLink} block py-3 text-sm text-black`}
                            onClick={() => setNavShow(false)}
                          >
                            <span className={styles.navigationLabel}>{child.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </DialogPanel>
      </Dialog>
    </>
  )
}

export default MobileNav
