import Breadcrumbs from '@/components/Breadcrumbs'
import Link from '@/components/Link'
import { Paragraphs } from '@/components/FjArticleContent'
import fj from '@/data/fjData'
import { fjProjectPath } from '@/data/fjToolsData'
import type { FjTool } from '@/data/fjToolsData'
import styles from './TrogenArticle.module.css'
import articleStyles from './Cxcl13Article.module.css'

export default function FjToolArticle({ tool }: { tool: FjTool }) {
  return (
    <article className={`${styles.article} ${articleStyles.article} px-4 sm:px-6`}>
      <header className={styles.reading}>
        <Breadcrumbs
          items={[
            { label: 'Research', href: '/research' },
            { label: fj.title, italicText: fj.species, href: fjProjectPath },
            { label: tool.title },
          ]}
        />
        <h1 className={styles.title}>{tool.title}</h1>
        <p className={styles.subtitle}>{tool.summary}</p>
      </header>
      {tool.sections.map((section) => (
        <section key={section.id} className={styles.section} aria-labelledby={section.id}>
          <div className={`${styles.reading} ${styles.prose}`}>
            <h2 id={section.id}>{section.title}</h2>
          </div>
          <Paragraphs paragraphs={section.paragraphs} figures={section.figures} />
        </section>
      ))}
      <nav className={`${styles.reading} ${styles.returnNav}`} aria-label="Project navigation">
        <Link href={`${fjProjectPath}/#microscopy-tools`}>Back to the F. johnsoniae project</Link>
      </nav>
    </article>
  )
}
