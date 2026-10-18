import rss from './rss.mjs'
import { generateSearchIndex } from './search-index.mjs'
import { generateRouteRedirects } from './route-redirects.mjs'

async function postbuild() {
  await rss()
  await generateSearchIndex()
  await generateRouteRedirects()
}

postbuild()
