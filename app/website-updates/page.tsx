import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import siteUpdates from '@/data/siteUpdates'
import { siteVersion } from '@/data/siteVersion'
import SiteInfoLayout from '@/layouts/SiteInfoLayout'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Website updates',
  description: 'The current source version and verified updates to this website.',
})

export default function Updates() {
  return (
    <SiteInfoLayout title="Website updates">
      <p>
        {siteVersion.isLocal ? 'Local preview: ' : 'Current version: '}
        <strong>{siteVersion.label}</strong>.
        {siteVersion.isLocal && ' This preview may include changes beyond the recorded revision.'}
      </p>
      <p>
        {siteVersion.revision
          ? 'Versions identify this website’s Git source revision.'
          : 'v1.2.0 is the display fallback; no Git source revision is available for this build.'}
        {siteVersion.revision && (
          <>
            {' '}
            <Link href={`${siteMetadata.siteRepo}/commit/${siteVersion.revision}`}>
              View {siteVersion.isLocal ? 'the base' : 'this'} revision
            </Link>
            .
          </>
        )}
      </p>

      {siteUpdates.map((update) => (
        <section key={update.revision} aria-labelledby={`update-${update.revision}`}>
          <h2 id={`update-${update.revision}`}>{update.title}</h2>
          <p>
            <time dateTime={update.date}>{update.date}</time>
            {' · '}
            <Link href={`${siteMetadata.siteRepo}/commit/${update.revision}`}>
              r{update.revision.slice(0, 7)}
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
    </SiteInfoLayout>
  )
}
