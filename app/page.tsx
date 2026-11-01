import HomeHero from '@/components/HomeHero'
import Link from '@/components/Link'
import headerNavLinks from '@/data/headerNavLinks'
import styles from './Home.module.css'

export default function HomePage() {
  return (
    <div className={styles.home}>
      <HomeHero />

      <section id="home-content" className={styles.content} aria-label="Homepage content">
        <nav className={styles.links} aria-label="Explore">
          {headerNavLinks.map(({ href, title }) => (
            <Link key={href} href={href}>
              {title} <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
        <div className={styles.placeholder}>
          <h2>Under construction</h2>
          <p lang="zh-CN">内容建设中，敬请期待。</p>
        </div>
      </section>
    </div>
  )
}
