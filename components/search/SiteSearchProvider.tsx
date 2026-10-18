'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import dynamic from 'next/dynamic'

const SearchDialog = dynamic(() => import('./SearchDialog'), { ssr: false })
const SearchContext = createContext<{ openSearch: () => void } | null>(null)

export function useSiteSearch() {
  const context = useContext(SearchContext)
  if (!context) throw new Error('Search must be used inside SiteSearchProvider.')
  return context
}

export default function SiteSearchProvider({
  children,
  indexUrl,
}: {
  children: ReactNode
  indexUrl: string
}) {
  const [open, setOpen] = useState(false)
  const openSearch = useCallback(() => setOpen(true), [])
  const closeSearch = useCallback(() => setOpen(false), [])
  const context = useMemo(() => ({ openSearch }), [openSearch])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.isComposing || event.repeat || event.defaultPrevented) return
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((previous) => !previous)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <SearchContext.Provider value={context}>
      {children}
      {open && <SearchDialog indexUrl={indexUrl} onClose={closeSearch} />}
    </SearchContext.Provider>
  )
}
