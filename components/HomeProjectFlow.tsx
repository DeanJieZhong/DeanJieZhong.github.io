'use client'

import { useLayoutEffect, useRef, type ReactNode } from 'react'
import styles from '../app/Home.module.css'

/** Measure layout only: the connecting line has no scroll animation or inertia. */
export default function HomeProjectFlow({ children }: { children: ReactNode }) {
  const flowRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useLayoutEffect(() => {
    const flow = flowRef.current
    const path = pathRef.current
    if (!flow || !path) return
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
          y: rect.top - bounds.top,
          end: rect.bottom - bounds.top,
        }
      })
      const d = segments
        .map(({ x, y, end }, index) => `${index ? 'L' : 'M'} ${x} ${y} L ${x} ${end}`)
        .join(' ')
      path.setAttribute('d', d)
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
        <path ref={pathRef} fill="none" stroke="currentColor" strokeLinejoin="bevel" />
      </svg>
      {children}
    </div>
  )
}
