'use client'

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowUpRight, BookOpen, FileText, FlaskConical, Globe2, UserRound, X } from 'lucide-react'
import SearchIcon from './SearchIcon'
import { findWordMatches } from './matching'
import { prepareSearchDocuments, groupSearchResults, searchSnippet } from './search'
import type { SearchDocument, SearchEntry } from './search'
import styles from './SearchDialog.module.css'

const indexCache = new Map<string, Promise<SearchEntry[]>>()
const queryLimit = 200

function queryFillProgress(length: number) {
  const count = Math.max(0, Math.min(length, queryLimit))
  // One smooth saturation curve: f(0) = 0, f(10) = 0.8, f(200) = 1.
  return (76 * count) / (75 * count + queryLimit)
}

function loadIndex(url: string) {
  let pending = indexCache.get(url)
  if (!pending) {
    pending = fetch(url)
      .then(async (response) => {
        if (!response.ok) throw new Error('Search index unavailable')
        const documents: SearchDocument[] = await response.json()
        if (
          !Array.isArray(documents) ||
          !documents.every(
            (document) =>
              typeof document.url === 'string' &&
              document.url.startsWith('/') &&
              !document.url.startsWith('//') &&
              typeof document.title === 'string' &&
              typeof document.content === 'string' &&
              typeof document.description === 'string' &&
              typeof document.section === 'string' &&
              typeof document.headings === 'string'
          )
        )
          throw new Error('Invalid search index')
        return prepareSearchDocuments(documents)
      })
      .catch((error) => {
        indexCache.delete(url)
        throw error
      })
    indexCache.set(url, pending)
  }
  return pending
}

function ResultIcon({ section }: { section: string }) {
  const Icon =
    section === 'Research'
      ? FlaskConical
      : section === 'Application'
        ? FileText
        : section === 'Blog'
          ? BookOpen
          : section === 'About'
            ? UserRound
            : Globe2
  return <Icon size={21} strokeWidth={1.5} aria-hidden="true" />
}

function Highlight({ text, query }: { text: string; query: string }) {
  const matches = findWordMatches(text, query)
  let offset = 0
  return (
    <>
      {matches.map(({ start, end }) => {
        const before = text.slice(offset, start)
        offset = end
        return (
          <span key={start}>
            {before}
            <mark>{text.slice(start, end)}</mark>
          </span>
        )
      })}
      {text.slice(offset)}
    </>
  )
}

