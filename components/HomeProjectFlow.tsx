'use client'

import { useLayoutEffect, useRef, type ReactNode } from 'react'
import styles from '../app/Home.module.css'

/** Measure layout only: the connecting line has no scroll animation or inertia. */
export default function HomeProjectFlow({ children }: { children: ReactNode }) {
  const flowRef = useRef<HTMLDivElement>(null)
  const verticalRef = useRef<SVGPathElement>(null)
  const diagonalRef = useRef<SVGPathElement>(null)

  useLayoutEffect(() => {
    const flow = flowRef.current
    const vertical = verticalRef.current
    const diagonal = diagonalRef.current
    if (!flow || !vertical || !diagonal) return
    const projects = [...flow.querySelectorAll<HTMLElement>('[data-home-project]')]
    let frame = 0
    let disposed = false

    const measure = () => {
      const mobile = window.matchMedia('(max-width: 760px)').matches
      const widths = projects.map((project) => {
        const width = project.getBoundingClientRect().width
        const ratio = Number(project.dataset.imageRatio) || 1.5
        const headingWidth = Math.max(
          0,
          ...[...project.querySelectorAll<HTMLElement>('h2 span')].map(
            (line) => line.getBoundingClientRect().width
          )
        )
        const photoWidth = ratio * Math.max(200, Math.min(260, width * 0.215))
        // Reserve a readable text column; the wider of the title and image wins.
        const available = Math.min(width * 0.58, width - 18 - 36 - 300)
        return mobile ? 0 : Math.min(available, Math.max(photoWidth, headingWidth + 28))
      })
      projects.forEach((project, index) => {
        if (mobile) project.style.removeProperty('--visual-width')
        else project.style.setProperty('--visual-width', `${widths[index]}px`)
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
      // Filled rectangles and parallelograms give every junction a horizontal cut.
      // Compensate for slope so the diagonal's perpendicular thickness is 70%.
      vertical.setAttribute(
        'd',
        segments
          .map(
            ({ x, y, end, width }) =>
              `M ${x - width / 2} ${y} H ${x + width / 2} V ${end} H ${x - width / 2} Z`
          )
          .join(' ')
      )
      diagonal.setAttribute(
        'd',
        segments
          .slice(0, -1)
          .map((current, index) => {
            const next = segments[index + 1]
            const rise = next.y - current.end
            const run = next.x - current.x
            const halfCap = (current.width * 0.7 * Math.hypot(run, rise)) / rise / 2
            return `M ${current.x - halfCap} ${current.end} H ${current.x + halfCap} L ${next.x + halfCap} ${next.y} H ${next.x - halfCap} Z`
          })
          .join(' ')
      )
      flow.dataset.connected = 'true'
    }
    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    }
    const observer = new ResizeObserver(schedule)
    observer.observe(flow)
    projects.forEach((project) => observer.observe(project))
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
        <path ref={verticalRef} data-project-vertical fill="currentColor" />
        <path ref={diagonalRef} data-project-diagonal fill="currentColor" />
      </svg>
      {children}
    </div>
  )
}
