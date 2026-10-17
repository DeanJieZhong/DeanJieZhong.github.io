import type { ReactNode } from 'react'
import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent } from 'pliny/utils/contentlayer'
import AuthorLayout from '@/layouts/AuthorLayout'
import Image from '@/components/Image'
import Link from '@/components/Link'
import aboutData, { type AboutPhoto } from '@/data/aboutData'
import researchData from '@/data/researchData'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'
import styles from '@/layouts/AuthorLayout.module.css'

export const metadata = genPageMetadata({ title: 'About' })

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={styles.section}>
      <h3 id={`${id}-heading`}>{title}</h3>
      <div className={styles.body}>{children}</div>
    </section>
  )
}

function Entries({ children, empty }: { children: ReactNode; empty: boolean }) {
  return empty ? <p>Details coming soon.</p> : <ul className={styles.entries}>{children}</ul>
}

function Entry({
  title,
  subtitle,
  period,
  children,
}: {
  title: string
  subtitle?: string
  period?: string
  children?: ReactNode
}) {
  return (
    <li className={styles.entry}>
      <header>
        <h4>{title}</h4>
        {subtitle && <p>{subtitle}</p>}
        {period && <p className={styles.period}>{period}</p>}
      </header>
      {children}
    </li>
  )
}

function Details({ items }: { items?: string[] }) {
  if (!items?.length) return null
  return (
    <ul className={styles.details}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function Photos({ photos }: { photos?: AboutPhoto[] }) {
  if (!photos?.length) return null
  return (
    <div className={styles.photos}>
      {photos.map(({ caption, alt, ...photo }) => (
        <figure key={photo.src}>
          <Image
            {...photo}
            alt={alt}
            sizes="(min-width: 1280px) 320px, (min-width: 640px) 220px, 100vw"
          />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      ))}
    </div>
  )
}

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const { research, education, languages, teaching, sports, lego } = aboutData

  return (
    <AuthorLayout
      content={coreContent(author)}
      portrait={aboutData.portrait}
      introduction={<MDXLayoutRenderer code={author.body.code} />}
    >
      <section aria-labelledby="academic-profile-heading" className={styles.group}>
        <h2 id="academic-profile-heading">01 Academic Profile</h2>
        <Section id="research-experience" title="1.1 Research">
          <Entries empty={research.length === 0}>
            {research.map((entry) => {
              const project = researchData.find(
                (project) => project.id === entry.projectId && project.hasDetailPage
              )
              return (
                <Entry
                  key={entry.id}
                  title={entry.institution}
                  subtitle={entry.role}
                  period={entry.period}
                >
                  {entry.researchQuestion && <p>{entry.researchQuestion}</p>}
                  {entry.contribution && <p>{entry.contribution}</p>}
                  <Details items={entry.outcomes} />
                  {project && (
                    <p>
                      <Link href={`/research/${project.id}`}>{project.name} — Project details</Link>
                    </p>
                  )}
                </Entry>
              )
            })}
          </Entries>
          <p>
            <Link href="/research">View research</Link>
          </p>
        </Section>

        <Section id="education" title="1.2 Education">
          <Entries empty={education.length === 0}>
            {education.map((entry) => (
              <Entry
                key={entry.id}
                title={entry.school}
                subtitle={[entry.degree, entry.major].filter(Boolean).join(' · ')}
                period={entry.period}
              >
                {entry.grades && <p>{entry.grades}</p>}
                {entry.ranking && <p>{entry.ranking}</p>}
                {entry.courses?.length ? <p>Relevant courses: {entry.courses.join(', ')}</p> : null}
                <Details items={entry.honors} />
                <Details items={entry.scholarships} />
                <Details items={entry.additionalLearning} />
              </Entry>
            ))}
          </Entries>
        </Section>

        <Section id="languages" title="1.3 Languages">
          <Entries empty={languages.length === 0}>
            {languages.map((entry) => (
              <Entry key={entry.id} title={entry.name} subtitle={entry.proficiency}>
                <Details items={entry.contexts} />
                <Details items={entry.examResults} />
              </Entry>
            ))}
          </Entries>
        </Section>

        <Section id="teaching" title="1.4 Teaching & Tutoring">
          <Entries empty={teaching.length === 0}>
            {teaching.map((entry) => (
              <Entry
                key={entry.id}
                title={entry.subject}
                subtitle={entry.students}
                period={entry.period}
              >
                <Details items={entry.responsibilities} />
                <Details items={entry.methods} />
                <Details items={entry.outcomes} />
              </Entry>
            ))}
          </Entries>
        </Section>
      </section>

      <section aria-labelledby="beyond-academia-heading" className={styles.group}>
        <h2 id="beyond-academia-heading">02 Beyond Academia</h2>
        <Section id="sports" title="2.1 Sports">
          <Entries empty={sports.length === 0}>
            {sports.map((entry) => (
              <Entry key={entry.id} title={entry.sport}>
                {entry.experience && <p>{entry.experience}</p>}
                <Details items={entry.goals} />
                <Details items={entry.achievements} />
                <Photos photos={entry.photos} />
              </Entry>
            ))}
          </Entries>
        </Section>

        <Section id="lego" title="2.2 Lego">
          {lego.introduction && <p>{lego.introduction}</p>}
          {lego.featuredWorks.length > 0 || !lego.introduction ? (
            <Entries empty={lego.featuredWorks.length === 0}>
              {lego.featuredWorks.map((work) => (
                <Entry key={work.id} title={work.title}>
                  {work.description && <p>{work.description}</p>}
                  <Photos photos={work.photos} />
                </Entry>
              ))}
            </Entries>
          ) : null}
          <p>
            <Link href="/lego">Explore the Lego Archive</Link>
          </p>
        </Section>
      </section>

      <section id="contact" aria-labelledby="contact-heading" className={styles.group}>
        <h2 id="contact-heading">Contact</h2>
        <address className={`${styles.body} ${styles.contact}`}>
          <dl>
            <div>
              <dt>Phone</dt>
              <dd>
                <a href={`tel:${siteMetadata.phone.replace(/\s/g, '')}`}>{siteMetadata.phone}</a>
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${siteMetadata.email}`}>{siteMetadata.email}</a>
              </dd>
            </div>
            <div>
              <dt>WeChat</dt>
              <dd className="select-all">{siteMetadata.wechat}</dd>
            </div>
            {author.github && (
              <div>
                <dt>GitHub</dt>
                <dd>
                  <Link href={author.github}>
                    {author.github.replace('https://github.com/', '')}
                  </Link>
                </dd>
              </div>
            )}
            {siteMetadata.instagram && (
              <div>
                <dt>Instagram</dt>
                <dd>
                  <Link href={siteMetadata.instagram}>
                    @{new URL(siteMetadata.instagram).pathname.split('/')[1]}
                  </Link>
                </dd>
              </div>
            )}
          </dl>
        </address>
      </section>
    </AuthorLayout>
  )
}
