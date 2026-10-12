// Injected once at build/startup by next.config.js. Never use the template's package version.
const revision = process.env.SITE_REVISION || ''
const isLocal = process.env.SITE_LOCAL_PREVIEW !== 'false'

export const siteVersion = {
  revision,
  isLocal,
  // The fallback is a display label, not a fabricated release entry.
  label: revision ? `r${revision.slice(0, 7)}${isLocal ? '-local' : ''}` : 'v1.2.0',
}
