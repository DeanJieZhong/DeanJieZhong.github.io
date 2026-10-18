'use client'

import SearchIcon from './search/SearchIcon'
import styles from './search/SearchButton.module.css'
import { useSiteSearch } from './search/SiteSearchProvider'

const SearchButton = () => {
  const { openSearch } = useSiteSearch()
  return (
    <button
      type="button"
      onClick={openSearch}
      aria-label="Search"
      aria-haspopup="dialog"
      aria-keyshortcuts="Meta+K Control+K"
      className={`${styles.button} text-white`}
    >
      <SearchIcon className="block h-6 w-6" fillClassName={styles.fill} />
    </button>
  )
}

export default SearchButton
