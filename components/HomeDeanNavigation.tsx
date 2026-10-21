'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { deanLetters, deanWidth } from '@/data/homeDeanOutlines'
import { useHomeNavigation } from './HomeNavigationContext'
import { clamp, ease, easeTravel, mix } from './homeMotion'
import styles from './HomeHero.module.css'

type Glyph = {
  element: HTMLDivElement
  cut: { x: number; documentCenterY: number; size: number; pinAt: number }
  item: HTMLElement
  label: DOMRect
  marker: { x: number; y: number; size: number }
}

export default function HomeDeanNavigation() {
  const { intro, headerRef, logoRef, setControlsReady } = useHomeNavigation()
  const sourceRef = useRef<SVGSVGElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useLayoutEffect(() => setReady(intro), [intro])

  useLayoutEffect(() => {
    if (!intro || !ready) return
    const source = sourceRef.current
    const overlay = overlayRef.current
    const header = headerRef.current
    const logo = logoRef.current
    const controls = header?.querySelector<HTMLElement>('[data-home-controls]')
    if (!source || !overlay || !header || !logo || !controls) return

    const desktop = window.matchMedia('(min-width: 768px)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const items = [...controls.querySelectorAll<HTMLElement>('[data-section]')]
    const elements = [...overlay.querySelectorAll<HTMLDivElement>('[data-dean-glyph]')]
    let glyphs: Glyph[] = []
    let logoSize = 24
    let headerCenterY = 36
    let pinAt = 0
    let holdDistance = 0
    let sweepDistance = 0
    let shrinkDistance = 0
    let progress = 0
    let frame = 0
    let lastTime = 0
    let wasReady = false

    const updateReady = (next: boolean) => {
      if (next === wasReady) return
      wasReady = next
      if (!next && controls.contains(document.activeElement)) {
        document.getElementById('home-title')?.focus({ preventScroll: true })
      }
      setControlsReady(next)
    }

    const drawSearch = (value: number) => {
      // One continuous stroke: lower-right corner, counterclockwise box, then the handle.
      controls.style.setProperty('--home-search-ring', String(1 - clamp(value / 0.82)))
      controls.style.setProperty('--home-search-handle', String(1 - clamp((value - 0.82) / 0.18)))
      // A fully offset stroke can still leave an end cap; hide each segment until it starts.
      controls.style.setProperty('--home-search-ring-visible', value > 0 ? '1' : '0')
      controls.style.setProperty('--home-search-handle-visible', value > 0.82 ? '1' : '0')
    }

    const drawMobileMenu = (value: number) => {
      // Three left-to-right strokes, staggered from top to bottom and reversible with scroll.
      for (let line = 0; line < 3; line++) {
        const drawn = easeTravel(clamp((value - line * 0.12) / 0.76))
        controls.style.setProperty(`--home-menu-line-${line}`, String(1 - drawn))
        controls.style.setProperty(`--home-menu-line-${line}-visible`, drawn > 0 ? '1' : '0')
      }
    }

    const draw = (time: number, settle = false) => {
      frame = 0
      const scroll = Math.max(0, window.scrollY)
      const start = pinAt + holdDistance
      const distance = sweepDistance + shrinkDistance
      const target = desktop.matches
        ? clamp((scroll - start) / distance)
        : clamp((scroll - pinAt) / 120)
      const targetProgress = reducedMotion.matches ? Number(target === 1) : target
      if (settle || reducedMotion.matches || scroll < pinAt) {
        progress = targetProgress
      } else {
        const elapsed = Math.min(64, Math.max(0, time - lastTime))
        progress = mix(progress, targetProgress, 1 - Math.exp(-elapsed / 110))
        if (Math.abs(progress - targetProgress) < 0.0001) progress = targetProgress
      }
      lastTime = time

      if (!desktop.matches) {
        source.style.opacity = '1'
        overlay.style.visibility = 'hidden'
        drawMobileMenu(progress)
        drawSearch(ease(progress))
        updateReady(progress === 1)
      } else {
        const bladeY = Math.max(0, header.getBoundingClientRect().bottom)
        const captured = glyphs.filter((glyph) => scroll >= glyph.cut.pinAt).length
        const cutting = glyphs.some(
          (glyph) => glyph.cut.documentCenterY - scroll - glyph.cut.size / 2 < bladeY
        )
        const sweepFraction = sweepDistance / distance
        const sweep = easeTravel(clamp(progress / sweepFraction))
        const shrinkRaw = clamp((progress - sweepFraction) / (1 - sweepFraction))
        const shrink = 1 - (1 - shrinkRaw) ** 3
        // The original word keeps scrolling behind the bar. Only its selected square cuts
        // cross into the foreground, so there is no whole-letter shrink or layer handoff.
        source.style.opacity = '1'
        overlay.style.setProperty('--dean-blade-y', `${bladeY}px`)
        overlay.style.visibility = !cutting || progress === 1 ? 'hidden' : 'visible'
        overlay.dataset.deanPhase =
          progress === 1
            ? 'docked'
            : shrinkRaw > 0
              ? 'shrinking'
              : sweep > 0
                ? 'sweeping'
                : captured === glyphs.length
                  ? 'holding'
                  : cutting
                    ? 'cutting'
                    : 'letters'
        overlay.dataset.deanCaptured = String(captured)
        overlay.dataset.deanProgress = progress.toFixed(3)

        glyphs.forEach((glyph) => {
          const { cut, marker, element } = glyph
          // Each cut follows its own part of the letter to the same horizontal row.
          // Smaller titles leave smaller pieces, which settle to logo size once captured.
          const arrival = reducedMotion.matches
            ? Number(scroll >= cut.pinAt)
            : ease(clamp((scroll - cut.pinAt) / 32))
          const size = mix(mix(cut.size, logoSize, arrival), marker.size, shrink)
          const originalY = Math.max(cut.documentCenterY - scroll, headerCenterY)
          // Sweep horizontally to directly below the marker, then shrink straight into its slot.
          const centerX = mix(cut.x, marker.x, sweep)
          const centerY = mix(originalY, marker.y, shrink)
          element.style.transform = `translate3d(${centerX - size / 2}px, ${centerY - size / 2}px, 0)`
          element.style.width = `${size}px`
          element.style.height = `${size}px`
          element.dataset.captured = String(scroll >= cut.pinAt)

          // Reveal directly behind the sweep, with no opacity animation or one-way trigger.
          const covered =
            sweep === 0 ? 1 : clamp((centerX - size / 2 - glyph.label.x) / glyph.label.width)
          glyph.item.style.setProperty('--intro-label-clip', `${covered * 100}%`)
          // Center the full line (including descenders) behind the large sweeping square.
          // The words descend to their normal baseline as that square shrinks into its marker.
          glyph.item.style.setProperty('--intro-label-y', `${-6 * (1 - shrink)}px`)
          glyph.item.style.setProperty('--intro-marker', progress === 1 ? '1' : '0')
        })
        drawSearch(easeTravel(shrinkRaw))
        updateReady(progress === 1)
      }

      if (progress !== targetProgress) {
        frame = requestAnimationFrame(draw)
      }
    }

    const measure = () => {
      cancelAnimationFrame(frame)
      frame = 0
      const headerBounds = header.getBoundingClientRect()
      headerCenterY = headerBounds.height / 2
      logoSize = logo.getBoundingClientRect().height
      if (desktop.matches) {
        glyphs = [...source.querySelectorAll<SVGGElement>('[data-dean-source]')].map(
          (group, index) => {
            const shape = group.querySelector<SVGPathElement>('[data-dean-shape]')!
            const bounds = shape.getBoundingClientRect()
            const outline = shape.getBBox()
            const scale = bounds.width / outline.width
            // 128 font units fit inside the ink at all four selected right-angle corners.
            const side = Math.min(128, logoSize / scale)
            const corner = deanLetters[index].cutCorner
            const left = corner.x - (corner.fromRight ? side : 0)
            const top = corner.y - (corner.fromBottom ? side : 0)
            const documentCenterY = bounds.y + window.scrollY + (top - outline.y + side / 2) * scale
            const item = items[index]
            const label = item.querySelector('[data-nav-label]')!.getBoundingClientRect()
            const panel = item.querySelector('[data-nav-reveal]')!.getBoundingClientRect()
            const size = parseFloat(getComputedStyle(item).getPropertyValue('--unit'))
            elements[index].dataset.captureAt = (documentCenterY - headerCenterY).toFixed(1)
            return {
              element: elements[index],
              cut: {
                x: bounds.x + (left - outline.x + side / 2) * scale,
                documentCenterY,
                size: side * scale,
                pinAt: documentCenterY - headerCenterY,
              },
              item,
              label,
              marker: {
                x: panel.x + size / 2,
                y: panel.y - headerBounds.top + size / 2,
                size,
              },
            }
          }
        )
        // Start the shared hold only after the last piece joins the row.
        pinAt = Math.max(...glyphs.map((glyph) => glyph.cut.pinAt))
        holdDistance = Math.max(60, Math.min(100, window.innerHeight * 0.08))
        sweepDistance = Math.max(260, Math.min(420, window.innerHeight * 0.35))
        shrinkDistance = Math.max(100, Math.min(180, window.innerHeight * 0.15))
        const available = Math.max(
          1,
          document.documentElement.scrollHeight - window.innerHeight - pinAt - 24
        )
        const scale = Math.min(1, available / (holdDistance + sweepDistance + shrinkDistance))
        holdDistance *= scale
        sweepDistance *= scale
        shrinkDistance *= scale
        overlay.dataset.deanPin = pinAt.toFixed(1)
        overlay.dataset.deanHold = holdDistance.toFixed(1)
        overlay.dataset.deanSweep = sweepDistance.toFixed(1)
        overlay.dataset.deanShrink = shrinkDistance.toFixed(1)
      } else {
        // Small screens keep the existing mobile menu instead of squeezing in four desktop items.
        pinAt = window.innerHeight * 0.6
        items.forEach((item) => {
          item.style.removeProperty('--intro-label-clip')
          item.style.removeProperty('--intro-label-y')
          item.style.removeProperty('--intro-marker')
        })
      }
      draw(performance.now(), true)
    }

    const schedule = () => {
      if (!frame) {
        lastTime = performance.now()
        frame = requestAnimationFrame(draw)
      }
    }
    setControlsReady(false)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(source)
    observer.observe(header)
    observer.observe(document.body)
    // The bar moves in HomeHero's animation frame, which can run after this one.
    // Refresh the blade before paint so stopping a scroll cannot leave a stale cut edge.
    const bladeObserver = new MutationObserver(() => {
      cancelAnimationFrame(frame)
      draw(performance.now())
    })
    bladeObserver.observe(header, { attributes: true, attributeFilter: ['style'] })
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', measure)
    desktop.addEventListener('change', measure)
    reducedMotion.addEventListener('change', measure)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      bladeObserver.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', measure)
      desktop.removeEventListener('change', measure)
      reducedMotion.removeEventListener('change', measure)
      source.style.removeProperty('opacity')
      for (const property of [
        '--home-search-ring',
        '--home-search-handle',
        '--home-search-ring-visible',
        '--home-search-handle-visible',
      ]) {
        controls.style.removeProperty(property)
      }
      for (let line = 0; line < 3; line++) {
        controls.style.removeProperty(`--home-menu-line-${line}`)
        controls.style.removeProperty(`--home-menu-line-${line}-visible`)
      }
      items.forEach((item) => {
        item.style.removeProperty('--intro-label-clip')
        item.style.removeProperty('--intro-label-y')
        item.style.removeProperty('--intro-marker')
      })
    }
  }, [intro, ready, headerRef, logoRef, setControlsReady])

  return (
    <>
      <span className={styles.firstName} aria-hidden="true">
        <svg
          ref={sourceRef}
          className={styles.deanArtwork}
          viewBox={`0 0 ${deanWidth} 1000`}
          style={{ width: `${deanWidth / 1000}em` }}
          fill="currentColor"
        >
          {deanLetters.map((letter) => (
            <g key={letter.character} transform={`translate(${letter.x} 0)`} data-dean-source>
              <path d={letter.contours.join('')} fillRule="evenodd" data-dean-shape />
            </g>
          ))}
        </svg>
      </span>
      {intro &&
        ready &&
        createPortal(
          <div ref={overlayRef} className={styles.deanOverlay} aria-hidden="true">
            {deanLetters.map((letter) => (
              <div
                key={letter.character}
                className={styles.deanGlyph}
                data-dean-glyph={letter.character}
              >
                <svg fill="currentColor" viewBox="0 0 1 1" data-dean-square>
                  <rect width="1" height="1" />
                </svg>
              </div>
            ))}
          </div>,
          document.body
        )}
    </>
  )
}
