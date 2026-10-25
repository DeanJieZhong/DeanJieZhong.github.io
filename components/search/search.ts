import { countMatchingTerms, findWordMatches, normalizeSearch, searchTerms } from './matching'

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
  searchBody: string
  searchText: string
}

const aliases: Record<string, string> = {
  '/application/cv/': 'curriculum vitae resume résumé 简历',
  '/application/academic-transcript/': 'grades gpa academic transcript 成绩 成绩单',
  '/application/academic-ranking/': 'academic ranking rank cohort 排名 专业排名 排名证明',
  '/application/ielts-transcript/': 'ielts english test 雅思 英语',
  '/application/research-summary/': 'research summary 研究总结',
  '/research/': 'research 科研 研究',
  '/about-dean-jie-zhong/': 'about contact 联系 关于',
}

export function prepareSearchDocuments(documents: SearchDocument[]): SearchEntry[] {
  return documents.map((document) => ({
    ...document,
    searchTitle: normalizeSearch(document.title),
    searchSlug: normalizeSearch(document.url.split('/').filter(Boolean).pop() || ''),
    searchDescription: normalizeSearch(`${document.description} ${aliases[document.url] || ''}`),
    searchHeadings: normalizeSearch(document.headings),
    searchBody: normalizeSearch(document.content),
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
  if (!phrase) return []
  const terms = searchTerms(query)

  return documents
    .filter((document) => countMatchingTerms(document.searchText, terms) === terms.length)
    .map((document) => {
      const titleMatches = countMatchingTerms(document.searchTitle, terms)
      const headingMatches = countMatchingTerms(document.searchHeadings, terms)
      const bodyMatches = countMatchingTerms(document.searchBody, terms)
      // Strict tiers: no amount of repetition in the body can outrank a title hit.
      const tier =
        document.searchTitle === phrase
          ? 6
          : titleMatches === terms.length
            ? 5
            : titleMatches > 0
              ? 4
              : headingMatches > 0
                ? 3
                : bodyMatches > 0
                  ? 2
                  : 1
      const titleWords = document.searchTitle.split(' ')
      const startsWithQuery = terms.every((term, index) => titleWords[index]?.startsWith(term))
      const rank = [
        tier,
        titleMatches,
        Number(startsWithQuery),
        terms.filter((term) => titleWords.includes(term)).length,
        headingMatches,
        Number(document.searchSlug === phrase),
        Number(!document.url.startsWith('/tags/')),
      ]
      return { document, rank }
    })
    .sort((a, b) => {
      for (let index = 0; index < a.rank.length; index++) {
        if (a.rank[index] !== b.rank[index]) return b.rank[index] - a.rank[index]
      }
      return a.document.title.localeCompare(b.document.title)
    })
    .map(({ document }) => document)
}

export function groupSearchResults(documents: SearchEntry[], query: string, pathname: string) {
  const path = (value: string) => value.replace(/\/+$/, '') || '/'
  const current = documents.find((document) => path(document.url) === path(pathname))
  const terms = searchTerms(query)
  if (!terms.length) return { currentPage: null, otherPages: [] }
  // The current-page group only promotes real title/body hits, not URL or alias hits.
  const currentPage =
    current &&
    countMatchingTerms(
      normalizeSearch(`${current.title} ${current.headings} ${current.content}`),
      terms
    ) === terms.length
      ? current
      : null
  const otherPages = searchDocuments(documents, query).filter(
    (document) => document !== currentPage
  )
  return { currentPage, otherPages }
}

export function searchSnippet(document: SearchDocument, query: string) {
  const content = document.content || document.description
  const matches = findWordMatches(content, query)
  if (!matches.length) return (document.description || content).slice(0, 170)
  let start = Math.max(0, matches[0].start - 55)
  if (start > 0) {
    const space = content.indexOf(' ', start)
    if (space !== -1 && space < start + 25) start = space + 1
  }
  const excerpt = content.slice(start, start + 170).trim()
  return `${start ? '…' : ''}${excerpt}${start + 170 < content.length ? '…' : ''}`
}
