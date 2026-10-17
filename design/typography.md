# Website typography

## Decision — 2026-10-17

After comparing Inter and Avenir Next on the actual Research overview page, the
site owner selected **Avenir Next** as the site's primary font. **Inter** is retained
as the alternative for a future typography change.

## Active implementation

- `css/tailwind.css` defines the shared Avenir Next font stack for navigation,
  headings, body text, controls, code, and the footer.
- Avenir Next is resolved from the visitor's installed fonts. The stack falls back
  to Avenir and system sans-serif fonts when needed, including for Chinese glyphs.
- Mathematical notation keeps the fonts required by KaTeX.
- The temporary comparison controls, query-parameter handling, and extra footer
  spacing have been removed. Old font comparison URLs no longer change the font.

## Retained alternative: Inter

The variable roman and italic files, source information, and original SIL Open Font
License remain in `public/static/fonts/inter/`. Inter is not currently imported,
preloaded, applied, or included as an automatic fallback.

If Inter is selected later, load both files with `next/font/local`, using weight
range `100 900` and their corresponding normal and italic styles. Then connect the
font to the shared `--font-sans` family, update the public typography description
in `app/colophon/page.tsx`, and verify the Research page and other shared layouts.
