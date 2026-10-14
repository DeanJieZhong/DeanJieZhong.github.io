import Image from '@/components/Image'
import { sectionContainerClassName } from '@/components/SectionContainer'
import { blogCategories, type BlogCategory } from '@/layouts/blogFilters'
import styles from './BlogHero.module.css'

interface BlogHeroProps {
  category: BlogCategory
  resultCount: number
  onChange: (category: BlogCategory) => void
}

export default function BlogHero({ category, resultCount, onChange }: BlogHeroProps) {
  return (
    <header className={styles.hero} aria-labelledby="blog-title">
      <div className={styles.visual}>
        <Image
          src="/static/images/mountains.png"
          alt="A panoramic ridge of snow-covered mountains."
          width={5712}
          height={1071}
          sizes="100vw"
          priority
          unoptimized
          className={styles.mountains}
        />
        <div className={styles.gradient} aria-hidden="true" />
        <div className={styles.titlePosition}>
          <div className={sectionContainerClassName}>
            <h1 id="blog-title" className={styles.title}>
              Blog
            </h1>
          </div>
        </div>
      </div>
      <div className={`${sectionContainerClassName} ${styles.details}`}>
        <p className={styles.introduction}>
          Notes on experiments, research, and the questions I’m thinking about.
        </p>
        <div className={styles.filters} role="group" aria-label="Filter blog posts by category">
          {blogCategories.map((item) => (
            <button
              key={item.value}
              type="button"
              className={styles.filterButton}
              aria-pressed={category === item.value}
              aria-controls="blog-results"
              onClick={() => onChange(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {resultCount} {resultCount === 1 ? 'post' : 'posts'} found.
        </p>
      </div>
    </header>
  )
}
