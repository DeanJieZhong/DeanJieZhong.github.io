import { Fragment } from 'react'
import Image from 'next/image'
import Link from '@/components/Link'
import Breadcrumbs from '@/components/Breadcrumbs'
import ScholarPopover, { ScholarPopoverGroup } from '@/components/ScholarPopover'
import { ResearchSupervisors } from '@/components/ResearchExperienceMetadata'
import { researchExperiences } from '@/data/researchData'
import colleaguesData from '@/data/colleaguesData'
import trogen from '@/data/trogenData'
import type { TrogenAward, TrogenBlock, TrogenSection } from '@/data/trogenData'
import trogenFigures from '@/data/trogenFigures'
import type { TrogenFigure } from '@/data/trogenFigures'
import styles from './TrogenArticle.module.css'
import articleStyles from './Cxcl13Article.module.css'
import researchStyles from './TrogenResearchLines.module.css'
import projectStyles from './TrogenProject.module.css'

const contentWidth = 'mx-auto max-w-4xl px-4 sm:px-6'
const igemExperience = researchExperiences.find((experience) => experience.id === 'igem-2025')!

function ProjectText({ children }: { children: string }) {
  return children
    .split(/(\[[^\]]+\]\((?:https?:\/\/|#)[^)]+\)|\*\*.+?\*\*|\*[^*]+\*|_[^_]+_)/g)
    .map((part, index) => {
      const link = part.match(/^\[([^\]]+)\]\(((?:https?:\/\/|#)[^)]+)\)$/)
      if (link)
        return (
          <Link key={index} href={link[2]} className={articleStyles.citation}>
            <ProjectText>{link[1]}</ProjectText>
          </Link>
        )
      if (part.startsWith('**') && part.endsWith('**'))
        return (
          <strong key={index}>
            <ProjectText>{part.slice(2, -2)}</ProjectText>
          </strong>
        )
      if (
        (part.startsWith('*') && part.endsWith('*')) ||
        (part.startsWith('_') && part.endsWith('_'))
      )
        return <em key={index}>{part.slice(1, -1)}</em>
      return <Fragment key={index}>{part}</Fragment>
    })
}

function ProjectFigure({ figure }: { figure: TrogenFigure }) {
  const panelsClass = {
    single: styles.single,
    design: styles.single,
    comparison: styles.comparison,
    pair: styles.pair,
    assay: styles.assay,
    triptych: styles.triptych,
    stacked: styles.stacked,
  }[figure.layout]
  return (
    <figure
      id={figure.id}
      className={styles.figure}
      style={{ maxWidth: figure.maxWidth }}
      aria-labelledby={`${figure.id}-caption`}
    >
      <div className={panelsClass}>
        {figure.images.map((image) => (
          <div key={image.src} className={styles.panel}>
            {image.label && (
              <p className={styles.panelLabel}>
                <ProjectText>{image.label}</ProjectText>
              </p>
            )}
            <Link
              href={image.src}
              target="_blank"
              rel="noopener noreferrer"
              className={articleStyles.figureLink}
              aria-label={`Open full-size figure: ${image.alt}`}
            >
              <div className={figure.layout === 'design' ? styles.designWindow : undefined}>
                <picture>
                  {image.mobileSrc && (
                    <source media="(max-width: 600px)" srcSet={image.mobileSrc} />
                  )}
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes={
                      figure.images.length > 1
                        ? '(max-width: 600px) 88vw, 350px'
                        : '(max-width: 740px) 92vw, 720px'
                    }
                    unoptimized
                    className={styles.figureImage}
                  />
                </picture>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <figcaption id={`${figure.id}-caption`} className={styles.caption}>
        <strong>
          <ProjectText>{figure.captionTitle}</ProjectText>
        </strong>{' '}
        <ProjectText>{figure.caption}</ProjectText>
      </figcaption>
    </figure>
  )
}

function AwardShowcase({ awards }: { awards: TrogenAward[] }) {
  return (
    <ul className={styles.awardsGrid} aria-label="iGEM 2025 awards">
      {awards.map((award) => (
        <li
          key={award.id}
          className={`${styles.awardCard} ${award.featured ? styles.awardFeatured : ''}`}
        >
          <Image
            src={award.icon.src}
            alt=""
            width={award.icon.width}
            height={award.icon.height}
            sizes="88px"
            unoptimized
            className={styles.awardIcon}
          />
          <p className={`${styles.awardHeadline} ${award.status ? styles.awardName : ''}`}>
            {award.headline}
          </p>
          {award.title && <p className={styles.awardTitle}>{award.title}</p>}
          {award.status && <p className={styles.awardStatus}>{award.status}</p>}
          <p className={styles.awardDetail}>{award.detail}</p>
        </li>
      ))}
    </ul>
  )
}

function ContentBlocks({ blocks }: { blocks: TrogenBlock[] }) {
  return blocks.map((block, index) => {
    if (block.type === 'awards') return <AwardShowcase key={index} awards={block.awards} />
    if (block.type === 'figure')
      return <ProjectFigure key={block.figureId} figure={trogenFigures[block.figureId]} />
    if (block.type === 'heading')
      return (
        <div key={block.id} className={`${styles.reading} ${styles.prose}`}>
          <h4 id={block.id} className={researchStyles.resultHeading}>
            <ProjectText>{block.text}</ProjectText>
          </h4>
        </div>
      )
    if (block.type === 'list')
      return (
        <div key={index} className={`${styles.reading} ${styles.prose} ${styles.textBlock}`}>
          <ul className={articleStyles.contributions}>
            {block.items.map((item) => (
              <li key={item}>
                <ProjectText>{item}</ProjectText>
              </li>
            ))}
          </ul>
        </div>
      )
    return (
      <p key={index} className={`${styles.reading} ${styles.prose} ${styles.textBlock}`}>
        <ProjectText>{block.text}</ProjectText>
      </p>
    )
  })
}

function ResearchSection({
  section,
  headingLevel = 3,
}: {
  section: TrogenSection
  headingLevel?: 2 | 3
}) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <section
      className={headingLevel === 2 ? articleStyles.project : researchStyles.subsection}
      aria-labelledby={section.id}
    >
      <div className={`${styles.reading} ${styles.prose}`}>
        <Heading
          id={section.id}
          className={headingLevel === 3 ? researchStyles.subsectionHeading : undefined}
        >
          {section.title}
        </Heading>
      </div>
      <ContentBlocks blocks={section.blocks} />
    </section>
  )
}

export default function TrogenProject() {
  return (
    <article className={`${projectStyles.page} break-words`} aria-labelledby="trogen-title">
      <div className="interaction-dark [&_a:focus-visible]:outline-primary-300 bg-black text-gray-300">
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
            items={[{ label: 'Research', href: '/research' }, { label: trogen.title }]}
            placement="after-cover"
            tone="inverse"
          />
        </div>
        <section
          aria-labelledby="trogen-title"
          className={`${contentWidth} pt-6 pb-12 sm:pt-8 sm:pb-16`}
        >
          <p className="mt-5 text-base leading-8 sm:text-lg">{trogen.summary}</p>

          <div className="mt-7 space-y-2 text-sm leading-6 sm:text-base sm:leading-7">
            <p>Role: {trogen.role}</p>
            <ScholarPopoverGroup>
              <ResearchSupervisors id="supervisors" supervisors={igemExperience.supervisors} />
              <p id="colleagues">
                Colleagues:{' '}
                {trogen.colleagues.map((id, index) => (
                  <Fragment key={id}>
                    {index > 0 && ', '}
                    <ScholarPopover scholar={colleaguesData[id]} />
                  </Fragment>
                ))}
                , and other team members.
              </p>
            </ScholarPopoverGroup>
            <p>
              Team: {trogen.team} (
              <Link href={trogen.wiki} className={projectStyles.wikiLink}>
                visit wiki
              </Link>
              )
            </p>
            <p>{trogen.institution}</p>
            <p>{trogen.participationPeriod}</p>
          </div>
        </section>
      </div>

      <div className="bg-white text-gray-700">
        <div className={`${styles.article} ${articleStyles.article} px-4 sm:px-6`}>
          <nav
            className={`${styles.reading} ${articleStyles.outline}`}
            id="page-outline"
            aria-labelledby="project-overview"
          >
            <div className={styles.prose}>
              <h2 id="project-overview">Project overview</h2>
            </div>
            <ul className={articleStyles.outlineTree}>
              <li>
                <Link className={articleStyles.outlineLink} href="#research-context">
                  Research context and role
                </Link>
              </li>
              <li>
                <Link className={articleStyles.outlineLink} href={`#${trogen.researchLines[0].id}`}>
                  Research areas
                </Link>
                <ul>
                  {trogen.researchLines.map((line) => (
                    <li key={line.id}>
                      <Link className={articleStyles.outlineLink} href={`#${line.id}`}>
                        {line.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {trogen.sections.map((section) => (
                <li key={section.id}>
                  <Link className={articleStyles.outlineLink} href={`#${section.id}`}>
                    {section.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link className={articleStyles.outlineLink} href="#references">
                  References
                </Link>
              </li>
            </ul>
          </nav>
          <section aria-labelledby="research-context">
            <div className={`${styles.reading} ${styles.prose}`}>
              <h2 id="research-context">Research context and role</h2>
            </div>
            <ContentBlocks blocks={trogen.overview} />
          </section>
          {trogen.researchLines.map((line) => (
            <section key={line.id} className={articleStyles.project} aria-labelledby={line.id}>
              <div className={`${styles.reading} ${styles.prose}`}>
                <h2 id={line.id}>{line.title}</h2>
              </div>
              {line.sections.map((section) => (
                <ResearchSection key={section.id} section={section} />
              ))}
            </section>
          ))}
          {trogen.sections.map((section) => (
            <ResearchSection key={section.id} section={section} headingLevel={2} />
          ))}
          <section className={articleStyles.project} aria-labelledby="references">
            <div className={`${styles.reading} ${styles.prose}`}>
              <h2 id="references">References</h2>
              <ul className={articleStyles.references}>
                {trogen.references.map((reference) => (
                  <li key={reference}>
                    <ProjectText>{reference}</ProjectText>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <nav className={`${styles.reading} ${styles.returnNav}`} aria-label="Research navigation">
            <Link href="/research">Back to Research</Link>
          </nav>
        </div>
      </div>
    </article>
  )
}
