import { Fragment } from 'react'
import Image from 'next/image'
import Link from '@/components/Link'
import Breadcrumbs from '@/components/Breadcrumbs'
import PreparedProjectCover from '@/components/PreparedProjectCover'
import ScholarPopover, { ScholarPopoverGroup } from '@/components/ScholarPopover'
import scholarsData from '@/data/scholarsData'
import trogen from '@/data/trogenData'
import { pageTitleSlug } from '../lib/pageTitleSlug'
import advisory, {
  advisoryAdditionalPhotos,
  advisorySectionPhotos,
  advisorySelectionSlides,
} from '@/data/xjtluAdvisoryData'
import type { AdvisoryPhoto } from '@/data/xjtluAdvisoryData'
import articleStyles from './TrogenArticle.module.css'
import projectStyles from './TrogenProject.module.css'

const contentWidth = 'mx-auto max-w-4xl px-4 sm:px-6'
const linkStyle = 'underline underline-offset-4 decoration-gray-400 focus-visible:outline-offset-4'

function AdvisoryPhotograph({ photo }: { photo: AdvisoryPhoto }) {
  return (
    <figure className="mt-8">
      <Link
        href={photo.src}
        target="_blank"
        rel="noopener noreferrer"
        className="block focus-visible:outline-offset-4"
        aria-label={`Open photograph: ${photo.caption}`}
      >
        <Image
          src={photo.src}
          width={photo.width}
          height={photo.height}
          alt={photo.alt}
          sizes="(min-width: 1024px) 848px, 100vw"
          className="block h-auto w-full"
        />
      </Link>
      <figcaption className={`${articleStyles.reading} ${articleStyles.caption}`}>
        {photo.caption}
      </figcaption>
    </figure>
  )
}

function SelectionSlides() {
  return (
    <section className="mt-8" aria-labelledby="selection-materials">
      <div className={`${articleStyles.reading} mb-5`}>
        <h3 id="selection-materials" className="text-lg leading-7 font-medium text-gray-950">
          Selection presentation
        </h3>
        <p className="mt-2 text-sm leading-7 text-gray-600">
          {advisorySelectionSlides.caption} Open a slide to read it in the PDF.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2">
        {advisorySelectionSlides.pages.map((slide) => (
          <figure key={slide.page} className="min-w-0">
            <Link
              href={`${advisorySelectionSlides.pdf}#page=${slide.page}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block focus-visible:outline-offset-4"
              aria-label={`Open ${slide.title}, original slide ${slide.originalSlide}, in PDF`}
            >
              <Image
                src={slide.src}
                width={1600}
                height={901}
                alt={slide.alt}
                sizes="(min-width: 1024px) 414px, (min-width: 640px) 45vw, 100vw"
                className="block h-auto w-full"
              />
            </Link>
            <figcaption className="mt-2 text-xs leading-6 text-gray-600">
              Slide {slide.originalSlide} · {slide.title}
            </figcaption>
          </figure>
        ))}
      </div>
      <p className={`${articleStyles.reading} mt-5 text-sm leading-7`}>
        <Link href={advisorySelectionSlides.pdf} target="_blank" rel="noopener noreferrer">
          Open all four selected slides (PDF)
        </Link>
      </p>
    </section>
  )
}

export default function XjtluAdvisory({ title }: { title: string }) {
  return (
    <article className={`${projectStyles.page} break-words`} aria-labelledby="advisory-title">
      <div className="interaction-dark bg-black text-gray-300">
        <PreparedProjectCover photo={advisory.photo} title={title} titleId="advisory-title" />

        <div className={contentWidth}>
          <Breadcrumbs
            items={[{ label: 'Research', href: '/research' }, { label: title }]}
            placement="after-cover"
            tone="inverse"
          />
        </div>
        <section
          aria-labelledby="advisory-overview"
          className={`${contentWidth} pt-6 pb-12 sm:pt-8 sm:pb-16`}
        >
          <h2
            id="advisory-overview"
            className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
          >
            Advisory overview
          </h2>
          <p className="mt-5 text-base leading-8 sm:text-lg">
            {advisory.overview.introduction}{' '}
            <Link href={advisory.wiki} className={linkStyle}>
              {advisory.project}
            </Link>
            , {advisory.overview.projectDescription} <i>{advisory.organism}</i>.
            <br />
            {advisory.overview.guidance}
          </p>

          <div className="mt-7 space-y-2 text-sm leading-6 sm:text-base sm:leading-7">
            <p>
              Role:{' '}
              <Link href={advisory.roster} className={linkStyle}>
                {advisory.role}
              </Link>
            </p>
            <p>
              Team: {advisory.eventPeriod} ·{' '}
              <Link href={advisory.wiki} className={linkStyle}>
                {advisory.team}
              </Link>
              {' · '}
              {advisory.title}
            </p>
            <ScholarPopoverGroup>
              <p>
                Supervisors:{' '}
                {advisory.supervisors.map((scholarId, index) => (
                  <Fragment key={scholarId}>
                    {index > 0 && ' and '}
                    <ScholarPopover scholar={scholarsData[scholarId]} />
                  </Fragment>
                ))}
              </p>
            </ScholarPopoverGroup>
          </div>
        </section>
      </div>

      <div className="bg-white">
        <div className={`${articleStyles.article} px-4 sm:px-6`}>
          <div className={`${articleStyles.reading} ${articleStyles.prose}`}>
            <p>{advisory.introduction}</p>
          </div>
          {advisory.sections.map((section) => (
            <section
              key={section.id}
              className={articleStyles.section}
              aria-labelledby={section.id}
            >
              <div className={`${articleStyles.reading} ${articleStyles.prose}`}>
                <h2 id={section.id}>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {advisorySectionPhotos[section.id] && (
                <AdvisoryPhotograph photo={advisorySectionPhotos[section.id]} />
              )}
              {section.id === 'proposal-development' && <SelectionSlides />}
            </section>
          ))}

          <details className="mt-12 border-t border-gray-200 pt-6">
            <summary className="cursor-pointer text-base leading-7 font-medium text-gray-950 focus-visible:outline-offset-4">
              More team moments · recruitment &amp; BIOCHINA
            </summary>
            {advisoryAdditionalPhotos.map((photo) => (
              <AdvisoryPhotograph key={photo.src} photo={photo} />
            ))}
          </details>

          <section
            className={`${articleStyles.reading} ${articleStyles.section}`}
            aria-labelledby="team-resources"
          >
            <div className={articleStyles.prose}>
              <h2 id="team-resources">Team &amp; references</h2>
            </div>
            <ul className="space-y-3 text-sm leading-7 sm:text-base">
              {advisory.links.map((link) => (
                <li key={link.url}>
                  <Link href={link.url}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </section>

          <nav
            className={`${articleStyles.reading} ${articleStyles.returnNav} flex flex-wrap gap-x-6 gap-y-3`}
            aria-label="Research navigation"
          >
            <Link href="/research#igem-2025-heading">Back to iGEM</Link>
            <Link href={`/research/${pageTitleSlug(trogen.title)}`}>
              My iGEM 2025 research: TroGen
            </Link>
          </nav>
        </div>
      </div>
    </article>
  )
}
