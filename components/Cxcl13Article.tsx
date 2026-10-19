import Link from '@/components/Link'
import cxcl13 from '@/data/cxcl13Data'
import styles from './TrogenArticle.module.css'

function Paragraphs({ paragraphs }: { paragraphs: string[] }) {
  return paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
}

export default function Cxcl13Article() {
  return (
    <div className="bg-white text-gray-700">
      <div className={`${styles.article} px-4 sm:px-6`}>
        <nav className={`${styles.reading} ${styles.sectionNav}`} aria-label="On this page">
          <Link href="#research-question">Research question &amp; approach</Link>
          {cxcl13.sections.map((section) => (
            <Link key={section.id} href={`#${section.id}`}>
              {section.title}
            </Link>
          ))}
        </nav>
        <section
          className={`${styles.reading} ${styles.prose}`}
          aria-labelledby="research-question"
        >
          <h2 id="research-question">Research question &amp; approach</h2>
          <Paragraphs paragraphs={cxcl13.overview} />
        </section>
        {cxcl13.sections.map((section) => (
          <section
            key={section.id}
            className={`${styles.section} ${section.id === 'reflection' ? styles.reflection : ''}`}
            aria-labelledby={section.id}
          >
            <div className={`${styles.reading} ${styles.prose}`}>
              <h2 id={section.id}>{section.title}</h2>
              {section.paragraphs ? <Paragraphs paragraphs={section.paragraphs} /> : null}
              {section.items ? (
                <ul className={styles.contributions}>
                  {section.items.map((item) => (
                    <li key={item.title}>
                      <strong>{item.title}</strong> {item.body}
                    </li>
                  ))}
                </ul>
              ) : null}
              {section.paragraphsAfter ? (
                <div className="mt-5">
                  <Paragraphs paragraphs={section.paragraphsAfter} />
                </div>
              ) : null}
            </div>
            {section.subsections?.map((subsection) => (
              <section
                key={subsection.id}
                className={`${styles.reading} ${styles.prose} ${styles.subsection}`}
                aria-labelledby={subsection.id}
              >
                <h3 id={subsection.id}>{subsection.title}</h3>
                <Paragraphs paragraphs={subsection.paragraphs} />
              </section>
            ))}
          </section>
        ))}
      </div>
    </div>
  )
}
