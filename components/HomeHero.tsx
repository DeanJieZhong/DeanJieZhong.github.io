'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { jieDots, jieOutline, zhongOutline } from '@/data/homeNameOutlines'
import { useHomeNavigation } from './HomeNavigationContext'
import styles from './HomeHero.module.css'
import {
  clamp,
  drawSearchStroke,
  ease,
  easeTravel,
  mix,
  sampleDot,
  squarePoint,
} from './homeMotion'
import HomeDeanNavigation from './HomeDeanNavigation'

const TRAVEL_RESPONSE_MS = 100

export default function HomeHero() {
  const { intro, headerRef, logoRef } = useHomeNavigation()
  const heroRef = useRef<HTMLElement>(null)
  const sourceRef = useRef<SVGGElement>(null)
  const floatingRef = useRef<HTMLAnchorElement>(null)
  const [ready, setReady] = useState(false)
  const [docked, setDocked] = useState(false)

  useLayoutEffect(() => {
    setReady(intro)
    setDocked(false)
  }, [intro])

  useLayoutEffect(() => {
    if (!intro || !ready) return
    const hero = heroRef.current
    const source = sourceRef.current
    const floating = floatingRef.current
    const header = headerRef.current
    const logo = logoRef.current
    const controls = header?.querySelector<HTMLElement>('[data-home-controls]')
    if (!hero || !source || !floating || !header || !logo || !controls) return

    const svg = floating.querySelector('svg')!
    const paths = [...floating.querySelectorAll('path')]
    const mobile = window.matchMedia('(max-width: 767px)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let sourceBounds: DOMRect
    let target: DOMRect
    let centerY = 0
    let pinAt = 0
    let holdDistance = 0
    let slideDistance = 0
    let squareSize = 0
    let dots: ReturnType<typeof sampleDot>[] = []
    let frame = 0
    let lastFrameTime = 0
    let travel = 0
    let wasDocked = false

    const draw = (time: number, settle = false) => {
      frame = 0
      const scroll = Math.max(0, window.scrollY)
      const slideStart = pinAt + holdDistance
      const morph = reducedMotion.matches ? Number(scroll >= pinAt) : ease(clamp(scroll / pinAt))
      const travelTarget = reducedMotion.matches
        ? Number(scroll >= slideStart)
        : easeTravel(clamp((scroll - slideStart) / slideDistance))
      // Only the horizontal stage has inertia; the dots stay attached to the title before pinning.
      if (settle || reducedMotion.matches || scroll < pinAt) {
        travel = travelTarget
      } else {
        const elapsed = Math.min(64, Math.max(0, time - lastFrameTime))
        travel = mix(travel, travelTarget, 1 - Math.exp(-elapsed / TRAVEL_RESPONSE_MS))
        if (Math.abs(travel - travelTarget) < 0.0001) travel = travelTarget
      }
      lastFrameTime = time
      const reveal = reducedMotion.matches ? Number(scroll >= pinAt) : ease(clamp(scroll / pinAt))
      const size = mix(squareSize, target.height, travel)
      const width = mix(sourceBounds.width, target.width, travel)
      const height = mix(sourceBounds.height, size, morph)
      const left = mix(sourceBounds.left, target.left, travel)
      // Before pinning, let the mobile browser scroll the dots with the rest of the name.
      // A fixed overlay updated by scroll events can lag behind native momentum scrolling.
      const followsDocument = mobile.matches && scroll < pinAt
      const top = followsDocument
        ? centerY - height / 2
        : Math.max(centerY - scroll, target.top + target.height / 2) - height / 2

      floating.style.position = followsDocument ? 'absolute' : 'fixed'
      floating.style.transform = `translate3d(${left}px, ${top}px, 0)`
      floating.style.width = `${width}px`
      floating.style.height = `${height}px`
      floating.style.visibility = 'visible'
      floating.style.setProperty('--elevation', String(1 - morph))
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
      paths.forEach((path, dotIndex) => {
        const dot = dots[dotIndex]
        const step = target.width * (34 / 126)
        // Keep each dot's original horizontal position until the logo starts moving.
        const centerX = mix(dot.centerX, dotIndex * step + target.height / 2, travel)
        const points = dot.points.map((point, index) => {
          const square = squarePoint(index, dot.clockwise)
          const x = mix(point.x, centerX + (square.x - 0.5) * size, morph)
          const y = mix(point.y, square.y * size, morph)
          return `${index ? 'L' : 'M'}${x.toFixed(3)} ${y.toFixed(3)}`
        })
        path.setAttribute('d', `${points.join('')}Z`)
      })
      header.style.setProperty('--home-nav-offset', `${(reveal - 1) * 100}%`)
      header.inert = reveal < 1
      floating.dataset.phase =
        travel === 1 ? 'docked' : scroll < pinAt ? 'morphing' : travel > 0 ? 'sliding' : 'holding'
      floating.dataset.morph = morph.toFixed(3)
      floating.dataset.travel = travel.toFixed(3)
      if (mobile.matches) drawSearchStroke(controls, travel)
      if (wasDocked !== (travel === 1)) {
        wasDocked = travel === 1
        if (!wasDocked && document.activeElement === floating) {
          document.getElementById('home-title')?.focus({ preventScroll: true })
        }
        setDocked(wasDocked)
      }
      if (travel !== travelTarget) frame = requestAnimationFrame(draw)
    }

    const measure = () => {
      cancelAnimationFrame(frame)
      sourceBounds = source.getBoundingClientRect()
      const logoBounds = logo.getBoundingClientRect()
      const headerBounds = header.getBoundingClientRect()
      // Measure the logo's final slot independently of the bar's current slide.
      target = new DOMRect(
        logoBounds.left,
        logoBounds.top - headerBounds.top,
        logoBounds.width,
        logoBounds.height
      )
      centerY = sourceBounds.top + window.scrollY + sourceBounds.height / 2
      pinAt = Math.max(1, centerY - target.top - target.height / 2)
      holdDistance = Math.max(80, Math.min(140, window.innerHeight * 0.12))
      slideDistance = Math.max(300, Math.min(480, window.innerHeight * 0.44))
      // Fit both stages into short homepages, leaving a little scroll after docking.
      const availableScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight - pinAt - 16
      )
      const distanceScale = Math.min(1, availableScroll / (holdDistance + slideDistance))
      holdDistance *= distanceScale
      slideDistance *= distanceScale
      dots = [...source.querySelectorAll('path')].map((path) => sampleDot(path, sourceBounds))
      // Small titles need smaller interim squares so the original gaps stay open.
      squareSize = Math.min(target.height, ...dots.map((dot) => dot.width))
      floating.dataset.pinAt = pinAt.toFixed(1)
      floating.dataset.holdDistance = holdDistance.toFixed(1)
      floating.dataset.slideDistance = slideDistance.toFixed(1)
      draw(performance.now(), true)
    }
    const scheduleDraw = () => {
      if (!frame) {
        lastFrameTime = performance.now()
        frame = requestAnimationFrame(draw)
      }
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(hero)
    observer.observe(header)
    observer.observe(logo)
    observer.observe(document.body)
    window.addEventListener('scroll', scheduleDraw, { passive: true })
    window.addEventListener('resize', measure)
    reducedMotion.addEventListener('change', measure)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', scheduleDraw)
      window.removeEventListener('resize', measure)
      reducedMotion.removeEventListener('change', measure)
      header.style.removeProperty('--home-nav-offset')
      header.inert = false
    }
  }, [intro, ready, headerRef, logoRef])

  return (
    <>
      <section ref={heroRef} id="home-top" className={styles.hero} aria-labelledby="home-title">
        <Image
          src="/static/images/home/portrait.png"
          alt="Dean Jie Zhong in front of an illuminated building at night"
          fill
          sizes="(max-aspect-ratio: 3/2) 150vh, 100vw"
          className={styles.portrait}
          priority
        />
        <h1 id="home-title" className={styles.title} aria-label="Dean Jie Zhong 钟杰" tabIndex={-1}>
          <span className={styles.chineseName} lang="zh" aria-hidden="true">
            <svg viewBox="0 60 1945 930" className={styles.chineseArtwork} fill="currentColor">
              <path d={zhongOutline} />
              <g transform="translate(945 0)">
                <path d={jieOutline} />
                <g ref={sourceRef} opacity={ready && intro ? 0 : 1}>
                  {jieDots.map((dot, index) => (
                    <path key={index} d={dot} />
                  ))}
                </g>
              </g>
            </svg>
          </span>
          <HomeDeanNavigation />
          <span className={styles.fullName} aria-hidden="true">
            Jie Zhong
          </span>
        </h1>
        <a href="#home-content" className={styles.scroll} aria-label="Explore the site">
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <path d="m5 9 7 7 7-7" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </a>
      </section>
      {ready &&
        intro &&
        createPortal(
          <Link
            ref={floatingRef}
            href="/"
            className={styles.floatingLogo}
            data-docked={docked}
            aria-label="Dean Jie Zhong — Home"
            aria-hidden={!docked}
            tabIndex={docked ? 0 : -1}
            onClick={(event) => {
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
              event.preventDefault()
              document.getElementById('home-title')?.focus({ preventScroll: true })
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                  ? 'instant'
                  : 'smooth',
              })
            }}
          >
            <svg width="100%" height="100%" fill="currentColor" aria-hidden="true">
              {jieDots.map((_, index) => (
                <path key={index} />
              ))}
            </svg>
          </Link>,
          document.body
        )}
    </>
  )
}
