'use client'

import { useLayoutEffect, useRef, type ReactNode } from 'react'
import styles from '../app/Home.module.css'

/** Measure layout only: the connecting line has no scroll animation or inertia. */
export default function HomeProjectFlow({ children }: { children: ReactNode }) {
  const flowRef = useRef<HTMLDivElement>(null)
  const ribbonRef = useRef<SVGPathElement>(null)

  useLayoutEffect(() => {
    const flow = flowRef.current
    const ribbon = ribbonRef.current
    if (!flow || !ribbon) return
    const projects = [...flow.querySelectorAll<HTMLElement>('[data-home-project]')]
    const introduction = document.getElementById('home-content')
    const entryLine = introduction?.querySelector<HTMLElement>('[data-project-entry]')
    let frame = 0
    let disposed = false

    const measure = () => {
      const mobile = window.matchMedia('(max-width: 760px)').matches
      const layouts = projects.map((project) => {
        const width = project.getBoundingClientRect().width
        const ratio = Number(project.dataset.imageRatio) || 1.5
        const scale = Number(project.dataset.imageScale) || 1
        const headingWidth = Math.max(
          0,
          ...[...project.querySelectorAll<HTMLElement>('h2 span')].map(
            (line) => line.getBoundingClientRect().width
          )
        )
        const photoWidth = ratio * Math.max(200, Math.min(260, width * 0.215))
        // Reserve a readable text column; the wider of the title and image wins.
        const available = Math.min(width * 0.58, width - 18 - 36 - 300)
        const visualWidth = Math.min(
          available * scale,
          Math.max(photoWidth * scale, headingWidth + 28)
        )
        const storyGap = Math.max(36, Math.min(56, window.innerWidth * 0.04))
        return {
          width: visualWidth,
          // Let enlarged figures keep their size without squeezing the body text.
          stacked: !mobile && scale > 1 && width - visualWidth - 18 - storyGap < 300,
        }
      })
      projects.forEach((project, index) => {
        if (mobile) project.style.removeProperty('--visual-width')
        else project.style.setProperty('--visual-width', `${layouts[index].width}px`)
        project.dataset.stacked = String(layouts[index].stacked)
      })

      const bounds = flow.getBoundingClientRect()
      const segments = projects.map((project) => {
        const spine = project.querySelector<HTMLElement>('[data-project-spine]')!
        const rect = spine.getBoundingClientRect()
        return {
          x: rect.left + rect.width / 2 - bounds.left,
          width: rect.width,
          y: rect.top - bounds.top,
          end: rect.bottom - bounds.top,
        }
      })
      // One filled outline avoids seams between the vertical and diagonal sections.
      // Project-to-project connectors match the adjacent bar widths at both ends.
      const left = segments.flatMap(({ x, y, end, width }) => [
        `${x - width / 2} ${y}`,
        `${x - width / 2} ${end}`,
      ])
      const right = [...segments]
        .reverse()
        .flatMap(({ x, y, end, width }) => [`${x + width / 2} ${end}`, `${x + width / 2} ${y}`])
      if (entryLine && segments.length) {
        const entry = entryLine.getBoundingClientRect()
        const end = entry.right - bounds.left
        const y = entry.bottom - bounds.top
        // Straight edges widen evenly from the underline's thickness to the first bar.
        left.unshift(`${end - entry.height} ${y}`)
        right.push(`${end} ${y}`)
      }
      ribbon.setAttribute('d', `M ${[...left, ...right].join(' L ')} Z`)
      flow.dataset.connected = 'true'
    }
    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    }
    const observer = new ResizeObserver(schedule)
    observer.observe(flow)
    projects.forEach((project) => observer.observe(project))
    if (introduction) observer.observe(introduction)
    if (entryLine) observer.observe(entryLine)
    measure()
    document.fonts.ready.then(() => {
      if (!disposed) schedule()
    })
    window.addEventListener('resize', schedule)
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return (
    <div className={styles.projectFlow} ref={flowRef}>
      <svg className={styles.projectPath} aria-hidden="true" focusable="false">
        <path ref={ribbonRef} data-project-ribbon fill="currentColor" />
      </svg>
      {children}
    </div>
  )
}
