import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'

const ignoredElements = new Set(['script', 'style', 'noscript', 'nav', 'button', 'svg'])

function isHidden(node) {
  const props = node.properties || {}
  return (
    ignoredElements.has(node.tagName) ||
    props.hidden ||
    props.ariaHidden === true ||
    props.ariaHidden === 'true' ||
    props.className?.includes('sr-only')
  )
}

function textContent(node) {
  if (node.type === 'text') return node.value
  if (isHidden(node)) return ''
  return (node.children || []).map(textContent).join(' ')
}

function findAll(node, predicate) {
  const found = predicate(node) ? [node] : []
  if (!isHidden(node)) {
    for (const child of node.children || []) found.push(...findAll(child, predicate))
  }
  return found
}

const cleanText = (text) => text.replace(/\s+/g, ' ').trim()

function getSection(url) {
  if (url.startsWith('/application')) return 'Application'
  if (url.startsWith('/research')) return 'Research'
  if (url.startsWith('/blog') || url.startsWith('/tags')) return 'Blog'
  if (url.startsWith('/about-dean-jie-zhong') || url.startsWith('/lego-archive')) return 'About'
  return 'Website'
}

export function extractSearchDocument(html, url) {
  const tree = fromHtmlIsomorphic(html)
  const main = findAll(tree, (node) => node.tagName === 'main')[0]
  if (!main) return null

  const heading = findAll(main, (node) => node.tagName === 'h1')[0]
  const pageTitle = findAll(tree, (node) => node.tagName === 'title')[0]
  const description = findAll(
    tree,
    (node) => node.tagName === 'meta' && node.properties?.name === 'description'
  )[0]?.properties?.content
  const title = cleanText(
    heading ? textContent(heading) : textContent(pageTitle || {}).split(' | ')[0]
  )
  if (!title) return null

  return {
    url,
    title,
    section: getSection(url),
    description: cleanText(String(description || '')),
    headings: findAll(main, (node) => /^h[2-4]$/.test(node.tagName || ''))
      .map((node) => cleanText(textContent(node)))
      .join(' · '),
    content: cleanText(textContent(main)),
  }
}

export function routeFromFile(file) {
  const url = `/${file.replace(/\\/g, '/').replace(/(?:^|\/)index\.html$|\.html$/g, '')}`.replace(
    /\/+$/,
    ''
  )
  // Pagination repeats pages already indexed; exported assets aren't site routes.
  if (/^\/(?:_|404(?:\/|$)|500(?:\/|$)|api(?:\/|$)|static(?:\/|$))/.test(url)) return null
  if (/\/page\/\d+$/.test(url)) return null
  return url ? `${url}/` : '/'
}

async function htmlFiles(folder, prefix = '') {
  const files = []
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    if (entry.name.startsWith('_') || ['static', 'api'].includes(entry.name)) continue
    const relative = path.join(prefix, entry.name)
    if (entry.isDirectory())
      files.push(...(await htmlFiles(path.join(folder, entry.name), relative)))
    else if (entry.name.endsWith('.html')) files.push(relative)
  }
  return files
}

export async function generateSearchIndex() {
  const source = process.env.EXPORT ? 'out' : '.next/server/app'
  const { allBlogs } = await import('../.contentlayer/generated/index.mjs')
  const drafts = new Set(allBlogs.filter((post) => post.draft).map((post) => `/${post.path}/`))
  const documents = []
  for (const file of (await htmlFiles(source)).sort()) {
    const url = routeFromFile(file)
    if (!url || drafts.has(url)) continue
    const document = extractSearchDocument(await readFile(path.join(source, file), 'utf8'), url)
    if (document) documents.push(document)
  }
  if (!documents.some((document) => document.url === '/application/ielts-transcript/')) {
    throw new Error('The site search index is incomplete: application pages were not generated.')
  }
  const json = JSON.stringify(documents)
  // Keep local development and the static deployment on the same generated index.
  await writeFile('public/search.json', json)
  if (process.env.EXPORT) await writeFile('out/search.json', json)
  console.log(`Site search index generated: ${documents.length} pages.`)
}
