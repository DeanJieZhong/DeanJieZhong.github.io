import BlogPage from '../../page'
import { allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { genPageMetadata } from 'app/seo'

// Preserve existing pagination URLs as entry points to the scrolling Blog list.
const LEGACY_POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({
  title: 'Blog',
  alternates: { canonical: '/blog/' },
})

export const generateStaticParams = async () => {
  const totalPages = Math.ceil(allCoreContent(allBlogs).length / LEGACY_POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))

  return paths
}

export default async function Page(props: { params: Promise<{ page: string }> }) {
  const params = await props.params
  const pageNumber = Number(params.page)
  const totalPages = Math.ceil(allCoreContent(allBlogs).length / LEGACY_POSTS_PER_PAGE)

  // Return 404 for invalid page numbers or empty pages
  if (!Number.isInteger(pageNumber) || pageNumber <= 0 || pageNumber > totalPages) {
    return notFound()
  }
  return <BlogPage />
}
