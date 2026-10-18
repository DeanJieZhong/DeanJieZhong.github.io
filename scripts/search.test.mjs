import assert from 'node:assert/strict'
import { test } from 'node:test'
import { build } from 'esbuild'
import { extractSearchDocument, routeFromFile } from './search-index.mjs'

const compiled = await build({
  entryPoints: ['components/search/search.ts'],
  bundle: true,
  write: false,
  format: 'esm',
  platform: 'node',
})
const { prepareSearchDocuments, searchDocuments, searchSnippet } = await import(
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
    '/application/english/'
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
  assert.equal(routeFromFile('application/english/index.html'), '/application/english/')
  assert.equal(routeFromFile('research/trogen.html'), '/research/trogen/')
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
    url: '/application/english/',
    title: 'IELTS Transcript',
    section: 'Application',
    description: 'Academic English scores',
    headings: 'Band scores',
    content: 'IELTS Transcript. Listening 8.0. Coherence and cohesion 7. Suzhou.',
  },
  {
    url: '/research/trogen/',
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
    url: '/application/transcript/',
    title: 'Academic Transcript',
    section: 'Application',
    description: 'Academic records',
    headings: 'Weighted averages',
    content: 'Academic Transcript. Module marks.',
  },
])

test('finds body-only terms and ranks a matching page title ahead of incidental references', () => {
  assert.equal(searchDocuments(documents, 'IELTS')[0].url, '/application/english/')
  assert.equal(searchDocuments(documents, 'transcript')[0].url, '/application/transcript/')
  assert.equal(searchDocuments(documents, 'coherence')[0].url, '/application/english/')
  assert.equal(searchDocuments(documents, 'hypoxia')[0].url, '/research/trogen/')
  assert.equal(searchDocuments(documents, 'ielts suzhou')[0].url, '/application/english/')
  assert.equal(searchDocuments(documents, 'IELTS hypoxia').length, 0)
})

test('handles aliases, diacritics, whitespace, and empty searches', () => {
  assert.equal(searchDocuments(documents, '  雅思  ')[0].url, '/application/english/')
  assert.equal(searchDocuments(documents, 'résumé')[0].url, '/application/cv/')
  assert.equal(searchDocuments(documents, '').length, 3)
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
