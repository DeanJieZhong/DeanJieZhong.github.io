import { Fragment } from 'react'
import Image from 'next/image'
import Link from '@/components/Link'
import type { FjSection } from '@/data/fjData'
import fjFigures from '@/data/fjFigures'
import type { FjFigure } from '@/data/fjFigures'
import styles from './TrogenArticle.module.css'
import articleStyles from './Cxcl13Article.module.css'
import researchStyles from './TrogenResearchLines.module.css'
import fjStyles from './FjArticleContent.module.css'

export function ProjectText({ text }: { text: string }) {
  return text
    .split(/(\[[^\]]+\]\((?:https:\/\/|\/)[^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g)
    .map((part, index) => {
      const link = part.match(/^\[([^\]]+)\]\(((?:https:\/\/|\/)[^)]+)\)$/)
      if (link)
        return (
          <Link
            key={index}
            href={link[2]}
            className={link[2].startsWith('https://') ? articleStyles.citation : undefined}
          >
            {link[1]}
          </Link>
        )
      if (part.startsWith('**') && part.endsWith('**'))
        return <strong key={index}>{part.slice(2, -2)}</strong>
      if (part.startsWith('*') && part.endsWith('*'))
        return <em key={index}>{part.slice(1, -1)}</em>
      return <Fragment key={index}>{part}</Fragment>
    })
}

function FigurePanel({ image, single }: { image: FjFigure['images'][number]; single: boolean }) {
  return (
    <div className={styles.panel}>
      {image.label && <p className={styles.panelLabel}>{image.label}</p>}
      <Link
        href={image.src}
        target="_blank"
        rel="noopener noreferrer"
        className={articleStyles.figureLink}
        aria-label={`Open full-size figure: ${image.alt}`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={single ? '(max-width: 768px) 92vw, 704px' : '(max-width: 600px) 92vw, 424px'}
          unoptimized
          className={styles.figureImage}
        />
      </Link>
    </div>
  )
}

export function ProjectFigure({ figure }: { figure: FjFigure }) {
  const layouts = {
    pair: styles.pair,
    comparison: styles.comparison,
    single: fjStyles.single,
    'channel-grid': fjStyles.channelGrid,
  }
  return (
    <figure
      id={figure.id}
      className={`${styles.figure} ${figure.layout === 'channel-grid' ? fjStyles.wideFigure : ''}`}
      aria-labelledby={`${figure.id}-caption`}
    >
      {figure.video ? (
        <video
          className={fjStyles.video}
          controls
          muted
          playsInline
          preload="metadata"
          poster={figure.video.poster}
          width={figure.video.width}
          height={figure.video.height}
          aria-label="Schematic animation of SprB movement along pink dotted helical tracks"
          aria-describedby={`${figure.id}-caption`}
        >
          <source src={figure.video.src} type="video/mp4" />
          Your browser does not support this video. Pink dotted paths represent helical tracks, and
          turquoise spheres represent SprB moving along them.
        </video>
      ) : (
        <div className={layouts[figure.layout]}>
          {figure.images.map((image, index) => (
            <Fragment key={image.src}>
              {figure.rowLabels && index % 3 === 0 && (
                <p className={fjStyles.rowLabel}>{figure.rowLabels[index / 3]}</p>
              )}
              <FigurePanel image={image} single={figure.layout === 'single'} />
            </Fragment>
          ))}
        </div>
      )}
      <figcaption id={`${figure.id}-caption`} className={`${styles.reading} ${styles.caption}`}>
        <strong>{figure.captionTitle}</strong> <ProjectText text={figure.caption} />
      </figcaption>
    </figure>
  )
}

export function Paragraphs({
  paragraphs,
  figures = [],
}: Pick<FjSection, 'paragraphs' | 'figures'>) {
  return paragraphs.map((paragraph, index) => (
    <Fragment key={index}>
      <div className={`${styles.reading} ${styles.prose} ${articleStyles.textBlock}`}>
        <p>
          <ProjectText text={paragraph} />
        </p>
      </div>
      {figures
        .filter((figure) => figure.afterParagraph === index)
        .map((figure) => (
          <ProjectFigure key={figure.id} figure={fjFigures[figure.id]} />
        ))}
    </Fragment>
  ))
}

export function ResearchSection({ section }: { section: FjSection }) {
  return (
    <section className={researchStyles.subsection} aria-labelledby={section.id}>
      <div className={`${styles.reading} ${styles.prose}`}>
        <h3 id={section.id} className={researchStyles.subsectionHeading}>
          {section.href ? <Link href={section.href}>{section.title} →</Link> : section.title}
        </h3>
      </div>
      <Paragraphs paragraphs={section.paragraphs} figures={section.figures} />
    </section>
  )
}
