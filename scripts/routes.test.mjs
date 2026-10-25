import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFile, access } from 'node:fs/promises'
import path from 'node:path'
import { runInNewContext } from 'node:vm'
import { build } from 'esbuild'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'
import { redirectHtml } from './route-redirects.mjs'
import { extractSearchDocument } from './search-index.mjs'

const compiled = await build({
  stdin: {
    contents: "export * from './lib/pageTitleSlug'",
    resolveDir: process.cwd(),
  },
  bundle: true,
  write: false,
  format: 'esm',
  platform: 'node',
})
const { pageTitleSlug } = await import(
  `data:text/javascript;base64,${Buffer.from(compiled.outputFiles[0].text).toString('base64')}`
)
const redirects = JSON.parse(await readFile('data/routeRedirects.json', 'utf8'))
const pages = JSON.parse(await readFile('out/search.json', 'utf8'))

test('normalizes full English titles, punctuation, scientific notation and mixed scripts', () => {
  assert.equal(pageTitleSlug('IELTS Transcript'), 'ielts-transcript')
  assert.equal(pageTitleSlug('About Dean Jie Zhong 钟杰'), 'about-dean-jie-zhong')
  assert.equal(
    pageTitleSlug('CXCL13–Fc and CXCR5-Engineered CD8⁺ T Cells'),
    'cxcl13-fc-and-cxcr5-engineered-cd8-t-cells'
  )
  assert.equal(
    pageTitleSlug('Clustering Says I Give Off a #1D2D8E Vibe'),
    'clustering-says-i-give-off-a-1d2d8e-vibe'
  )
})

test('every indexed page uses its full English title, with the homepage at the root', () => {
  for (const page of pages) {
    if (page.url === '/') continue
    const segment = page.url.split('/').filter(Boolean).pop()
    assert.equal(segment, pageTitleSlug(page.title), `${page.title}: ${page.url}`)
  }
  assert.equal(new Set(pages.map((page) => page.url)).size, pages.length)
})

test('old links resolve directly to exported canonical pages and preserve queries and fragments', async () => {
  const canonical = new Set(pages.map((page) => page.url))
  for (const [source, destination] of Object.entries(redirects)) {
    const pathname = new URL(destination, 'https://example.com').pathname
    assert.ok(!canonical.has(source), `Legacy URL is still indexed: ${source}`)
    assert.ok(canonical.has(pathname), `Missing destination: ${destination}`)
    assert.ok(!redirects[pathname], `Redirect chain: ${source}`)
    await access(path.join('out', pathname, 'index.html'))
    const html = await readFile(path.join('out', source, 'index.html'), 'utf8')
    assert.equal(html, redirectHtml(destination))
    assert.equal(extractSearchDocument(html, source), null)
    assert.match(html, /noindex, follow/)
    let redirected
    runInNewContext(html.match(/<script>(.*?)<\/script>/s)[1], {
      window: {
        location: {
          search: '?find=IE&filter=a%20b',
          hash: '#band-scores',
          replace: (url) => {
            redirected = url
          },
        },
      },
    })
    assert.equal(redirected, `${pathname}?find=IE&filter=a%20b#band-scores`)
  }
})

test('changelog redirects keep queries and use the original fragment or the changelog section', () => {
  const html = redirectHtml('/about-this-site/#changelog')
  for (const [search, hash, expected] of [
    ['', '', '/about-this-site/#changelog'],
    ['?from=footer', '', '/about-this-site/?from=footer#changelog'],
    ['', '#update-521eebf', '/about-this-site/#update-521eebf'],
  ]) {
    let redirected
    runInNewContext(html.match(/<script>(.*?)<\/script>/s)[1], {
      window: { location: { search, hash, replace: (url) => (redirected = url) } },
    })
    assert.equal(redirected, expected)
  }
  assert.match(html, /<link rel="canonical" href="\/about-this-site\/">/)
  assert.match(
    html,
    /<noscript><meta http-equiv="refresh" content="0; url=\/about-this-site\/#changelog">/
  )
})

function links(node) {
  return [
    ...(node.tagName === 'a' && node.properties?.href ? [node.properties.href] : []),
    ...(node.children || []).flatMap(links),
  ]
}

test('rendered internal links point directly to existing pages or assets', async () => {
  const checked = new Set()
  const failures = []
  for (const page of pages) {
    const html = await readFile(path.join('out', page.url, 'index.html'), 'utf8')
    for (const href of links(fromHtmlIsomorphic(html))) {
      if (!href.startsWith('/') || href.startsWith('//')) continue
      const pathname = new URL(href, 'https://example.com').pathname
      const normalized = `${pathname.replace(/\/$/, '')}/`
      if (redirects[normalized]) failures.push(`${page.url} links to old URL ${href}`)
      if (checked.has(pathname)) continue
      checked.add(pathname)
      const target = decodeURIComponent(pathname)
      try {
        await access(path.join('out', target.endsWith('/') ? `${target}index.html` : target))
      } catch {
        try {
          await access(path.join('out', target, 'index.html'))
        } catch {
          failures.push(`${page.url} links to missing URL ${href}`)
        }
      }
    }
  }
  assert.deepEqual(failures, [])
})
