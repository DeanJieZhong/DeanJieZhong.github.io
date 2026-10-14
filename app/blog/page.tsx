import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import ListLayout from '@/layouts/BlogListLayout'

export const metadata = genPageMetadata({ title: 'Blog' })

export default function BlogPage() {
  // Only send list fields to the client; article bodies and metadata stay on the server.
  const posts = allCoreContent(sortPosts(allBlogs)).map(
    ({ date, location, path, slug, title, summary, images, tags }) => ({
      date,
      location,
      path,
      slug,
      title,
      summary,
      images,
      tags,
    })
  )

  return <ListLayout posts={posts} title="All Posts" />
}
