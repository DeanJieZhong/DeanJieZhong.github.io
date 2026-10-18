import Link from '@/components/Link'
import styles from './Breadcrumbs.module.css'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: readonly BreadcrumbItem[]
  placement?: 'heading' | 'after-cover'
  tone?: 'default' | 'inverse'
  className?: string
}

export default function Breadcrumbs({
  items,
  placement = 'heading',
  tone = 'default',
  className = '',
}: BreadcrumbsProps) {
  const trail: BreadcrumbItem[] = [{ label: 'Home', href: '/' }, ...items]

  return (
    <nav
      aria-label="Breadcrumb"
      className={`${styles.breadcrumbs} ${placement === 'after-cover' ? styles.afterCover : styles.heading} ${tone === 'inverse' ? styles.inverse : ''} ${className}`}
    >
      <ol className={styles.trail}>
        {trail.map((item, index) => {
          const isCurrent = index === trail.length - 1

          return (
            <li key={`${item.label}-${index}`} className={styles.item}>
              {index > 0 && (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 12 12"
                  fill="none"
                  className={styles.separator}
                >
                  <path d="m4.5 2.5 3.5 3.5-3.5 3.5" />
                </svg>
              )}
              {item.href && !isCurrent ? (
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isCurrent ? 'page' : undefined} className={styles.current}>
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
