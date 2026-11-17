import type { CSSProperties } from 'react'
import Image from 'next/image'
import HomeProjectFlow from '@/components/HomeProjectFlow'
import HomeHero from '@/components/HomeHero'
import Link from '@/components/Link'
import homeProjects, { homeIntroduction, homeProjectInvitation } from '@/data/homeProjectsData'
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
          <p className={styles.projectInvitation}>
            {homeProjectInvitation}
            <span className={styles.introLine} data-project-entry aria-hidden="true" />
          </p>
        </div>
      </section>

      <section className={styles.projects} aria-label="Selected projects">
        <HomeProjectFlow>
          {homeProjects.map((project) => (
            <article
              key={project.id}
              className={styles.project}
              data-home-project={project.id}
              data-image-ratio={project.image.width / project.image.height}
              data-image-scale={project.imageScale}
              style={
                {
                  '--image-ratio': project.image.width / project.image.height,
                  '--image-scale': project.imageScale,
                } as CSSProperties
              }
              aria-labelledby={`home-${project.id}-title`}
            >
              <div className={styles.identity}>
                <header className={styles.projectHeading}>
                  <p className={styles.projectLabel}>
                    {project.label} · {project.institutionLines.join(', ')}
                  </p>
                  <h2
                    id={`home-${project.id}-title`}
                    className={project.title.length === 1 ? styles.shortTitle : undefined}
                  >
                    {project.title.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </h2>
                  <div className={styles.projectMetadata}>
                    <p className={styles.role}>{project.role}</p>
                  </div>
                </header>
                <figure className={styles.figure}>
                  <div
                    className={styles.figureViewport}
                    tabIndex={project.imageScale > 1 ? 0 : undefined}
                    role={project.imageScale > 1 ? 'region' : undefined}
                    aria-label={project.imageScale > 1 ? project.image.caption : undefined}
                  >
                    <Image
                      src={project.image.src}
                      width={project.image.width}
                      height={project.image.height}
                      alt={project.image.alt}
                      sizes={
                        project.imageScale > 1
                          ? '(max-width: 760px) 150vw, (max-width: 1280px) 82.5vw, 960px'
                          : '(max-width: 760px) 100vw, (max-width: 1280px) 55vw, 640px'
                      }
                    />
                  </div>
                  <figcaption>{project.image.caption}</figcaption>
                </figure>
              </div>

              <div className={styles.projectSpine} data-project-spine aria-hidden="true" />
              <div className={styles.story}>
                {project.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {project.advisoryTeams.length > 0 && (
                  <ul className="mt-6 list-none space-y-8">
                    {project.advisoryTeams.map((team) => (
                      <li key={team.id}>
                        <h3 className="mb-3 font-semibold">
                          <Link href={team.href}>{team.title}</Link>
                        </h3>
                        <p>
                          {team.description
                            .split(/(Escherichia coli|Bifidobacterium longum)/)
                            .map((part, index) =>
                              /^(Escherichia coli|Bifidobacterium longum)$/.test(part) ? (
                                <em key={index}>{part}</em>
                              ) : (
                                part
                              )
                            )}
                        </p>
                        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6">
                          {team.awards.map((award) => (
                            <li key={award}>{award}</li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                )}
                {project.awards.length > 0 && (
                  <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-6">
                    {project.awards.map((award) => (
                      <li key={award}>{award}</li>
                    ))}
                  </ul>
                )}
                {project.progress && (
                  <div className={styles.progress}>
                    <h3>{project.progressTitle}</h3>
                    <p>{project.progress}</p>
                  </div>
                )}
                {project.note && <p className={styles.note}>{project.note}</p>}
                {project.advisoryTeams.length === 0 && (
                  <Link href={project.href} className={styles.projectLink}>
                    Explore the project
                    <span className="sr-only">: {project.title.join(' ')}</span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                )}
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
