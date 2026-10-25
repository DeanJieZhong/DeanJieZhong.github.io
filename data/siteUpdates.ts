// Record only verified changes, with the original commit and its actual date.
// Add release notes after the corresponding source revision is known.
const siteUpdates = [
  {
    revision: '3957dd5c68715882dfda35734010e6ccf12065f8',
    date: '2026-10-25',
    title: 'Website version and integrated changelog',
    changes: [
      'Set the website version to v1.2.0, maintained separately from source commit identifiers.',
      'Moved the changelog into About this site and linked the footer version directly to it.',
      'Kept source commit links in the changelog and redirected both previous update page addresses.',
    ],
  },
  {
    revision: '560dc06f5eb7334029190488fbc20407d8829ad4',
    date: '2026-10-18',
    title: 'Consistent blue interaction feedback',
    changes: [
      'Unified hover, pressed, selected, and keyboard focus feedback with the existing blue palette.',
      'Preserved the existing animated underlines and added a left-to-right underline to scholar names.',
      'Removed pale flashes when selecting Blog categories and kept the logo unchanged on hover and press.',
    ],
  },
  {
    revision: 'f00892d96b3a60f7c41d337c13317a2a7dc2858d',
    date: '2026-10-18',
    title: 'Avenir Next typography',
    changes: [
      'Unified the site typography with Avenir Next, including navigation, headings, body text, and the footer.',
      'Kept system sans-serif fallbacks for devices without Avenir Next.',
      'Documented the font decision and retained Inter as an alternative for future use.',
    ],
  },
  {
    revision: '521eebf6a2a4ac57d5e18b299daac9a2a9f3219a',
    date: '2026-10-13',
    title: 'Simpler footer and a more compact header',
    changes: [
      'Simplified the footer with a divider, full copyright name, source version, and two links.',
      'Added continuous hover underlines and visible keyboard focus to footer links.',
      'Moved phone, email, and WeChat contact details to About, and added About this site and website updates pages.',
      'Reduced header height by 25%, keeping each navigation label and square centered together.',
      'Added a guestbook status page; the message system remains to be decided.',
    ],
  },
  {
    revision: 'b721c1c842da2cd13de0e7a2390187a7e775197f',
    date: '2026-10-11',
    title: 'Research pages and scholar cards',
    changes: [
      'Updated the research overview and navigation.',
      'Added the Soochow University group photograph and placed the title in the dark gradient.',
      'Updated scholar cards so their text and links remain available while portraits load.',
    ],
  },
]

export default siteUpdates
