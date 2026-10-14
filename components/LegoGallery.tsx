'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog } from '@base-ui/react/dialog'
import Link from '@/components/Link'
import type { LegoSet } from '@/data/legoData'
import styles from './LegoGallery.module.css'

const sortOptions = [
  { value: 'pieces', label: 'Pieces' },
  { value: 'releaseYear', label: 'Release' },
] as const

type SortKey = (typeof sortOptions)[number]['value']
type SortDirection = 'ascending' | 'descending'

function compareSets(a: LegoSet, b: LegoSet, key: SortKey, direction: SortDirection) {
  const aValue = a[key]
  const bValue = b[key]
  // Missing values stay at the end in both directions.
  if (aValue === undefined && bValue !== undefined) return 1
  if (bValue === undefined && aValue !== undefined) return -1

  const comparison = (aValue ?? 0) - (bValue ?? 0)
  const tieBreak = a.name.localeCompare(b.name, 'en') || Number(a.number) - Number(b.number)
  return comparison ? comparison * (direction === 'ascending' ? 1 : -1) : tieBreak
}

function AcquisitionSummary({ acquisition }: { acquisition: LegoSet['acquisition'] }) {
  if (!acquisition) return null

  const { when, place, how, from } = acquisition
  const method = from ? `${how || 'Received'} from ${from.replace(/^My\b/, 'my')}` : how
  const summary = [when, place ? `${place.city}, ${place.country}` : undefined, method]
    .filter(Boolean)
    .join(' · ')

  return summary ? <p className={styles.details}>{summary}</p> : null
}

