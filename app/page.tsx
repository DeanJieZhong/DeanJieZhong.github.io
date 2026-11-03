import type { CSSProperties } from 'react'
import Image from 'next/image'
import HomeProjectFlow from '@/components/HomeProjectFlow'
import HomeHero from '@/components/HomeHero'
import Link from '@/components/Link'
import homeProjects, { homeIntroduction } from '@/data/homeProjectsData'
import styles from './Home.module.css'

export default function HomePage() {
  return (
    <div className={styles.home}>
      <HomeHero />

      <section id="home-content" className={styles.introduction} aria-label="Introduction">
        <div className={styles.introInner}>
          {homeIntroduction.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className={styles.projects} aria-label="Selected projects">
        <HomeProjectFlow>
          {homeProjects.map((project, index) => (
            <article
              key={project.id}
              className={styles.project}
              data-home-project={project.id}
              data-image-ratio={project.image.width / project.image.height}
              style={
                { '--image-ratio': project.image.width / project.image.height } as CSSProperties
              }
              aria-labelledby={`home-${project.id}-title`}
            >
              <div className={styles.identity}>
                <header className={styles.projectHeading}>
                  <p className={styles.number}>0{index + 1} / 03</p>
                  <h2
                    id={`home-${project.id}-title`}
                    className={project.title.length === 1 ? styles.shortTitle : undefined}
                  >
                    {project.title.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </h2>
                  <p className={styles.subtitle}>
                    {project.italicSubtitle ? <i>{project.subtitle}</i> : project.subtitle}
                  </p>
                </header>
                <figure className={styles.figure}>
                  <Image
                    src={project.image.src}
                    width={project.image.width}
                    height={project.image.height}
                    alt={project.image.alt}
                    sizes="(max-width: 760px) 100vw, (max-width: 1280px) 55vw, 640px"
                  />
                  <figcaption>{project.image.caption}</figcaption>
                </figure>
              </div>

              <div className={styles.projectSpine} data-project-spine aria-hidden="true" />
              <div className={styles.story}>
                {project.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <div className={styles.progress}>
                  <h3>{project.progressTitle}</h3>
                  <p>{project.progress}</p>
                </div>
                <p className={styles.note}>{project.note}</p>
                <Link href={project.href} className={styles.projectLink}>
                  Explore the project
                  <span className="sr-only">: {project.title.join(' ')}</span>
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </HomeProjectFlow>
        <div className={styles.allResearch}>
          <Link href="/research/">
            All research <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/about-dean-jie-zhong/">
            More about me <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
