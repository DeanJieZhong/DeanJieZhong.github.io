import type { ReactNode } from 'react'

export default function SiteInfoLayout({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <article className="mx-auto max-w-3xl pt-10 pb-4 sm:pt-14">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      <div className="prose dark:prose-invert mt-8 max-w-none break-words text-gray-700 dark:text-gray-300">
        {children}
      </div>
    </article>
  )
}
