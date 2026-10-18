import assert from 'node:assert/strict'
import { test } from 'node:test'
import { build } from 'esbuild'
import { extractSearchDocument, routeFromFile } from './search-index.mjs'

const compiled = await build({
  stdin: {
    contents:
      "export * from './components/search/search'; export * from './components/search/matching'",
    resolveDir: process.cwd(),
  },
  bundle: true,
  write: false,
  format: 'esm',
  platform: 'node',
})
const {
  prepareSearchDocuments,
  searchDocuments,
  searchSnippet,
  findWordMatches,
  groupSearchResults,
} = await import(
  `data:text/javascript;base64,${Buffer.from(compiled.outputFiles[0].text).toString('base64')}`
)

test('indexes readable page content, excluding navigation, controls, and serialized data', () => {
  const document = extractSearchDocument(
    `
    <html><head><title>IELTS | Dean Jie Zhong</title>
      <meta name="description" content="Academic English scores"></head>
    <body><header>Global navigation</header><main><nav>Breadcrumb links</nav>
      <h1>IELTS Transcript</h1><h2>Band scores</h2><p>Listening: <strong>8.0</strong></p>
      <p>Coherence and cohesion &amp; grammar</p><button>Copy details</button>
      <span aria-hidden="true">Decorative label</span><span class="sr-only">Hidden helper</span>
      <script>privateSerializedData</script></main><footer>Footer content</footer></body></html>
  `,
    '/application/ielts-transcript/'
  )
  assert.equal(document.title, 'IELTS Transcript')
  assert.equal(document.section, 'Application')
  assert.match(document.content, /Listening: 8.0/)
  assert.match(document.content, /cohesion & grammar/)
  assert.doesNotMatch(
    document.content,
    /navigation|Breadcrumb|Copy|Decorative|Hidden|private|Footer/
  )
})

test('normalizes exported routes and excludes duplicate pagination and error pages', () => {
  assert.equal(routeFromFile('index.html'), '/')
  assert.equal(
    routeFromFile('application/ielts-transcript/index.html'),
    '/application/ielts-transcript/'
  )
  assert.equal(
    routeFromFile(
      'research/trogen-a-commensal-bacterial-platform-for-intracellular-drug-delivery-in-tnbc.html'
    ),
    '/research/trogen-a-commensal-bacterial-platform-for-intracellular-drug-delivery-in-tnbc/'
  )
  for (const path of [
    '404.html',
    '_not-found.html',
    'blog/page/2/index.html',
    'static/demo.html',
  ]) {
    assert.equal(routeFromFile(path), null)
  }
})

const documents = prepareSearchDocuments([
  {
    url: '/blog/example/',
    title: 'A note about IELTS',
    section: 'Blog',
    description: '',
    headings: '',
    content: 'A note about IELTS and studying abroad.',
  },
  {
    url: '/application/ielts-transcript/',
    title: 'IELTS Transcript',
    section: 'Application',
    description: 'Academic English scores',
    headings: 'Band scores',
    content: 'IELTS Transcript. Listening 8.0. Coherence and cohesion 7. Suzhou.',
  },
  {
    url: '/research/trogen-a-commensal-bacterial-platform-for-intracellular-drug-delivery-in-tnbc/',
    title: 'TroGen',
    section: 'Research',
    description: 'Commensal bacterial platform',
    headings: 'Research decisions',
    content: 'Environmental sensing under hypoxia.',
  },
  {
    url: '/application/cv/',
    title: 'CV',
    section: 'Application',
    description: 'Curriculum vitae',
    headings: '',
    content: 'Academic profile.',
  },
  {
    url: '/application/academic-transcript/',
    title: 'Academic Transcript',
    section: 'Application',
    description: 'Academic records',
    headings: 'Weighted averages',
    content: 'Academic Transcript. Module marks.',
  },
])

test('finds body-only terms and ranks a matching page title ahead of incidental references', () => {
  assert.equal(searchDocuments(documents, 'IELTS')[0].url, '/application/ielts-transcript/')
  assert.equal(searchDocuments(documents, 'transcript')[0].url, '/application/academic-transcript/')
  assert.equal(searchDocuments(documents, 'coherence')[0].url, '/application/ielts-transcript/')
  assert.equal(
    searchDocuments(documents, 'hypoxia')[0].url,
    '/research/trogen-a-commensal-bacterial-platform-for-intracellular-drug-delivery-in-tnbc/'
  )
  assert.equal(searchDocuments(documents, 'ielts suzhou')[0].url, '/application/ielts-transcript/')
  assert.equal(searchDocuments(documents, 'IELTS hypoxia').length, 0)
})

test('handles aliases, diacritics, whitespace, and empty searches', () => {
  assert.equal(searchDocuments(documents, '  雅思  ')[0].url, '/application/ielts-transcript/')
  assert.equal(searchDocuments(documents, 'résumé')[0].url, '/application/cv/')
  assert.equal(searchDocuments(documents, '').length, 0)
  assert.equal(searchDocuments(documents, 'nonexistent-query').length, 0)
})

