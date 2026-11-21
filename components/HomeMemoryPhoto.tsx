'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from '../app/Home.module.css'

interface MemoryPhoto {
  src: string
  width: number
  height: number
  alt: string
}

interface PreviewPosition {
  left: number
  top: number
  width: number
  height: number
  offsetX: number
  offsetY: number
  scale: number
}

const PHOTO_TILT = -7

export default function HomeMemoryPhoto({ src, width, height, alt }: MemoryPhoto) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const photoRef = useRef<HTMLSpanElement>(null)
  const animateRef = useRef<((target: 0 | 1) => void) | null>(null)
  const [preview, setPreview] = useState<PreviewPosition | null>(null)

  const open = () => {
    if (animateRef.current) {
      animateRef.current(1)
      return
    }
    const trigger = triggerRef.current
    if (!trigger) return
    const rect = trigger.getBoundingClientRect()
    const previewWidth = Math.min(
      960,
      window.innerWidth - 40,
      ((window.innerHeight - 80) * width) / height
    )
    const previewHeight = (previewWidth * height) / width
    setPreview({
      left: (window.innerWidth - previewWidth) / 2,
      top: (window.innerHeight - previewHeight) / 2,
      width: previewWidth,
      height: previewHeight,
      offsetX: rect.left + rect.width / 2 - window.innerWidth / 2,
      offsetY: rect.top + rect.height / 2 - window.innerHeight / 2,
      scale: rect.width / previewWidth,
    })
  }

  const close = () => {
    if (animateRef.current) animateRef.current(0)
    else setPreview(null)
  }

  useLayoutEffect(() => {
    const photo = photoRef.current
    if (!preview || !photo) return
    let progress = 0
    let velocity = 0
    let target: 0 | 1 = 1
    let frame = 0
    let previousTime = 0
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const draw = () => {
      const remaining = 1 - progress
      const scale = preview.scale + (1 - preview.scale) * progress
      photo.style.transform = `translate(${preview.offsetX * remaining}px, ${preview.offsetY * remaining}px) scale(${scale}) rotate(${PHOTO_TILT * remaining}deg)`
    }

    const step = (time: number) => {
      frame = 0
      const elapsed = Math.min((time - previousTime) / 1000, 0.064)
      previousTime = time
      // Small integration steps keep the damped spring consistent across refresh rates.
      const steps = Math.max(1, Math.ceil(elapsed * 120))
      const dt = elapsed / steps
      for (let index = 0; index < steps; index++) {
        velocity += (180 * (target - progress) - 22 * velocity) * dt
        progress += velocity * dt
      }
      const settled = Math.abs(target - progress) < 0.0001 && Math.abs(velocity) < 0.001
      if (settled) {
        progress = target
        velocity = 0
      }
      draw()
      if (!settled) frame = requestAnimationFrame(step)
      else if (target === 0) setPreview(null)
    }

    const animateTo = (nextTarget: 0 | 1) => {
      target = nextTarget
      if (reducedMotion.matches) {
        cancelAnimationFrame(frame)
        frame = 0
        progress = target
        velocity = 0
        draw()
        if (target === 0) setPreview(null)
      } else if (!frame) {
        previousTime = performance.now()
        frame = requestAnimationFrame(step)
      }
    }

    // The same image moves out of the button; only its invisible hit area stays put.
    // Reversing direction preserves velocity instead of restarting the animation.
    animateRef.current = animateTo
    draw()
    animateTo(1)
    return () => {
      cancelAnimationFrame(frame)
      animateRef.current = null
      photo.style.removeProperty('transform')
    }
  }, [preview])

  useEffect(() => {
    if (!preview) return
    const dismiss = () => setPreview(null)
    const dismissOutside = (event: PointerEvent) => {
      if (
        event.pointerType === 'touch' &&
        event.target instanceof Node &&
        !triggerRef.current?.contains(event.target)
      ) {
        animateRef.current?.(0)
      }
    }
    window.addEventListener('resize', dismiss)
    window.addEventListener('scroll', dismiss, { capture: true, passive: true })
    document.addEventListener('pointerdown', dismissOutside)
    return () => {
      window.removeEventListener('resize', dismiss)
      window.removeEventListener('scroll', dismiss, true)
      document.removeEventListener('pointerdown', dismissOutside)
    }
  }, [preview])

  return (
    <button
      ref={triggerRef}
      type="button"
      className={styles.memory}
      style={{ aspectRatio: `${width} / ${height}` }}
      aria-label="Enlarge TroGen team photo"
      aria-expanded={preview !== null}
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') open()
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === 'mouse') close()
      }}
      onFocus={(event) => {
        if (event.currentTarget.matches(':focus-visible')) open()
      }}
      onBlur={close}
      onClick={(event) => {
        if (event.detail === 0 || window.matchMedia('(hover: none)').matches) {
          if (preview) close()
          else open()
        }
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') close()
      }}
    >
      <span
        ref={photoRef}
        className={styles.memoryPhoto}
        data-expanded={preview !== null}
        style={
          preview
            ? { left: preview.left, top: preview.top, width: preview.width, height: preview.height }
            : undefined
        }
      >
        <Image
          src={src}
          width={width}
          height={height}
          alt={alt}
          sizes="(max-width: 1000px) 96vw, 960px"
        />
      </span>
    </button>
  )
}
