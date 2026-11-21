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
      { href: '/research#ism-heading', title: 'T cells' },
      { href: '/research#igem-2025-heading', title: 'iGEM' },
      { href: '/research#f-johnsoniae-heading', title: 'Motility' },
    ],
  },
  {
    href: '/materials',
    title: 'Materials',
    children: [
      { href: '/materials/cv', title: 'CV' },
      { href: '/materials/academic-transcript', title: 'Transcript' },
      { href: '/materials/academic-ranking', title: 'Ranking' },
      { href: '/materials/ielts-transcript', title: 'IELTS' },
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
