import { allBlogs } from 'contentlayer/generated'
import BlogEntry from '@/components/BlogEntry'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import siteUpdates from '@/data/siteUpdates'
import { siteVersion } from '@/data/siteVersion'
import SiteInfoLayout from '@/layouts/SiteInfoLayout'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'About this site',
  description: 'The design, technology, source code, credits, and changelog for this website.',
})

export default function Colophon() {
  const accentColorPost = allBlogs.find(
    (post) => post._raw.sourceFilePath === 'blog/why-blue-as-the-accent-colour.mdx' && !post.draft
  )

  return (
    <SiteInfoLayout title="About this site">
      <p>A personal website for research, writing, and updates.</p>

      <h2>Design</h2>
      <p>
        A white reading surface, dark header, and blue link accents keep the layout simple.
        Typography uses Avenir Next throughout, with system sans-serif fallbacks where it is
        unavailable. Research pages pair full-width photographs with dark gradients. A fine divider
        and two links define the footer, with underlines on hover and clear keyboard focus outlines.
      </p>

      <h3 id="accent-color">Accent color</h3>
      <p>
        The deep blue used for links and highlights,{' '}
        <span className="whitespace-nowrap">
          <span
            aria-hidden="true"
            className="bg-primary-500 mr-1.5 inline-block size-3 rounded-sm align-baseline"
          />
          <strong>#1D2D8E</strong>
        </span>
        , came from asking 30 friends to choose a color they associate with me. I grouped their
        choices and used the center of the largest cluster as the site’s accent color. See my blog
        below for more.
      </p>
      {accentColorPost ? (
        <div className="not-prose my-6 border border-gray-300 p-5 sm:p-6">
          <BlogEntry post={accentColorPost} headingAs="h4" />
        </div>
      ) : null}

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

      <section id="changelog" aria-labelledby="changelog-heading" className="scroll-mt-8">
        <h2 id="changelog-heading">Changelog</h2>
        <p>
          Current version: <strong>{siteVersion.label}</strong>.
        </p>
        {siteVersion.isLocal && (
          <p>Local preview. This preview may include changes beyond the recorded source commit.</p>
        )}
        <p>
          {siteVersion.revision ? (
            <>
              {siteVersion.isLocal ? 'Preview base commit: ' : 'Source commit: '}
              <Link
                href={`${siteMetadata.siteRepo}/commit/${siteVersion.revision}`}
                className="font-mono"
              >
                {siteVersion.revision.slice(0, 7)}
              </Link>
              .
            </>
          ) : (
            'No source commit is available for this build.'
          )}
        </p>

        {siteUpdates.map((update) => (
          <section key={update.revision} aria-labelledby={`update-${update.revision}`}>
            <h3 id={`update-${update.revision}`}>{update.title}</h3>
            <p>
              <time dateTime={update.date}>{update.date}</time>
              {' · '}
              {'Commit '}
              <Link
                href={`${siteMetadata.siteRepo}/commit/${update.revision}`}
                className="font-mono"
              >
                {update.revision.slice(0, 7)}
              </Link>
            </p>
            <ul>
              {update.changes.map((change) => (
                <li key={change}>{change}</li>
              ))}
            </ul>
          </section>
        ))}
        <p>
          This log starts with the verified update from October 11, 2026. Earlier changes are not
          reconstructed here.
        </p>
      </section>
    </SiteInfoLayout>
  )
}
