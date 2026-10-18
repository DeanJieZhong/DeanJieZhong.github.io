import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import { siteVersion } from '@/data/siteVersion'
import { sectionContainerClassName } from './SectionContainer'
import styles from './Footer.module.css'

const links = [
  { title: 'Contact', href: '/about-dean-jie-zhong/#contact' },
  { title: 'About this site', href: '/about-this-site/' },
]

export default function Footer() {
  return (
    <footer id="site-footer" className={styles.footer}>
      <div className={`${sectionContainerClassName} ${styles.inner}`}>
        <p className={styles.copyright}>
          <span>
            © {new Date().getFullYear()} {siteMetadata.author}
          </span>
          <span className={styles.release}>
            <span aria-hidden="true">·</span>
            <Link
              href="/website-updates/"
              title="View update history"
              aria-label={`${siteVersion.label}: View update history`}
              className={`${styles.link} ${styles.version}`}
            >
              <span className={styles.label}>{siteVersion.label}</span>
            </Link>
          </span>
        </p>
        <nav aria-label="Footer" className={styles.navigation}>
          <ul className={styles.links}>
            {links.map(({ title, href }) => (
              <li key={title}>
                <Link href={href} className={styles.link}>
                  <span className={styles.label}>
                    {title} <span aria-hidden="true">↗</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
