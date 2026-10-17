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
    href: '/blog',
    title: 'Blog',
    children: [{ href: '/tags', title: 'Tags' }],
  },
  {
    href: '/application',
    title: 'Application',
    children: [
      { href: '/application/cv', title: 'CV' },
      { href: '/application/transcript', title: 'Transcript' },
      { href: '/application/english', title: 'IELTS' },
      { href: '/application/research', title: 'Research' },
    ],
  },
  {
    href: '/about',
    title: 'About',
    children: [
      { href: '/lego', title: 'Lego Archive' },
      { href: '/about#contact', title: 'Contact' },
    ],
  },
]

export default headerNavLinks
