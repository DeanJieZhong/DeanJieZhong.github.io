import { Fragment } from 'react'
import Image from 'next/image'
import Link from '@/components/Link'
import Breadcrumbs from '@/components/Breadcrumbs'
import trogen from '@/data/trogenData'
import type { TrogenFigure } from '@/data/trogenData'
import styles from './TrogenArticle.module.css'
import projectStyles from './TrogenProject.module.css'

const contentWidth = 'mx-auto max-w-4xl px-4 sm:px-6'
const headingStyle = 'text-2xl font-semibold tracking-tight sm:text-3xl'
const linkStyle = 'underline underline-offset-4 decoration-gray-400 focus-visible:outline-offset-4'

function ProjectText({ children }: { children: string }) {
  return children
    .split(/(\*[^*]+\*)/g)
    .map((part, index) => (
      <Fragment key={index}>
        {part.startsWith('*') && part.endsWith('*') ? <em>{part.slice(1, -1)}</em> : part}
      </Fragment>
    ))
}

function Paragraphs({ paragraphs }: { paragraphs: string[] }) {
  return paragraphs.map((paragraph) => (
    <p key={paragraph}>
      <ProjectText>{paragraph}</ProjectText>
    </p>
  ))
}

function ProjectFigure({ figure, priority = false }: { figure: TrogenFigure; priority?: boolean }) {
  return (
    <figure className={styles.figure} aria-labelledby={`${figure.id}-caption`}>
      <p className={styles.figureLabel}>{figure.label}</p>
      <div className={figure.layout === 'comparison' ? styles.comparison : undefined}>
        {figure.images.map((image) => (
          <div
            key={image.src}
            className={figure.layout === 'comparison' ? styles.panel : undefined}
          >
            {image.label && <p className={styles.panelLabel}>{image.label}</p>}
            <div className={figure.layout === 'design' ? styles.designWindow : undefined}>
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes={
                  figure.layout === 'comparison'
                    ? '(max-width: 600px) 360px, 300px'
                    : '(min-width: 1024px) 896px, 100vw'
                }
                priority={priority}
                unoptimized
                className={styles.figureImage}
              />
            </div>
          </div>
        ))}
      </div>
      <figcaption id={`${figure.id}-caption`} className={`${styles.reading} ${styles.caption}`}>
        <p>
          <strong>{figure.captionTitle}</strong> <ProjectText>{figure.caption}</ProjectText>
        </p>
        <p className={styles.credit}>{figure.credit}</p>
      </figcaption>
    </figure>
  )
}

export default function TrogenProject() {
  return (
    <article className={`${projectStyles.page} break-words`} aria-labelledby="trogen-title">
      <div className="interaction-dark bg-black text-gray-300">
        <div className="relative">
          <div className="relative">
            <Image
              src={trogen.photo.src}
              alt={trogen.photo.alt}
              width={trogen.photo.width}
              height={trogen.photo.height}
              sizes="100vw"
              priority
              className="block h-auto w-full"
            />
            <div
              aria-hidden="true"
              className={`${projectStyles.gradient} pointer-events-none absolute inset-0`}
            />
          </div>
          <div className="relative -mt-6 pb-6 sm:absolute sm:inset-x-0 sm:bottom-0 sm:mt-0 sm:pb-10 lg:pb-14">
            <div className={contentWidth}>
              <h1
                id="trogen-title"
                className={`${projectStyles.title} font-bold tracking-tight text-white`}
              >
                {trogen.title}
              </h1>
            </div>
          </div>
        </div>

        <div className={contentWidth}>
          <Breadcrumbs
            items={[{ label: 'Research', href: '/research' }, { label: 'TroGen' }]}
            placement="after-cover"
            tone="inverse"
          />
        </div>
        <section
          aria-labelledby="project-overview"
          className={`${contentWidth} pt-6 pb-12 sm:pt-8 sm:pb-16`}
        >
          <h2 id="project-overview" className={`${headingStyle} text-white`}>
            Project overview
          </h2>
          <p className="mt-5 text-base leading-8 sm:text-lg">{trogen.summary}</p>

          <div className="mt-7 space-y-2 text-sm leading-6 sm:text-base sm:leading-7">
            <p>Role: {trogen.role}</p>
            <p>
              Supervisors:{' '}
              {trogen.pis.map((pi, index) => (
                <Fragment key={pi.name}>
                  {index > 0 && ' and '}
                  {pi.url ? (
                    <Link href={pi.url} className={linkStyle}>
                      {pi.name}
                    </Link>
                  ) : (
                    pi.name
                  )}
                </Fragment>
              ))}
            </p>
            <p>
              {trogen.context.map((item, index) => (
                <Fragment key={item.name}>
                  {index > 0 && ' · '}
                  {item.url ? (
                    <Link href={item.url} className={linkStyle}>
                      {item.name}
                    </Link>
                  ) : (
                    item.name
                  )}
                </Fragment>
              ))}
            </p>
            <p>{trogen.participationPeriod}</p>
          </div>

          <p className="mt-7 text-base leading-7 text-white">
            <Link href={trogen.wiki} className={linkStyle}>
              Visit project wiki
            </Link>
          </p>
        </section>
      </div>

      <div className="bg-white text-gray-700">
        <div className={`${styles.article} px-4 sm:px-6`}>
          <nav className={`${styles.reading} ${styles.sectionNav}`} aria-label="On this page">
            {trogen.sections.map((section) => (
              <Link key={section.id} href={`#${section.id}`}>
                {section.title}
              </Link>
            ))}
          </nav>
          <section aria-labelledby="research-question">
            <div className={`${styles.reading} ${styles.prose}`}>
              <h2 id="research-question">Research question &amp; approach</h2>
              <Paragraphs paragraphs={trogen.overview} />
            </div>
            <ProjectFigure figure={trogen.conceptFigure} />
          </section>
          {trogen.sections.map((section) => (
            <section
              key={section.id}
              className={`${styles.section} ${section.id === 'reflection' ? styles.reflection : ''}`}
              aria-labelledby={section.id}
            >
              <div className={`${styles.reading} ${styles.prose}`}>
                <h2 id={section.id}>{section.title}</h2>
                {section.paragraphs && <Paragraphs paragraphs={section.paragraphs} />}
                {section.items && (
                  <ul className={styles.contributions}>
                    {section.items.map((item) => (
                      <li key={item.title}>
                        <strong>{item.title}</strong> <ProjectText>{item.body}</ProjectText>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {section.figure && <ProjectFigure figure={section.figure} />}
              {section.subsections?.map((subsection) => (
                <section
                  key={subsection.id}
                  className={styles.subsection}
                  aria-labelledby={subsection.id}
                >
                  <div className={`${styles.reading} ${styles.prose}`}>
                    <h3 id={subsection.id}>{subsection.title}</h3>
                    <Paragraphs paragraphs={subsection.paragraphs} />
                  </div>
                  {subsection.figure && <ProjectFigure figure={subsection.figure} />}
                </section>
              ))}
              {section.links && (
                <nav
                  className={`${styles.reading} ${styles.resources}`}
                  aria-label="Project resources"
                >
                  {section.links.map((link) => (
                    <Link key={link.url} href={link.url}>
                      {link.label}
                    </Link>
                  ))}
                </nav>
              )}
            </section>
          ))}
          <nav className={`${styles.reading} ${styles.returnNav}`} aria-label="Research navigation">
            <Link href="/research">Back to Research</Link>
          </nav>
        </div>
      </div>
    </article>
  )
}
