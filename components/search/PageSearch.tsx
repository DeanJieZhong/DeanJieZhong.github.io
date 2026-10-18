'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePathname, useSearchParams } from 'next/navigation'
import { ChevronDown, ChevronUp, X } from 'lucide-react'
import SearchIcon from './SearchIcon'
import { pageMatchRanges } from './pageMatches'
import styles from './PageSearch.module.css'

export default function PageSearch({
  suspended,
  session,
  onQueryChange,
}: {
  suspended: boolean
  session: number
  onQueryChange: (query: string) => void
}) {
  const pathname = usePathname()
  const parameters = useSearchParams()
  const query = parameters.get('find')?.slice(0, 200)
  if (query === undefined) return null
  return (
    <PageMatches
      key={`${pathname}:${session}`}
      initialQuery={query}
      suspended={suspended}
      onQueryChange={onQueryChange}
    />
  )
}

function PageMatches({
  initialQuery,
  suspended,
  onQueryChange,
}: {
  initialQuery: string
  suspended: boolean
  onQueryChange: (query: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState(initialQuery)
  const rangesRef = useRef<Range[]>([])
  const activeRef = useRef(0)
  const [position, setPosition] = useState({ index: 0, total: 0, text: '' })

  const select = useCallback((index: number, scroll = true) => {
    const ranges = rangesRef.current
    const next = ranges.length ? (index + ranges.length) % ranges.length : 0
    activeRef.current = next
    const range = ranges[next]
    setPosition({ index: next, total: ranges.length, text: range?.toString() || '' })
    if (typeof Highlight !== 'undefined' && CSS.highlights) {
      const active = new Highlight(...(range ? [range] : []))
      active.priority = 1
      CSS.highlights.set('site-search-active', active)
    } else if (range) {
      // Older browsers still get an active match through native text selection.
      const selection = window.getSelection()
      selection?.removeAllRanges()
      selection?.addRange(range)
    }
    if (range && scroll) {
      const rect = range.getBoundingClientRect()
      window.scrollTo({
        top: window.scrollY + rect.top - Math.max(120, window.innerHeight * 0.38),
        behavior: 'instant',
      })
    }
  }, [])

  const close = useCallback(() => {
    const url = new URL(window.location.href)
    url.searchParams.delete('find')
    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`)
  }, [])

  // Keep browser back/forward and shared URLs in sync without remounting the input
  // on every keystroke, which would lose its focus and caret position.
  useEffect(() => setQuery(initialQuery), [initialQuery])
  useEffect(() => onQueryChange(query), [query, onQueryChange])

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      inputRef.current?.focus({ preventScroll: true })
      inputRef.current?.select()
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  function updateQuery(value: string) {
    setQuery(value)
    const url = new URL(window.location.href)
    url.searchParams.set('find', value)
    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`)
  }

  useEffect(() => {
    const main = document.querySelector('main')
    if (!main) return
    let frame = 0
    let initialized = false
    function refresh() {
      const initial = !initialized
      initialized = true
      rangesRef.current = pageMatchRanges(main!, query)
      if (typeof Highlight !== 'undefined' && CSS.highlights) {
        CSS.highlights.set('site-search-matches', new Highlight(...rangesRef.current))
      }
      select(initial ? 0 : Math.min(activeRef.current, rangesRef.current.length - 1), initial)
    }
    frame = requestAnimationFrame(refresh)
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => refresh())
    })
    observer.observe(main, { childList: true, characterData: true, subtree: true })
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      CSS.highlights?.delete('site-search-matches')
      CSS.highlights?.delete('site-search-active')
      if (typeof Highlight === 'undefined') {
        const selection = window.getSelection()
        if (selection?.rangeCount && rangesRef.current.includes(selection.getRangeAt(0)))
          selection.removeAllRanges()
      }
    }
  }, [query, select])

  useEffect(() => {
    if (suspended) return
    function onKeyDown(event: KeyboardEvent) {
      if (
        event.defaultPrevented ||
        event.isComposing ||
        event.repeat ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      )
        return
      const target = event.target instanceof Element ? event.target : null
      if (
        target !== inputRef.current &&
        target?.closest('input, textarea, select, [contenteditable="true"], [role="dialog"]')
      )
        return
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
      } else if (event.key === 'Enter' && !target?.closest('a, button, summary')) {
        event.preventDefault()
        select(activeRef.current + (event.shiftKey ? -1 : 1))
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [suspended, close, select])

  return createPortal(
    <section
      tabIndex={-1}
      aria-label="Find in page"
      className={styles.bar}
      hidden={suspended}
      data-no-search
    >
      <div className={styles.controls}>
        <SearchIcon size={17} aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          aria-label="Find on this page"
          placeholder="Find on this page"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          maxLength={200}
          value={query}
          onChange={(event) => updateQuery(event.target.value)}
          className={styles.query}
        />
        <span className={styles.count} aria-hidden="true">
          {position.total ? `${position.index + 1} / ${position.total}` : '0 / 0'}
        </span>
        <button
          type="button"
          aria-label="Previous match"
          title="Previous match (Shift + Enter)"
          disabled={!position.total}
          onClick={() => select(activeRef.current - 1)}
        >
          <ChevronUp size={18} aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Next match"
          title="Next match (Enter)"
          disabled={!position.total}
          onClick={() => select(activeRef.current + 1)}
        >
          <ChevronDown size={18} aria-hidden="true" />
        </button>
        <button type="button" aria-label="Close page search" title="Close (Esc)" onClick={close}>
          <X size={17} aria-hidden="true" />
        </button>
      </div>
      {!position.total && (
        <p className={styles.message}>
          {query.trim() ? 'No matches in page text' : 'Type to find on this page'}
        </p>
      )}
      <span className="sr-only" role="status" aria-live="polite">
        {position.total
          ? `Match ${position.index + 1} of ${position.total}: ${position.text}`
          : query.trim()
            ? 'No matches in page text'
            : 'Type to find on this page'}
      </span>
    </section>,
    document.body
  )
}
