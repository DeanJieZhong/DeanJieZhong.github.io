import type { ReactNode } from 'react'
import Link from '@/components/Link'

export default function ApplicationMaterialLayout({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <article className="mx-auto max-w-3xl pt-10 pb-4 sm:pt-14">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-600">
        <ol className="flex items-center gap-3">
          <li>
            <Link href="/application" className="underline-offset-4 hover:underline">
              Application
            </Link>
          </li>
          <li className="flex items-center gap-3">
            <span aria-hidden="true">/</span>
            <span aria-current="page">{title}</span>
          </li>
        </ol>
      </nav>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      <div className="prose dark:prose-invert mt-8 max-w-none break-words text-gray-700 dark:text-gray-300">
        {children}
      </div>
    </article>
  )
}
