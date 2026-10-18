import rss from './rss.mjs'
import { generateSearchIndex } from './search-index.mjs'

async function postbuild() {
  await rss()
  await generateSearchIndex()
}

postbuild()
