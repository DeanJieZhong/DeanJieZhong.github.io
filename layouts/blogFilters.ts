import type { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'

export type BlogListPost = Pick<
  CoreContent<Blog>,
  'date' | 'location' | 'path' | 'slug' | 'title' | 'summary' | 'images' | 'tags'
>

// Keep category labels and tag aliases together. Only map specific tags whose
// article content supports the category; generic guide/code/images tags stay in All.
export const blogCategories = [
  { value: 'all', label: 'All', tags: [] },
  { value: 'research', label: 'Research', tags: ['research', 'math', 'ols'] },
  { value: 'reflection', label: 'Reflection', tags: ['reflection'] },
  { value: 'travel', label: 'Travel', tags: ['travel', 'holiday', 'canada'] },
  { value: 'side-quests', label: 'Side quests', tags: ['side-quests'] },
] as const

export type BlogCategory = (typeof blogCategories)[number]['value']

export function getBlogCategory(value: string | null): BlogCategory {
  return blogCategories.find((category) => category.value === value)?.value ?? 'all'
}

export function filterBlogPosts(posts: BlogListPost[], category: BlogCategory) {
  if (category === 'all') return posts

  const tags: readonly string[] = blogCategories.find((item) => item.value === category)!.tags
  // Filter the complete collection before batching, preserving the server's date order.
  return posts.filter((post) =>
    (post.tags ?? []).some((tag) =>
      tags.includes(
        tag
          .trim()
          .toLowerCase()
          .replace(/[\s_]+/g, '-')
      )
    )
  )
}
