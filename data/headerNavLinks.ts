export interface HeaderNavLink {
  href: string
  title: string
  // Prefer short, single-word submenu labels; page headings can remain descriptive.
  children?: { href: string; title: string }[]
}

const headerNavLinks: HeaderNavLink[] = [
  {
    href: '/research',
    title: 'Research',
    children: [
      { href: '/research#ism-heading', title: 'Immunology' },
      { href: '/research#igem-2025-heading', title: 'iGEM' },
      { href: '/research#f-johnsoniae-heading', title: 'Motility' },
    ],
  },
  {
    href: '/application',
    title: 'Application',
    children: [
      { href: '/application/cv', title: 'CV' },
      { href: '/application/academic-transcript', title: 'Transcript' },
      { href: '/application/academic-ranking', title: 'Ranking' },
      { href: '/application/ielts-transcript', title: 'IELTS' },
      { href: '/application/research-summary', title: 'Research' },
    ],
  },
  {
    href: '/blog',
    title: 'Blog',
    children: [
      { href: '/blog/', title: 'All' },
      { href: '/blog/?category=research', title: 'Research' },
      { href: '/blog/?category=reflection', title: 'Reflection' },
      { href: '/blog/?category=travel', title: 'Travel' },
      { href: '/blog/?category=side-quests', title: 'Side quests' },
    ],
  },
  {
    href: '/about-dean-jie-zhong',
    title: 'About',
    children: [
      { href: '/lego-archive', title: 'Lego Archive' },
      { href: '/about-dean-jie-zhong#contact', title: 'Contact' },
    ],
  },
]

export default headerNavLinks
