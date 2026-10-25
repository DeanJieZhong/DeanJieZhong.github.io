// Maintain the website release separately from the inherited template package version.
const version = '1.2.0'

// Build/startup metadata is shown only in the changelog.
const revision = process.env.SITE_REVISION || ''
const isLocal = process.env.SITE_LOCAL_PREVIEW !== 'false'

export const siteVersion = {
  version,
  label: `v${version}`,
  revision,
  isLocal,
}
