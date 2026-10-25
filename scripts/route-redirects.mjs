import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

export function redirectHtml(destination) {
  if (!/^\/(?:[a-z0-9-]+\/)+(?:#[a-z0-9-]+)?$/.test(destination)) {
    throw new Error('Invalid redirect destination')
  }
  const [pathname, fragment] = destination.split('#')
  const defaultHash = fragment ? `#${fragment}` : ''
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page moved</title>
<meta name="robots" content="noindex, follow">
<link rel="canonical" href="${pathname}">
<script>window.location.replace(${JSON.stringify(pathname)} + window.location.search + (window.location.hash || ${JSON.stringify(defaultHash)}))</script>
<noscript><meta http-equiv="refresh" content="0; url=${destination}"></noscript>
</head><body><p>This page has moved. <a href="${destination}">Continue to the page</a>.</p></body></html>
`
}

export async function generateRouteRedirects() {
  if (!process.env.EXPORT) return
  const redirects = JSON.parse(await readFile('data/routeRedirects.json', 'utf8'))
  for (const [source, destination] of Object.entries(redirects)) {
    const folder = path.join('out', source)
    await mkdir(folder, { recursive: true })
    await writeFile(path.join(folder, 'index.html'), redirectHtml(destination))
  }
  console.log(`Legacy page redirects generated: ${Object.keys(redirects).length}.`)
}
