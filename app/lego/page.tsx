import LegoGallery from '@/components/LegoGallery'
import Link from '@/components/Link'
import legoSets, { legoStatusCheckedAt } from '@/data/legoData'
import { genPageMetadata } from 'app/seo'
import styles from '@/components/LegoGallery.module.css'

export const metadata = genPageMetadata({
  title: 'Lego Archive',
  description: 'A personal archive of the LEGO sets I’ve owned, and the stories behind them.',
})

export default function LegoPage() {
  return (
    <article className={styles.page}>
      <header className={styles.header}>
        <h1>Lego Archive</h1>
        <p>I’ve always loved LEGOs.</p>
        <p>
          The fun was in building, with or without instructions (building new stuff is awesome). I
          may not end up designing LEGO sets for a living, but I think that passion for building is
          still with me today.
        </p>
        <p>This archive records all the LEGO sets I’ve owned, with a few notes and memories.</p>
      </header>

      {legoSets.length > 0 ? (
        <>
          <LegoGallery sets={legoSets} />
          <footer className={styles.collectionReview}>
            <p>
              All sets checked{' '}
              <time dateTime={legoStatusCheckedAt}>
                {new Intl.DateTimeFormat('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  timeZone: 'UTC',
                }).format(new Date(`${legoStatusCheckedAt}T00:00:00Z`))}
              </time>
            </p>
            <details>
              <summary>Status sources</summary>
              <ul>
                {legoSets.map((set) =>
                  set.availability ? (
                    <li key={set.catalogNumber || set.number}>
                      {set.number} · {set.name} —{' '}
                      <Link href={set.availability.source.url}>
                        {set.availability.source.label}
                      </Link>
                    </li>
                  ) : null
                )}
              </ul>
            </details>
          </footer>
        </>
      ) : (
        <p className={styles.empty}>
          I’m piecing this collection back together. Photos coming soon.
        </p>
      )}
    </article>
  )
}
