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
import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowUpRight,
  BookOpen,
  FileText,
  FlaskConical,
  Globe2,
  Search,
  UserRound,
  X,
} from 'lucide-react'
import { prepareSearchDocuments, searchDocuments, searchSnippet } from './search'
import type { SearchDocument, SearchEntry } from './search'
import styles from './SearchDialog.module.css'

const indexCache = new Map<string, Promise<SearchEntry[]>>()

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
  const terms = query.trim().split(/\s+/).filter(Boolean)
  if (!terms.length) return <>{text}</>
  const pattern = new RegExp(
    `(${terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
    'gi'
  )
  return (
    <>
      {text
        .split(pattern)
        .map((part, index) => (index % 2 ? <mark key={index}>{part}</mark> : part))}
    </>
  )
}

export default function SearchDialog({
  indexUrl,
  onClose,
}: {
  indexUrl: string
  onClose: () => void
}) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [documents, setDocuments] = useState<SearchEntry[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [attempt, setAttempt] = useState(0)
  const [shortcut, setShortcut] = useState('⌘ K')

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
    setShortcut(/Mac|iPhone|iPad/.test(navigator.platform) ? '⌘ K' : 'Ctrl K')
    return () => {
      active = false
    }
  }, [indexUrl, attempt])

  const results = useMemo(() => searchDocuments(documents, query), [documents, query])
  const hasQuery = Boolean(query.trim())

  function openResult(document: SearchEntry | null) {
    if (!document) return
    onClose()
    router.push(document.url)
  }

  return (
    <Dialog open onClose={onClose} initialFocus={inputRef} className={styles.dialog}>
      <DialogBackdrop className={styles.backdrop} />
      <div className={styles.positioner}>
        <DialogPanel
          className={styles.panel}
          onKeyDownCapture={(event) => {
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
              <Search
                className={styles.searchIcon}
                size={27}
                strokeWidth={1.6}
                aria-hidden="true"
              />
              <ComboboxInput
                ref={inputRef}
                aria-label="Search all pages"
                aria-describedby="site-search-status"
                placeholder="Search this site"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                maxLength={200}
                onChange={(event) => setQuery(event.target.value)}
                className={styles.input}
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className={styles.close}
              >
                <X size={18} strokeWidth={1.6} aria-hidden="true" />
              </button>
            </div>

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
              {status === 'ready' && results.length === 0 && (
                <div className={styles.message}>
                  <Search size={28} strokeWidth={1.3} aria-hidden="true" />
                  <p className={styles.emptyTitle}>No results for “{query}”</p>
                  <p>Try a page name, topic, or a different keyword.</p>
                </div>
              )}
              {status === 'ready' && results.length > 0 && (
                <ComboboxOptions
                  static
                  modal={false}
                  className={styles.results}
                  aria-label="Search results"
                >
                  {results.map((document, index) => (
                    <div key={document.url} role="presentation">
                      {(index === 0 || (hasQuery && index === 1)) && (
                        <div className={styles.groupLabel} aria-hidden="true">
                          {hasQuery ? (index === 0 ? 'Top hit' : 'More results') : 'Quick access'}
                        </div>
                      )}
                      <ComboboxOption value={document} className={styles.result}>
                        <span className={styles.resultIcon}>
                          <ResultIcon section={document.section} />
                        </span>
                        <span className={styles.resultCopy}>
                          <span className={styles.resultTitle}>
                            <Highlight text={document.title} query={query} />
                          </span>
                          <span className={styles.resultPath}>
                            {document.section} <span aria-hidden="true">·</span> {document.url}
                          </span>
                          {hasQuery && (
                            <span className={styles.snippet}>
                              <Highlight text={searchSnippet(document, query)} query={query} />
                            </span>
                          )}
                        </span>
                        <ArrowUpRight
                          className={styles.openIcon}
                          size={17}
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </ComboboxOption>
                    </div>
                  ))}
                </ComboboxOptions>
              )}
            </div>
          </Combobox>
          <footer className={styles.footer}>
            <span id="site-search-status" role="status" aria-live="polite">
              {status === 'ready'
                ? hasQuery
                  ? `${results.length} ${results.length === 1 ? 'result' : 'results'}`
                  : `All ${documents.length} pages`
                : status === 'loading'
                  ? 'Loading pages'
                  : 'Search unavailable'}
            </span>
            <span className={styles.keyHints} aria-hidden="true">
              <span>
                <kbd>↑</kbd>
                <kbd>↓</kbd> Navigate
              </span>
              <span>
                <kbd>↵</kbd> Open
              </span>
              <span>
                <kbd>esc</kbd> Close
              </span>
            </span>
            <kbd className={styles.shortcut} aria-label={`Search shortcut: ${shortcut}`}>
              {shortcut}
            </kbd>
          </footer>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
