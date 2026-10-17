import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import type { AboutPhoto } from '@/data/aboutData'
import Image from '@/components/Image'
import styles from './AuthorLayout.module.css'

interface Props {
  children: ReactNode
  introduction: ReactNode
  portrait?: Pick<AboutPhoto, 'src' | 'width' | 'height'>
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, introduction, portrait, content }: Props) {
  const { name, avatar, occupation, company } = content
  const photo = portrait ?? (avatar ? { src: avatar, width: 192, height: 192 } : undefined)

  return (
    <article className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroBand} aria-hidden="true" />
        <header className={styles.header}>
          <h1>About {name.replace(/[()]/g, '')}</h1>
        </header>
        {photo && (
          <div className={styles.portrait}>
            <Image
              src={photo.src}
              alt={`Portrait of ${name}`}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 1280px) 240px, (min-width: 768px) 192px, 240px"
              className={styles.avatar}
              priority
            />
          </div>
        )}
        <div className={styles.introCopy}>
          <div className={styles.identity}>
            {occupation && <p>{occupation}</p>}
            {company && <p>{company}</p>}
          </div>
          <div className={`${styles.body} ${styles.biography}`}>{introduction}</div>
        </div>
      </div>
      {children}
    </article>
  )
}
