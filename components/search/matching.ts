export interface TextMatch {
  start: number
  end: number
}

function fold(value: string) {
  return value.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase()
}

export function normalizeSearch(value: string) {
  return fold(value)
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
}

export function searchTerms(query: string) {
  return [...new Set(normalizeSearch(query).split(' ').filter(Boolean))]
}

export function countMatchingTerms(normalizedText: string, terms: string[]) {
  const words = normalizedText.split(' ')
  return terms.filter((term) => words.some((word) => word.startsWith(term))).length
}

// Keep offsets in the original text: case folding and accent/ligature normalization
// can change its length. One word produces one match, even with overlapping terms.
export function findWordMatches(text: string, query: string): TextMatch[] {
  const terms = searchTerms(query)
  if (!terms.length) return []
  const matches: TextMatch[] = []
  for (const word of text.matchAll(/[\p{L}\p{N}\p{M}]+/gu)) {
    const value = fold(word[0])
    const length = Math.max(
      0,
      ...terms.filter((term) => value.startsWith(term)).map((term) => term.length)
    )
    if (!length) continue
    let foldedLength = 0
    let end = word.index
    for (const character of word[0]) {
      const folded = fold(character)
      if (foldedLength >= length && folded.length) break
      foldedLength += folded.length
      end += character.length
    }
    matches.push({ start: word.index, end })
  }
  return matches
}
