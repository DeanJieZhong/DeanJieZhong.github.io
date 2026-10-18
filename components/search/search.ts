export interface SearchDocument {
  url: string
  title: string
  section: string
  description: string
  headings: string
  content: string
}

export interface SearchEntry extends SearchDocument {
  searchTitle: string
  searchSlug: string
  searchDescription: string
  searchHeadings: string
  searchText: string
}

const aliases: Record<string, string> = {
  '/application/cv/': 'curriculum vitae resume résumé 简历',
  '/application/transcript/': 'grades gpa academic transcript 成绩 成绩单',
  '/application/english/': 'ielts english test 雅思 英语',
  '/application/research/': 'research summary 研究总结',
  '/research/': 'research 科研 研究',
  '/about/': 'about contact 联系 关于',
}

const quickAccess = [
  '/application/cv/',
  '/application/transcript/',
  '/application/english/',
  '/research/',
  '/blog/',
  '/about/',
]

export function normalizeSearch(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
}

export function prepareSearchDocuments(documents: SearchDocument[]): SearchEntry[] {
  return documents.map((document) => ({
    ...document,
    searchTitle: normalizeSearch(document.title),
    searchSlug: normalizeSearch(document.url.split('/').filter(Boolean).pop() || ''),
    searchDescription: normalizeSearch(`${document.description} ${aliases[document.url] || ''}`),
    searchHeadings: normalizeSearch(document.headings),
    searchText: normalizeSearch(
      [
        document.title,
        document.description,
        document.headings,
        document.content,
        document.section,
        document.url,
        aliases[document.url] || '',
      ].join(' ')
    ),
  }))
}

export function searchDocuments(documents: SearchEntry[], query: string): SearchEntry[] {
  const phrase = normalizeSearch(query)
  if (!phrase) {
    return quickAccess.flatMap((url) => documents.find((document) => document.url === url) || [])
  }
  const terms = [...new Set(phrase.split(' '))]

  return documents
    .filter((document) => terms.every((term) => document.searchText.includes(term)))
    .map((document) => {
      let score = document.searchTitle === phrase ? 1000 : 0
      if (document.searchSlug === phrase) score += 120
      if (document.searchTitle.includes(phrase)) score += 300
      if (terms.every((term) => document.searchTitle.includes(term))) score += 150
      for (const term of terms) {
        if (document.searchTitle.includes(term)) score += 50
        if (document.searchDescription.includes(term)) score += 20
        if (document.searchHeadings.includes(term)) score += 10
      }
      // Listing pages can mention many matches; prefer their actual detail pages.
      if (document.url.startsWith('/tags/')) score -= 25
      return { document, score }
    })
    .sort((a, b) => b.score - a.score || a.document.title.localeCompare(b.document.title))
    .map(({ document }) => document)
}

export function searchSnippet(document: SearchDocument, query: string) {
  const terms = query.trim().split(/\s+/).filter(Boolean)
  const content = document.content || document.description
  const positions = terms
    .map((term) => content.toLowerCase().indexOf(term.toLowerCase()))
    .filter((index) => index >= 0)
  if (!positions.length) return document.description || content.slice(0, 170)
  let start = Math.max(0, Math.min(...positions) - 55)
  if (start > 0) {
    const space = content.indexOf(' ', start)
    if (space !== -1 && space < start + 25) start = space + 1
  }
  const excerpt = content.slice(start, start + 170).trim()
  return `${start ? '…' : ''}${excerpt}${start + 170 < content.length ? '…' : ''}`
}