export default function SearchDialog({
  indexUrl,
  initialQuery,
  onClose,
  onSelectResult,
}: {
  indexUrl: string
  initialQuery: string
  onClose: (source?: 'pointer' | 'keyboard') => void
  onSelectResult: (url: string, query: string) => void
}) {
  const router = useRouter()
  const pathname = usePathname()
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const fillClipId = useId()
  const [query, setQuery] = useState(initialQuery)
  const [submittedQuery, setSubmittedQuery] = useState('')
  const [phase, setPhase] = useState<'editing' | 'dropping' | 'results'>('editing')
  const [documents, setDocuments] = useState<SearchEntry[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let active = true
    setStatus('loading')
    loadIndex(indexUrl)
      .then((index) => {
        if (!active) return
        setDocuments(index)
        setStatus('ready')
      })
      .catch(() => {
        if (active) setStatus('error')
      })
    return () => {
      active = false
    }
  }, [indexUrl, attempt])

  const { currentPage, otherPages } = useMemo(
    () => groupSearchResults(documents, submittedQuery, pathname),
    [documents, submittedQuery, pathname]
  )
  const resultCount = Number(Boolean(currentPage)) + otherPages.length
  const hasQuery = Boolean(query.trim())
  const expanded = phase === 'results'
  const fillProgress = queryFillProgress(query.length)

  useLayoutEffect(() => {
    const panel = panelRef.current
    const results = resultsRef.current
    if (!expanded || !panel || !results) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const panelHeight = panel.getBoundingClientRect().height
    const resultsHeight = results.getBoundingClientRect().height
    // Keep the list at its final size while the panel's lower edge reveals it.
    // This prevents the result rows from being squeezed during expansion.
    results.style.height = `${resultsHeight}px`
    results.style.flexShrink = '0'
    const reveal = panel.animate(
      [{ height: `${panelHeight - resultsHeight}px` }, { height: `${panelHeight}px` }],
      { duration: 360, easing: 'cubic-bezier(0.22, 0.68, 0, 1)' }
    )
    const releaseSize = () => {
      results.style.removeProperty('height')
      results.style.removeProperty('flex-shrink')
    }
    reveal.onfinish = releaseSize
    return () => {
      reveal.cancel()
      releaseSize()
    }
  }, [expanded])

  const groups = [
    ...(currentPage ? [{ label: 'This page', documents: [currentPage] }] : []),
    ...(otherPages.length ? [{ label: 'Other pages', documents: otherPages }] : []),
  ]

  function submitQuery() {
    if (!hasQuery || phase === 'dropping') return
    setSubmittedQuery(query.trim())
    setPhase(window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'results' : 'dropping')
  }

  function openResult(document: SearchEntry | null) {
    if (!document || !expanded) return
    onSelectResult(document.url, submittedQuery)
    if (document === currentPage) {
      const url = new URL(window.location.href)
      url.searchParams.set('find', submittedQuery)
      window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`)
      return
    }
    const parameters = new URLSearchParams()
    parameters.set('find', submittedQuery)
    router.push(`${document.url}${parameters.size ? `?${parameters}` : ''}`)
  }

  return (
    <Dialog onClose={() => onClose()} initialFocus={inputRef} className={styles.dialog}>
      <DialogBackdrop transition className={styles.backdrop} />
      <div
        className={styles.positioner}
        onPointerDown={(event) => {
          if (event.target !== event.currentTarget) return
          event.preventDefault()
          onClose('pointer')
        }}
      >
        <DialogPanel
          transition
          ref={panelRef}
          className={styles.panel}
          data-expanded={expanded}
          data-phase={phase}
          onKeyDownCapture={(event) => {
            if (event.nativeEvent.isComposing) return
            if (
              event.key === 'Enter' &&
              event.target === inputRef.current &&
              (!expanded || event.repeat)
            ) {
              event.preventDefault()
              event.stopPropagation()
              if (!event.repeat) submitQuery()
              return
            }
            // Close the whole palette on the first Escape, including when the list is open.
            if (event.key === 'Escape' && !event.nativeEvent.isComposing) {
              event.preventDefault()
              event.stopPropagation()
              onClose()
            }
          }}
        >
          <DialogTitle className="sr-only">Search this site</DialogTitle>
          <Combobox<SearchEntry | null> value={null} onChange={openResult} immediate>
            <div className={styles.searchBar}>
              <SearchIcon className={styles.searchIcon} size={27} aria-hidden="true">
                <defs>
                  <clipPath id={fillClipId}>
                    <rect x="3" y="3" width="13" height="13" />
                  </clipPath>
                </defs>
                <g clipPath={`url(#${fillClipId})`}>
                  <g
                    className={styles.inputFillDrop}
                    onAnimationEnd={(event) => {
                      if (event.target === event.currentTarget) {
                        setPhase((current) => (current === 'dropping' ? 'results' : current))
                      }
                    }}
                  >
                    <rect
                      x="3"
                      y="3"
                      width="13"
                      height="13"
                      fill="currentColor"
                      stroke="none"
                      className={styles.inputFill}
                      style={{ transform: `scaleY(${fillProgress})` }}
                    />
                  </g>
                </g>
              </SearchIcon>
              <ComboboxInput
                ref={inputRef}
                aria-label="Search all pages"
                aria-describedby={expanded ? 'site-search-status' : undefined}
                placeholder="Search this site"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                maxLength={queryLimit}
                enterKeyHint="search"
                value={query}
                displayValue={() => query}
                onFocus={(event) => event.target.select()}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setPhase('editing')
                }}
                className={styles.input}
              />
              <button
                type="button"
                onClick={(event) => onClose(event.detail === 0 ? 'keyboard' : 'pointer')}
                aria-label="Close search"
                className={styles.close}
              >
                <X size={18} strokeWidth={1.6} aria-hidden="true" />
              </button>
            </div>

            {expanded && (
              <div ref={resultsRef} className={styles.resultsReveal}>
                <div className={styles.resultsArea}>
                  {status === 'loading' && <p className={styles.message}>Searching the site…</p>}
                  {status === 'error' && (
                    <div className={styles.message}>
                      <p>Search couldn’t load.</p>
                      <button
                        type="button"
                        className={styles.retry}
                        onClick={() => setAttempt((value) => value + 1)}
                      >
                        Try again
                      </button>
                    </div>
                  )}
                  {status === 'ready' && resultCount === 0 && (
                    <div className={styles.message}>
                      <SearchIcon size={28} aria-hidden="true" />
                      <p className={styles.emptyTitle}>No results for “{submittedQuery}”</p>
                      <p>Try a page name, topic, or a different keyword.</p>
                    </div>
                  )}
                  {status === 'ready' && resultCount > 0 && (
                    <ComboboxOptions
                      static
                      modal={false}
                      className={styles.results}
                      aria-label="Search results"
                    >
                      {groups.map((group) => (
                        <div key={group.label} role="group" aria-label={group.label}>
                          <div className={styles.groupLabel} aria-hidden="true">
                            {group.label}
                          </div>
                          {group.documents.map((document) => (
                            <ComboboxOption
                              key={document.url}
                              value={document}
                              className={styles.result}
                            >
                              <span className={styles.resultIcon}>
                                <ResultIcon section={document.section} />
                              </span>
                              <span className={styles.resultCopy}>
                                <span className={styles.resultTitle}>
                                  <Highlight text={document.title} query={submittedQuery} />
                                </span>
                                <span className={styles.resultPath}>
                                  {document === currentPage ? 'This page' : document.section}{' '}
                                  <span aria-hidden="true">·</span> {document.url}
                                </span>
                                <span className={styles.snippet}>
                                  <Highlight
                                    text={searchSnippet(document, submittedQuery)}
                                    query={submittedQuery}
                                  />
                                </span>
                              </span>
                              <ArrowUpRight
                                className={styles.openIcon}
                                size={17}
                                strokeWidth={1.5}
                                aria-hidden="true"
                              />
                            </ComboboxOption>
                          ))}
                        </div>
                      ))}
                    </ComboboxOptions>
                  )}
                </div>
                <span id="site-search-status" className="sr-only" role="status" aria-live="polite">
                  {status === 'ready'
                    ? `${resultCount} ${resultCount === 1 ? 'result' : 'results'}`
                    : status === 'loading'
                      ? 'Loading pages'
                      : 'Search unavailable'}
                </span>
              </div>
            )}
          </Combobox>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
