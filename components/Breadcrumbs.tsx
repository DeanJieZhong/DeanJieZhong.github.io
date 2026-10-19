import Link from '@/components/Link'
import styles from './Breadcrumbs.module.css'

export interface BreadcrumbItem {
  label: string
  italicText?: string
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
          const italicStart = item.italicText ? item.label.indexOf(item.italicText) : -1
          const label =
            item.italicText && italicStart >= 0 ? (
              <>
                {item.label.slice(0, italicStart)}
                <i>{item.italicText}</i>
                {item.label.slice(italicStart + item.italicText.length)}
              </>
            ) : (
              item.label
            )

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
                  {label}
                </Link>
              ) : (
                <span aria-current={isCurrent ? 'page' : undefined} className={styles.current}>
                  {label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
