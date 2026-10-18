'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import BlogHero from '@/components/BlogHero'
import Breadcrumbs from '@/components/Breadcrumbs'
import Image from '@/components/Image'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import styles from './BlogListLayout.module.css'
import {
  blogCategories,
  filterBlogPosts,
  getBlogCategory,
  type BlogCategory,
  type BlogListPost,
} from './blogFilters'

interface BlogListLayoutProps {
  posts: BlogListPost[]
  title: string
}

const POSTS_PER_BATCH = 10

function BlogUrlState({ onChange }: { onChange: (query: string) => void }) {
  const params = useSearchParams()
  const query = params.toString()
  useEffect(() => onChange(query), [query, onChange])
  return null
}

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

function BlogEntry({ post }: { post: BlogListPost }) {
  const { date, location, path, slug, title, summary, images } = post
  const image = Array.isArray(images) ? images[0] : images
  const thumbnail = typeof image === 'string' ? image.trim() : ''

  return (
    <article className={styles.entry} aria-labelledby={`post-${slug}`}>
      <PostDate date={date} location={location} />
      <div className={`${styles.content} ${thumbnail ? styles.withImage : ''}`}>
        <div className={styles.copy}>
          <h2 id={`post-${slug}`} className={styles.title}>
            <Link href={`/${path}`} className={styles.titleLink}>
              {title}
            </Link>
          </h2>
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

function BlogPostFeed({ posts, title, onClear }: BlogListLayoutProps & { onClear: () => void }) {
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_BATCH)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const hasMore = visibleCount < posts.length
  const displayPosts = posts.slice(0, visibleCount)

  useEffect(() => {
    const trigger = loadMoreRef.current
    if (!hasMore || !trigger) return

    if (!('IntersectionObserver' in window)) {
      setVisibleCount(posts.length)
      return
    }

    let triggered = false
    const observer = new IntersectionObserver(
      (entries) => {
        if (triggered || !entries.some((entry) => entry.isIntersecting)) return
        triggered = true
        observer.disconnect()
        setVisibleCount((count) => Math.min(count + POSTS_PER_BATCH, posts.length))
      },
      { rootMargin: '0px 0px 300px 0px' }
    )

    observer.observe(trigger)
    return () => observer.disconnect()
    // Observe the new list end after each batch, even if it is still near the viewport.
  }, [hasMore, posts.length, visibleCount])

  return (
    <section id="blog-results" className={styles.page} aria-label={title}>
      {posts.length === 0 ? (
        <div className={styles.empty}>
          <h2>No posts in this category yet.</h2>
          <button type="button" onClick={onClear}>
            Back to All
          </button>
        </div>
      ) : (
        <ul className={styles.posts}>
          {displayPosts.map((post) => (
            <li key={post.path}>
              <BlogEntry post={post} />
            </li>
          ))}
        </ul>
      )}
      {hasMore && <div ref={loadMoreRef} className={styles.loadMoreTrigger} aria-hidden="true" />}
      <p role="status" className="sr-only">
        {visibleCount > POSTS_PER_BATCH ? `${displayPosts.length} posts loaded.` : ''}
      </p>
      {posts.length > POSTS_PER_BATCH && (
        <noscript>
          <ul className={`${styles.posts} ${styles.remainingPosts}`}>
            {posts.slice(POSTS_PER_BATCH).map((post) => (
              <li key={post.path}>
                <BlogEntry post={post} />
              </li>
            ))}
          </ul>
        </noscript>
      )}
    </section>
  )
}

export default function BlogListLayout({ posts, title }: BlogListLayoutProps) {
  const [query, setQuery] = useState('')
  const [minResultsHeight, setMinResultsHeight] = useState(0)
  const resultsRef = useRef<HTMLDivElement>(null)
  const category = getBlogCategory(new URLSearchParams(query).get('category'))
  const filteredPosts = useMemo(() => filterBlogPosts(posts, category), [posts, category])

  function updateCategory(next: BlogCategory) {
    const url = new URL(window.location.href)
    if (next === 'all') url.searchParams.delete('category')
    else url.searchParams.set('category', next)
    // Retire the previous controls without leaving invisible constraints in shared URLs.
    for (const name of ['year', 'location', 'tag', 'page']) {
      url.searchParams.delete(name)
    }
    if (url.href === window.location.href) return
    // A short/empty result must not shrink the document enough to jump up the page.
    // Keep only the currently visible result area, not the previous list's full height.
    setMinResultsHeight(
      window.scrollY > 0 && resultsRef.current
        ? Math.max(0, window.innerHeight - resultsRef.current.getBoundingClientRect().top)
        : 0
    )
    // Native history works with static hosting and keeps every filter choice navigable.
    window.history.pushState(null, '', url)
    setQuery(url.searchParams.toString())
  }

  const showAll = () => updateCategory('all')

  return (
    <>
      {/* Only URL synchronization needs a client boundary; the page stays prerendered. */}
      <Suspense fallback={null}>
        <BlogUrlState onChange={setQuery} />
      </Suspense>
      <BlogHero category={category} resultCount={filteredPosts.length} onChange={updateCategory} />
      <Breadcrumbs
        placement="after-cover"
        items={
          category === 'all'
            ? [{ label: 'Blog' }]
            : [
                { label: 'Blog', href: '/blog' },
                { label: blogCategories.find((item) => item.value === category)!.label },
              ]
        }
      />
      <div ref={resultsRef} style={{ minHeight: minResultsHeight }}>
        <BlogPostFeed key={category} posts={filteredPosts} title={title} onClear={showAll} />
      </div>
    </>
  )
}
