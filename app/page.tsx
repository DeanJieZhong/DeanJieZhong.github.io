import type { CSSProperties } from 'react'
import Image from 'next/image'
import HomeProjectFlow from '@/components/HomeProjectFlow'
import HomeHero from '@/components/HomeHero'
import HomeMemoryPhoto from '@/components/HomeMemoryPhoto'
import Link from '@/components/Link'
import homeProjects, {
  homeIntroduction,
  homeOutlook,
  homeProjectInvitation,
} from '@/data/homeProjectsData'
import styles from './Home.module.css'

function AwardText({ award }: { award: string }) {
  return award.split(/(\([^()]*\))/).map((part, index) =>
    part.startsWith('(') ? (
      <span key={index} className="text-sm text-[#666]">
        {part}
      </span>
    ) : (
      part
    )
  )
}

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

      <section className={styles.projects} aria-label="Research journey and future goals">
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
                    <div className={styles.figureImage}>
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
                  </div>
                  <figcaption>{project.image.caption}</figcaption>
                </figure>
              </div>

              <div className={styles.projectSpine} data-project-spine aria-hidden="true" />
              <div className={styles.story}>
                {project.paragraphs.map((paragraph) => (
                  <p key={paragraph}>
                    {paragraph
                      .split(/(Flavobacterium johnsoniae)/)
                      .map((part, index) =>
                        part === 'Flavobacterium johnsoniae' ? <em key={index}>{part}</em> : part
                      )}
                  </p>
                ))}
                {project.advisoryTeams.length > 0 && (
                  <ul className="mt-6 list-none space-y-8">
                    {project.advisoryTeams.map((team) => (
                      <li key={team.id}>
                        <h3 className="mb-3 flex items-start gap-3 font-semibold">
                          <span className="min-w-0 flex-1">{team.title}</span>
                          <Link
                            href={team.href}
                            className={styles.teamProjectLink}
                            aria-label={`Explore the project: ${team.title}`}
                          >
                            <span aria-hidden="true">↗</span>
                          </Link>
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
                        {team.awards.length > 0 && (
                          <div className="mt-5">
                            {team.awardsIntroduction && <p>{team.awardsIntroduction}</p>}
                            <ul className={styles.awardList}>
                              {team.awards.map((award) => (
                                <li key={award}>
                                  <AwardText award={award} />
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
                {project.awards.length > 0 && (
                  <div className="mt-5">
                    {project.awardsIntroduction && <p>{project.awardsIntroduction}</p>}
                    <ul className={styles.awardList}>
                      {project.awards.map((award) => (
                        <li key={award}>
                          <AwardText award={award} />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {project.progress && (
                  <div className={styles.progress}>
                    <h3>{project.progressTitle}</h3>
                    <p>{project.progress}</p>
                  </div>
                )}
                {project.note && <p className={styles.note}>{project.note}</p>}
                {project.advisoryTeams.length === 0 && (
                  <div className={project.memory ? styles.projectActions : undefined}>
                    <Link href={project.href} className={styles.projectLink}>
                      Explore the project
                      <span className="sr-only">: {project.title.join(' ')}</span>
                      <span aria-hidden="true">↗</span>
                    </Link>
                    {project.memory && <HomeMemoryPhoto {...project.memory} />}
                  </div>
                )}
              </div>
            </article>
          ))}
          <article
            id="whats-next"
            className={styles.outlook}
            data-home-project="outlook"
            aria-labelledby="home-outlook-title"
          >
            <div
              className={`${styles.projectSpine} ${styles.outlookArrow}`}
              data-project-spine
              aria-hidden="true"
            />
            <header className={styles.outlookHeading}>
              <h2 id="home-outlook-title">
                {homeOutlook.title.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h2>
            </header>
            <div className={styles.outlookStory}>
              {homeOutlook.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        </HomeProjectFlow>
      </section>
    </div>
  )
}
