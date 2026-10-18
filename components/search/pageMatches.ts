import { findWordMatches } from './matching'

const excluded =
  'nav, button, input, textarea, select, script, style, noscript, svg, [hidden], [aria-hidden="true"], .sr-only, [data-no-search], [contenteditable="true"]'

// Preserve inline words (e.g. I<strong>ELTS</strong>), but never join words across
// paragraphs, table cells, hidden content, or controls. Ranges leave React's DOM intact.
export function pageMatchRanges(root: HTMLElement, query: string): Range[] {
  let text = ''
  const nodes: { node: Text; start: number; end: number }[] = []
  function visit(node: Node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const value = node.textContent || ''
      nodes.push({ node: node as Text, start: text.length, end: text.length + value.length })
      text += value
      return
    }
    if (!(node instanceof HTMLElement)) return
    const style = getComputedStyle(node)
    if (node.matches(excluded) || style.display === 'none' || style.visibility === 'hidden') {
      text += '\n'
      return
    }
    const block = !style.display.startsWith('inline') || node.tagName === 'BR'
    if (block) text += '\n'
    node.childNodes.forEach(visit)
    if (block) text += '\n'
  }
  visit(root)
  return findWordMatches(text, query).flatMap(({ start, end }) => {
    const first = nodes.find((entry) => entry.start <= start && entry.end > start)
    const last = nodes.find((entry) => entry.start < end && entry.end >= end)
    if (!first || !last) return []
    const range = document.createRange()
    range.setStart(first.node, start - first.start)
    range.setEnd(last.node, end - last.start)
    return range.getClientRects().length ? [range] : []
  })
}
