import type { ReactNode } from 'react'
import Breadcrumbs from '@/components/Breadcrumbs'
import styles from './MaterialsLayout.module.css'

export default function MaterialsLayout({
  title,
  isOverview = false,
  children,
}: {
  title: string
  isOverview?: boolean
  children: ReactNode
}) {
  return (
    <article className="mx-auto max-w-3xl pb-4">
      <header className={styles.banner}>
        <Breadcrumbs
          items={
            isOverview
              ? [{ label: title }]
              : [{ label: 'Materials', href: '/materials' }, { label: title }]
          }
          tone="inverse"
        />
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      </header>
      <div className="prose dark:prose-invert mt-8 max-w-none break-words text-gray-700 dark:text-gray-300">
        {children}
      </div>
    </article>
  )
}
