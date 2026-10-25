import Image from '@/components/Image'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import type { BlogListPost } from '@/layouts/blogFilters'
import styles from '@/layouts/BlogListLayout.module.css'

function PostDate({ date, location }: { date: string; location?: string }) {
  const published = new Date(date)
  const locationLines = location
    ?.split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
  // Frontmatter dates are stored in UTC. Keep their calendar day stable for every reader.
  const format = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(siteMetadata.locale, { ...options, timeZone: 'UTC' }).format(published)

  return (
    <div className={styles.dateColumn}>
      <time dateTime={date} className={styles.date}>
        <span className="sr-only">{format({ dateStyle: 'long' })}</span>
        <span aria-hidden="true" className={styles.day}>
          {format({ day: '2-digit' })}
        </span>
        <span aria-hidden="true" className={styles.monthYear}>
          <span>{format({ month: 'short' })}</span>
          <span>{format({ year: 'numeric' })}</span>
        </span>
      </time>
      {!!locationLines?.length && (
        <p className={styles.location}>
          {locationLines.map((line, index) => (
            <span key={index} className={styles.locationLine}>
              {index > 0 && '\n'}
              {line}
            </span>
          ))}
        </p>
      )}
    </div>
  )
}

export default function BlogEntry({
  post,
  headingAs: Heading = 'h2',
}: {
  post: BlogListPost
  headingAs?: 'h2' | 'h4'
}) {
  const { date, location, path, slug, title, summary, images } = post
  const image = Array.isArray(images) ? images[0] : images
  const thumbnail = typeof image === 'string' ? image.trim() : ''

  return (
    <article className={styles.entry} aria-labelledby={`post-${slug}`}>
      <PostDate date={date} location={location} />
      <div className={`${styles.content} ${thumbnail ? styles.withImage : ''}`}>
        <div className={styles.copy}>
          <Heading id={`post-${slug}`} className={styles.title}>
            <Link href={`/${path}`} className={styles.titleLink}>
              {title}
            </Link>
          </Heading>
          {summary?.trim() && <p className={styles.summary}>{summary}</p>}
        </div>
        {thumbnail && (
          <Image
            src={thumbnail}
            alt=""
            width={120}
            height={120}
            sizes="(min-width: 768px) 120px, (min-width: 360px) 88px, 112px"
            className={styles.thumbnail}
            // Covers can be local assets or existing external images in older posts.
            unoptimized
          />
        )}
      </div>
    </article>
  )
}
