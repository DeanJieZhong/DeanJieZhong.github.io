import { ReactNode } from 'react'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from '@/components/Link'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

interface LayoutProps {
  content: CoreContent<Blog>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

export default function PostLayout({ content, next, prev, children }: LayoutProps) {
  const { slug, date, title, subtitle, location } = content

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div>
          <header className="pt-8 sm:pt-12">
            <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: title }]} />
            <div className="space-y-1 border-b border-gray-200 pb-10 text-center dark:border-gray-700">
              <dl>
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                    {location && <p className="mt-1 text-sm whitespace-pre-line">{location}</p>}
                  </dd>
                </div>
              </dl>
              <div>
                <h1 className="text-2xl leading-[1.8rem] font-extrabold tracking-tight text-gray-900 sm:text-[1.8rem] sm:leading-8 md:text-[2.4rem] md:leading-[2.8rem] dark:text-gray-100">
                  {title}
                </h1>
                {subtitle && (
                  <p className="mx-auto max-w-2xl pt-3 text-base leading-7 text-gray-600 dark:text-gray-400">
                    {subtitle}
                  </p>
                )}
                <p className="pt-4 text-sm leading-6 text-gray-600 dark:text-gray-400">
                  By{' '}
                  <Link
                    href="/about"
                    rel="author"
                    className="rounded-sm underline decoration-gray-300 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
                  >
                    {siteMetadata.author}
                  </Link>
                </p>
              </div>
            </div>
          </header>
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 xl:divide-y-0 dark:divide-gray-700">
            <div className="divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0 dark:divide-gray-700">
              <div className="prose dark:prose-invert max-w-none pt-10 pb-8">{children}</div>
            </div>
            {siteMetadata.comments && (
              <div className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300" id="comment">
                <Comments slug={slug} />
              </div>
            )}
            <footer>
              <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                {prev && prev.path && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/${prev.path}`}
                      className="text-primary-500"
                      aria-label={`Previous post: ${prev.title}`}
                    >
                      &larr; {prev.title}
                    </Link>
                  </div>
                )}
                {next && next.path && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/${next.path}`}
                      className="text-primary-500"
                      aria-label={`Next post: ${next.title}`}
                    >
                      {next.title} &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
