import HomeHero from '@/components/HomeHero'
import Link from '@/components/Link'
import headerNavLinks from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'
import styles from './Home.module.css'

export default function HomePage() {
  return (
    <div className={styles.home}>
      <HomeHero />

      <section id="home-content" className={styles.content} aria-label="Introduction">
        <nav className={styles.links} aria-label="Explore">
          {headerNavLinks.map(({ href, title }) => (
            <Link key={href} href={href}>
              {title} <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
        <div className={styles.bio}>
          <div>
            <p>
              {siteMetadata.author} is an undergraduate student in Biological Sciences at Xi’an
              Jiaotong-Liverpool University. His academic interests focus on synthetic biology,
              microbial engineering, and immunology.
            </p>
            <p>
              He has worked on project-based research involving engineered bacterial systems,
              translational control, and microbial motility. His current interests include the
              design of biological systems with controllable behavior and the study of microbial
              interactions in complex environments.
            </p>
          </div>
          <div>
            <p>
              Beyond laboratory research, {siteMetadata.author} is interested in scientific
              communication, interdisciplinary collaboration, and the long-term development of
              research-driven academic work. He is building a portfolio centered on experimental
              biology, problem-oriented design, and future research training.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