function Facts({ items }: { items: [string, string | number | undefined][] }) {
  return (
    <dl className={styles.facts}>
      {items
        .filter(([, value]) => value !== undefined && value !== '')
        .map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
    </dl>
  )
}

function SetMedia({ set }: { set: LegoSet }) {
  return (
    <div>
      <Image
        src={set.image.src}
        alt={set.image.alt}
        width={set.image.width}
        height={set.image.height}
        sizes="(max-width: 699px) 100vw, 450px"
        loading="eager"
        className={styles.largeImage}
      />
    </div>
  )
}

function SetPageLink({ set }: { set: LegoSet }) {
  const urls = [
    ...(set.sources?.map((source) => source.url) ?? []),
    set.availability?.source.url,
    set.image.sourceUrl,
  ]
  const legoPage = urls.find((url) => url?.match(/^https:\/\/www\.lego\.com\/[^/]+\/product\//))
  const bricksetPage = urls.find((url) => url?.startsWith('https://brickset.com/sets/'))
  const href = legoPage ?? bricksetPage

  return href ? (
    <div className={styles.links}>
      <Link href={href}>{legoPage ? 'LEGO page' : 'Brickset page'}</Link>
    </div>
  ) : null
}

export default function LegoGallery({ sets }: { sets: LegoSet[] }) {
  const [sortKey, setSortKey] = useState<SortKey>('pieces')
  const [direction, setDirection] = useState<SortDirection>('descending')
  const sortedSets = [...sets].sort((a, b) => compareSets(a, b, sortKey, direction))
  const sortLabel = sortOptions.find((option) => option.value === sortKey)?.label

  return (
    <Dialog.Root<LegoSet>>
      {({ payload: selected }) => (
        <>
          <div className={styles.toolbar}>
            <fieldset className={styles.sortOptions}>
              <legend className={styles.visuallyHidden}>Sort by</legend>
              {sortOptions.map((option) => (
                <label className={styles.sortChoice} key={option.value}>
                  <input
                    className={styles.visuallyHidden}
                    type="radio"
                    name="lego-sort"
                    value={option.value}
                    checked={sortKey === option.value}
                    onChange={() => setSortKey(option.value)}
                    aria-controls="lego-archive-grid"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </fieldset>
            <fieldset className={styles.sortDirection}>
              <legend className={styles.visuallyHidden}>Sort direction</legend>
              {(['ascending', 'descending'] as const).map((value) => (
                <label
                  className={styles.directionChoice}
                  key={value}
                  title={value === 'ascending' ? 'Ascending' : 'Descending'}
                >
                  <input
                    className={styles.visuallyHidden}
                    type="radio"
                    name="lego-sort-direction"
                    value={value}
                    checked={direction === value}
                    onChange={() => setDirection(value)}
                    aria-label={value === 'ascending' ? 'Ascending' : 'Descending'}
                    aria-controls="lego-archive-grid"
                  />
                  <span aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path
                        d={
                          value === 'ascending' ? 'M12 19V5m-6 6 6-6 6 6' : 'M12 5v14m-6-6 6 6 6-6'
                        }
                      />
                    </svg>
                  </span>
                </label>
              ))}
            </fieldset>
          </div>
          <div className={styles.archiveMeta}>
            <p className={styles.count}>
              {sets.length} {sets.length === 1 ? 'set' : 'sets'}
            </p>
            <p className={styles.visuallyHidden} role="status">
              {sets.length} sets, sorted by {sortLabel}, {direction}.
            </p>
          </div>
          <ul id="lego-archive-grid" className={styles.grid} aria-label="LEGO archive">
            {sortedSets.map((set, index) => (
              <li key={set.catalogNumber || set.number}>
                <figure className={styles.set}>
                  <Dialog.Trigger
                    payload={set}
                    className={styles.imageButton}
                    aria-label={`View ${set.name}, set ${set.number}`}
                  >
                    <Image
                      src={set.image.src}
                      alt={set.image.alt}
                      width={set.image.width}
                      height={set.image.height}
                      sizes={
                        sets.length < 3
                          ? '(max-width: 559px) 100vw, 50vw'
                          : '(max-width: 559px) 100vw, (max-width: 899px) 50vw, 33vw'
                      }
                      loading={index < 3 ? 'eager' : 'lazy'}
                      className={styles.image}
                    />
                  </Dialog.Trigger>
                  <figcaption>
                    <h2 className={styles.name}>{set.name}</h2>
                    <p className={styles.details}>{set.number}</p>
                    {set.pieces !== undefined ? (
                      <p className={styles.details}>{set.pieces.toLocaleString('en-US')} pieces</p>
                    ) : null}
                    <AcquisitionSummary acquisition={set.acquisition} />
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>

          <Dialog.Portal>
            <Dialog.Backdrop className={styles.backdrop} />
            <Dialog.Popup className={styles.popup}>
              <Dialog.Close className={styles.close}>Close</Dialog.Close>
              {selected ? (
                <div className={styles.detailGrid}>
                  <SetMedia key={selected.catalogNumber || selected.number} set={selected} />
                  <div>
                    <Dialog.Title className={styles.detailTitle}>{selected.name}</Dialog.Title>
                    <Dialog.Description className={styles.details}>
                      {selected.number} · {selected.theme || 'LEGO'}
                      {selected.variant ? ` · ${selected.variant} variant` : ''}
                    </Dialog.Description>
                    <Facts
                      items={[
                        ['Released', selected.releaseYear ?? 'Not recorded'],
                        ['Pieces', selected.pieces?.toLocaleString('en-US') ?? 'Not recorded'],
                      ]}
                    />

                    <section className={styles.detailSection} aria-label="Origin">
                      <h3>Origin</h3>
                      {selected.acquisition ? (
                        <Facts
                          items={[
                            ['When', selected.acquisition.when],
                            ['How', selected.acquisition.how],
                            ['From', selected.acquisition.from],
                            [
                              'Where',
                              selected.acquisition.place
                                ? `${selected.acquisition.place.city}, ${selected.acquisition.place.country}`
                                : undefined,
                            ],
                          ]}
                        />
                      ) : (
                        <p className={styles.unrecorded}>
                          Where and when I got it: still to be recorded.
                        </p>
                      )}
                    </section>

                    <section className={styles.detailSection} aria-label="Notes">
                      <h3>Notes</h3>
                      {selected.notes ? (
                        <p className={styles.notes}>{selected.notes}</p>
                      ) : (
                        <p className={styles.unrecorded}>No notes yet.</p>
                      )}
                    </section>

                    {selected.catalogNote ? (
                      <p className={styles.catalogNote}>{selected.catalogNote}</p>
                    ) : null}
                    <SetPageLink set={selected} />
                  </div>
                </div>
              ) : null}
            </Dialog.Popup>
          </Dialog.Portal>
        </>
      )}
    </Dialog.Root>
  )
}
