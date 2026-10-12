import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import SiteInfoLayout from '@/layouts/SiteInfoLayout'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'About this site',
  description: 'The technology, typography, design, source code, and credits behind this website.',
})

export default function Colophon() {
  return (
    <SiteInfoLayout title="About this site">
      <p>A personal website for research, writing, and updates.</p>

      <h2>Design</h2>
      <p>
        A white reading surface, dark header, and blue link accents keep the layout simple. Body
        text uses system sans-serif fonts; the footer version uses monospace. Research pages pair
        full-width photographs with dark gradients. A fine divider and two links define the footer,
        with underlines on hover and clear keyboard focus outlines.
      </p>

      <h2>Development and technology</h2>
      <p>
        Built with Next.js App Router, React, and TypeScript, styled with Tailwind CSS and CSS
        modules. MDX content is processed with Contentlayer, and mathematical notation uses KaTeX.
        GitHub Actions builds the static pages and publishes them on GitHub Pages.
      </p>

      <h2>Source and credits</h2>
      <p>
        The source for this website is maintained in{' '}
        <Link href={siteMetadata.siteRepo}>DeanJieZhong/DeanJieZhong.github.io</Link>.
      </p>
      <p>
        Based on Timothy Lin’s{' '}
        <Link href="https://github.com/timlrx/tailwind-nextjs-starter-blog">
          Tailwind Nextjs Starter Blog
        </Link>
        . This is the original template; the repository above contains this website’s changes.
        Thanks to its contributors and the open-source maintainers behind the tools used here. The
        template’s MIT notice remains in the{' '}
        <Link href={`${siteMetadata.siteRepo}/blob/main/LICENSE`}>repository license</Link>.
      </p>

      <p>
        See <Link href="/updates/">website updates</Link> for the current source version and
        recorded changes.
      </p>
    </SiteInfoLayout>
  )
}