test('shows relevant context for a match deep in page text', () => {
  const document = {
    ...documents[2],
    content: `${'Background context. '.repeat(50)}Distinctive hypoxia result. More evidence.`,
  }
  const snippet = searchSnippet(document, 'hypoxia')
  assert.match(snippet, /Distinctive hypoxia result/)
  assert.ok(snippet.length <= 172)
})

test('only matches word beginnings, consistently in results, snippets, and highlights', () => {
  const jie = {
    url: '/about-dean-jie-zhong/jie/',
    title: 'Jie Zhong',
    section: 'About',
    description: 'Biography of Jie',
    headings: 'Experience',
    content: 'Jie studies biology.',
  }
  const entries = prepareSearchDocuments([...documents, jie])
  assert.deepEqual(
    searchDocuments(entries, 'IE').map((entry) => entry.url),
    ['/application/ielts-transcript/', '/blog/example/']
  )
  assert.equal(searchDocuments(entries, 'elts').length, 0)
  assert.equal(searchDocuments(entries, 'Jie')[0].url, '/about-dean-jie-zhong/jie/')
  const text = 'Jie: IELTS, pre-IELTS; biological biology.'
  assert.deepEqual(
    findWordMatches(text, 'ie').map(({ start, end }) => text.slice(start, end)),
    ['IE', 'IE']
  )
  const snippet = searchSnippet(
    { ...jie, content: `Jie. ${'Background. '.repeat(30)}IELTS scores here.` },
    'IE'
  )
  assert.match(snippet, /IELTS scores/)
  assert.doesNotMatch(snippet, /Jie/)
})

test('title tiers always outrank heading and body hits, regardless of frequency', () => {
  const entry = (url, title, headings, content) => ({
    url,
    title,
    headings,
    content,
    section: 'Blog',
    description: '',
  })
  const ranked = prepareSearchDocuments([
    entry('/body/', 'A body result', '', 'ielts academic '.repeat(200)),
    entry('/heading/', 'A heading result', 'IELTS Academic', 'ielts academic'),
    entry('/partial/', 'IELTS advice', '', 'academic'),
    entry('/all/', 'IELTS Academic advice', '', ''),
    entry('/exact/', 'IELTS Academic', '', ''),
  ])
  assert.deepEqual(
    searchDocuments(ranked, 'ielts academic').map((entry) => entry.url),
    ['/exact/', '/all/', '/partial/', '/heading/', '/body/']
  )
})

test('match offsets survive accents, decomposed characters, ligatures, and overlapping terms', () => {
  const text = 'A résumé and résumé; ﬁeld IELTS 雅思.'
  assert.deepEqual(
    findWordMatches(text, 'res fie ie ielts 雅思').map(({ start, end }) => text.slice(start, end)),
    ['rés', 'rés', 'ﬁe', 'IELTS', '雅思']
  )
  assert.equal(findWordMatches(text, '   ').length, 0)
  assert.equal(findWordMatches(text, '[.*').length, 0)
  assert.deepEqual(findWordMatches('école', 'e'), [{ start: 0, end: 2 }])
})

test('separates current-page title/body matches ahead of other ranked pages without duplication', () => {
  const current = {
    url: '/blog/current/',
    title: 'Study notes',
    section: 'Blog',
    description: '',
    headings: '',
    content: 'Preparing for IELTS in Suzhou.',
  }
  const entries = prepareSearchDocuments([...documents, current])
  const grouped = groupSearchResults(entries, 'IE', '/blog/current')
  assert.equal(grouped.currentPage.url, '/blog/current/')
  assert.equal(grouped.otherPages[0].url, '/application/ielts-transcript/')
  assert.ok(grouped.otherPages.every((entry) => entry.url !== '/blog/current/'))
  assert.equal(
    groupSearchResults(entries, 'Study', '/blog/current/').currentPage.url,
    '/blog/current/'
  )
  assert.equal(groupSearchResults(entries, 'hypoxia', '/blog/current/').currentPage, null)
})

test('shows no suggestions for empty queries and keeps alias-only results separate', () => {
  const empty = groupSearchResults(
    documents,
    '',
    '/research/trogen-a-commensal-bacterial-platform-for-intracellular-drug-delivery-in-tnbc/'
  )
  assert.equal(empty.currentPage, null)
  assert.equal(empty.otherPages.length, 0)
  const quick = groupSearchResults(documents, '', '/application/ielts-transcript/')
  assert.equal(quick.currentPage, null)
  assert.equal(quick.otherPages.length, 0)
  const alias = groupSearchResults(documents, '雅思', '/application/ielts-transcript/')
  assert.equal(alias.currentPage, null)
  assert.equal(alias.otherPages[0].url, '/application/ielts-transcript/')
  assert.equal(groupSearchResults(documents, 'IE', '/missing/').currentPage, null)
})
