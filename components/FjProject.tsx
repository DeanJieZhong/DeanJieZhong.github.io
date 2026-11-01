import Image from 'next/image'
import Link from '@/components/Link'
import Breadcrumbs from '@/components/Breadcrumbs'
import ScholarPopover, { ScholarPopoverGroup } from '@/components/ScholarPopover'
import ResearchExperienceMetadata from '@/components/ResearchExperienceMetadata'
import { researchExperiences } from '@/data/researchData'
import fj from '@/data/fjData'
import colleaguesData from '@/data/colleaguesData'
import { Paragraphs, ResearchSection } from '@/components/FjArticleContent'
import styles from './TrogenArticle.module.css'
import articleStyles from './Cxcl13Article.module.css'
import projectStyles from './TrogenProject.module.css'

const contentWidth = 'mx-auto max-w-4xl px-4 sm:px-6'
const experience = researchExperiences.find((item) => item.id === 'f-johnsoniae')!

export default function FjProject() {
  return (
    <article className={`${projectStyles.page} break-words`} aria-labelledby="fj-title">
      <div className="interaction-dark bg-black text-gray-300">
        <div className="relative">
          <div className="relative">
            <Image
              src={fj.photo.src}
              alt={fj.photo.alt}
              width={fj.photo.width}
              height={fj.photo.height}
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
                id="fj-title"
                className={`${projectStyles.title} font-bold tracking-tight text-white`}
              >
                {fj.titlePrefix} <i>{fj.species}</i>
              </h1>
            </div>
          </div>
        </div>

        <div className={contentWidth}>
          <Breadcrumbs
            items={[
              { label: 'Research', href: '/research' },
              { label: fj.title, italicText: fj.species },
            ]}
            placement="after-cover"
            tone="inverse"
          />
        </div>
        <section
          aria-labelledby="fj-title"
          className={`${contentWidth} pt-6 pb-12 sm:pt-8 sm:pb-16`}
        >
          <p className="mt-5 text-base leading-8 sm:text-lg">{fj.summary}</p>

          <ScholarPopoverGroup>
            <ResearchExperienceMetadata
              experience={experience}
              role={fj.role}
              className="mt-7 space-y-2 text-sm leading-6 sm:text-base sm:leading-7"
            >
              <p id="colleagues">
                Colleagues: <ScholarPopover scholar={colleaguesData['shuning-dong']} />
                {' and '}
                <ScholarPopover scholar={colleaguesData['shulei-he']} />
              </p>
              <p>{fj.participationPeriod}</p>
            </ResearchExperienceMetadata>
          </ScholarPopoverGroup>
        </section>
      </div>

      <div className="bg-white text-gray-700">
        <div className={`${styles.article} ${articleStyles.article} px-4 sm:px-6`}>
          <nav
            id="page-outline"
            className={`${styles.reading} ${articleStyles.outline}`}
            aria-labelledby="project-overview"
          >
            <div className={styles.prose}>
              <h2 id="project-overview">Project overview</h2>
            </div>
            <ul className={articleStyles.outlineTree}>
              <li>
                <Link className={articleStyles.outlineLink} href={`#${fj.overview.id}`}>
                  {fj.overview.title}
                </Link>
              </li>
              <li>
                <Link className={articleStyles.outlineLink} href={`#${fj.researchAreas[0].id}`}>
                  Research areas
                </Link>
                <ul>
                  {fj.researchAreas.map((area) => (
                    <li key={area.id}>
                      <Link className={articleStyles.outlineLink} href={`#${area.id}`}>
                        {area.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>

          <section aria-labelledby={fj.overview.id}>
            <div className={`${styles.reading} ${styles.prose}`}>
              <h2 id={fj.overview.id}>{fj.overview.title}</h2>
            </div>
            <Paragraphs paragraphs={fj.overview.paragraphs} figures={fj.overview.figures} />
          </section>

          {fj.researchAreas.map((area) => (
            <section key={area.id} className={articleStyles.project} aria-labelledby={area.id}>
              <div className={`${styles.reading} ${styles.prose}`}>
                <h2 id={area.id}>{area.title}</h2>
              </div>
              {area.sections.map((section) => (
                <ResearchSection key={section.id} section={section} />
              ))}
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
