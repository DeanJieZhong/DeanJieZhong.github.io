'use client'

import {
  Suspense,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { Transition } from '@headlessui/react'

const SearchDialog = dynamic(() => import('./SearchDialog'), { ssr: false })
const PageSearch = dynamic(() => import('./PageSearch'), { ssr: false })
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
  const [findSession, setFindSession] = useState(0)
  const recentPageQueries = useRef(new Map<string, string>())
  const [initialQuery, setInitialQuery] = useState('')
  const searchOpen = useRef(false)
  const pointerDismissed = useRef(false)
  const rememberPageQuery = useCallback((query: string) => {
    recentPageQueries.current.set(window.location.pathname, query)
  }, [])
  const openSearch = useCallback(() => {
    searchOpen.current = true
    pointerDismissed.current = false
    const url = new URL(window.location.href)
    setInitialQuery(
      url.searchParams.get('find') ?? recentPageQueries.current.get(url.pathname) ?? ''
    )
    setOpen(true)
  }, [])
  const closeSearch = useCallback((source: 'pointer' | 'keyboard' = 'keyboard') => {
    // Outside-pointer and dialog callbacks can both fire for the same dismissal.
    if (!searchOpen.current) return
    searchOpen.current = false
    pointerDismissed.current = source === 'pointer'
    setOpen(false)
  }, [])
  const context = useMemo(() => ({ openSearch }), [openSearch])

  useEffect(() => {
    // Focus restoration can happen after the leave transition or its cleanup.
    // Watch the actual focus event until the user's next interaction instead of
    // guessing its timing with an animation frame. Keep page-finder focus intact.
    function onFocusIn(event: FocusEvent) {
      const target = event.target
      if (pointerDismissed.current && target instanceof HTMLElement && target.closest('header')) {
        target.blur()
      }
    }
    function onUserInput() {
      pointerDismissed.current = false
    }
    document.addEventListener('focusin', onFocusIn, true)
    document.addEventListener('pointerdown', onUserInput, true)
    document.addEventListener('keydown', onUserInput, true)
    return () => {
      document.removeEventListener('focusin', onFocusIn, true)
      document.removeEventListener('pointerdown', onUserInput, true)
      document.removeEventListener('keydown', onUserInput, true)
    }
  }, [])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.isComposing || event.repeat || event.defaultPrevented) return
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        if (searchOpen.current) closeSearch()
        else openSearch()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [closeSearch, openSearch])

  return (
    <SearchContext.Provider value={context}>
      {children}
      <Suspense fallback={null}>
        <PageSearch suspended={open} session={findSession} onQueryChange={rememberPageQuery} />
      </Suspense>
      <Transition show={open} appear as="div">
        <SearchDialog
          indexUrl={indexUrl}
          initialQuery={initialQuery}
          onClose={closeSearch}
          onSelectResult={(url, query) => {
            recentPageQueries.current.set(new URL(url, window.location.origin).pathname, query)
            searchOpen.current = false
            setOpen(false)
            setFindSession((value) => value + 1)
          }}
        />
      </Transition>
    </SearchContext.Provider>
  )
}
