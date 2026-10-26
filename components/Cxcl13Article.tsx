import { Fragment } from 'react'
import Image from 'next/image'
import Link from '@/components/Link'
import cxcl13 from '@/data/cxcl13Data'
import type { Cxcl13Block, Cxcl13Section } from '@/data/cxcl13Data'
import styles from './TrogenArticle.module.css'
import articleStyles from './Cxcl13Article.module.css'

const articleOutline: {
  id: string
  title: string
  children?: { id: string; title: string }[]
}[] = [
  cxcl13.overview,
  {
    id: cxcl13.projects[0].id,
    title: 'Research areas',
    children: cxcl13.projects,
  },
  cxcl13.development,
  cxcl13.references,
]

function ArticleText({ text }: { text: string }) {
  return text.split(/(\[[^\]]+\]\(https?:\/\/[^)]+\)|\*[^*]+\*)/g).map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/)
    if (link)
      return (
        <Link key={index} href={link[2]} className={articleStyles.citation}>
          {link[1]}
        </Link>
      )
    if (part.startsWith('*') && part.endsWith('*')) return <em key={index}>{part.slice(1, -1)}</em>
    return <Fragment key={index}>{part}</Fragment>
  })
}

function ArticleBlocks({ blocks }: { blocks: Cxcl13Block[] }) {
  return blocks.map((block, index) => {
    if (block.type === 'figure') {
      return (
        <figure key={block.src} className={articleStyles.figure}>
          <Link
            href={block.src}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open full-size figure: ${block.alt}`}
            className={articleStyles.figureLink}
          >
            <Image
              src={block.src}
              alt={block.alt}
              width={block.width}
              height={block.height}
              sizes="(min-width: 960px) 896px, 100vw"
              unoptimized
              className={styles.figureImage}
            />
          </Link>
          <figcaption className={`${styles.reading} ${styles.caption}`}>
            <ArticleText text={block.caption} />
          </figcaption>
        </figure>
      )
    }

    return (
      <div key={index} className={`${styles.reading} ${styles.prose} ${articleStyles.textBlock}`}>
        {block.type === 'list' ? (
          <ul className={articleStyles.contributions}>
            {block.items.map((item) => (
              <li key={item}>
                <ArticleText text={item} />
              </li>
            ))}
          </ul>
        ) : (
          <p>
            <ArticleText text={block.text} />
          </p>
        )}
      </div>
    )
  })
}

function ArticleSection({ section }: { section: Cxcl13Section }) {
  return (
    <section className={articleStyles.subsection} aria-labelledby={section.id}>
      <div className={`${styles.reading} ${styles.prose}`}>
        <h3 id={section.id}>{section.title}</h3>
      </div>
      <ArticleBlocks blocks={section.blocks} />
    </section>
  )
}

export default function Cxcl13Article() {
  return (
    <div className="bg-white text-gray-700">
      <div className={`${styles.article} ${articleStyles.article} px-4 sm:px-6`}>
        <nav
          className={`${styles.reading} ${articleStyles.outline}`}
          aria-labelledby="project-overview"
        >
          <div className={styles.prose}>
            <h2 id="project-overview">Project overview</h2>
          </div>
          <ul className={articleStyles.outlineTree}>
            {articleOutline.map((section) => (
              <li key={section.id}>
                <Link className={articleStyles.outlineLink} href={`#${section.id}`}>
                  {section.title}
                </Link>
                {section.children && (
                  <ul>
                    {section.children.map((child) => (
                      <li key={child.id}>
                        <Link className={articleStyles.outlineLink} href={`#${child.id}`}>
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <section aria-labelledby={cxcl13.overview.id}>
          <div className={`${styles.reading} ${styles.prose}`}>
            <h2 id={cxcl13.overview.id}>{cxcl13.overview.title}</h2>
          </div>
          <ArticleBlocks blocks={cxcl13.overview.blocks} />
        </section>

        {cxcl13.projects.map((project) => (
          <section key={project.id} className={articleStyles.project} aria-labelledby={project.id}>
            <div className={`${styles.reading} ${styles.prose}`}>
              <h2 id={project.id}>{project.title}</h2>
            </div>
            {project.sections.map((section) => (
              <ArticleSection key={section.id} section={section} />
            ))}
          </section>
        ))}

        <section className={articleStyles.project} aria-labelledby={cxcl13.development.id}>
          <div className={`${styles.reading} ${styles.prose}`}>
            <h2 id={cxcl13.development.id}>{cxcl13.development.title}</h2>
          </div>
          <ArticleBlocks blocks={cxcl13.development.blocks} />
        </section>

        <section className={articleStyles.project} aria-labelledby={cxcl13.references.id}>
          <div className={`${styles.reading} ${styles.prose}`}>
            <h2 id={cxcl13.references.id}>{cxcl13.references.title}</h2>
            <ul className={articleStyles.references}>
              {cxcl13.references.entries.map((reference) => (
                <li key={reference}>
                  <ArticleText text={reference} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
