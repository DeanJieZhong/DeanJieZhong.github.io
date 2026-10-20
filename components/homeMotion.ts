type Point = { x: number; y: number }
const SAMPLE_COUNT = 48
export const clamp = (value: number) => Math.min(1, Math.max(0, value))
export const ease = (value: number) => value * value * (3 - 2 * value)
export const easeTravel = (value: number) => value ** 3 * (value * (value * 6 - 15) + 10)
export const mix = (from: number, to: number, progress: number) => from + (to - from) * progress

export function drawSearchStroke(controls: HTMLElement, progress: number) {
  // Trace the box counterclockwise from its lower-right corner, then draw the handle.
  controls.style.setProperty('--home-search-ring', String(1 - clamp(progress / 0.82)))
  controls.style.setProperty('--home-search-handle', String(1 - clamp((progress - 0.82) / 0.18)))
  // Keep fully offset strokes hidden so their end caps cannot reveal the starting point.
  controls.style.setProperty('--home-search-ring-visible', progress > 0 ? '1' : '0')
  controls.style.setProperty('--home-search-handle-visible', progress > 0.82 ? '1' : '0')
}

// A scroll threshold starts a complete, critically damped transition, even after scrolling stops.
export function createSnapMorph(duration: number) {
  let value = 0
  let target: 0 | 1 = 0
  let from = 0
  let startedAt = 0

  return {
    get target() {
      return target
    },
    get moving() {
      return value !== target
    },
    update(next: 0 | 1, time: number, immediate = false) {
      if (immediate) {
        value = from = target = next
        startedAt = time
        return value
      }
      if (next !== target) {
        from = value
        target = next
        startedAt = time
      }
      const elapsed = clamp((time - startedAt) / duration)
      const damping = (1 - (1 + 8 * elapsed) * Math.exp(-8 * elapsed)) / (1 - 9 * Math.exp(-8))
      value = elapsed === 1 ? target : mix(from, target, damping)
      return value
    },
  }
}

// Match contour direction and starting corner so the curves do not twist as they square off.
export function sampleDot(path: SVGPathElement, bounds: DOMRect) {
  const dotBounds = path.getBoundingClientRect()
  const matrix = path.getScreenCTM()!
  const length = path.getTotalLength()
  const points = Array.from({ length: SAMPLE_COUNT }, (_, index) => {
    const point = path.getPointAtLength((index / SAMPLE_COUNT) * length).matrixTransform(matrix)
    return { x: point.x - bounds.left, y: point.y - bounds.top }
  })
  const minX = Math.min(...points.map((point) => point.x))
  const minY = Math.min(...points.map((point) => point.y))
  const width = Math.max(...points.map((point) => point.x)) - minX
  const height = Math.max(...points.map((point) => point.y)) - minY
  const corner = points.reduce((best, point, index) => {
    const score = (point.x - minX) / width + (point.y - minY) / height
    const previous = points[best]
    return score < (previous.x - minX) / width + (previous.y - minY) / height ? index : best
  }, 0)
  const ordered = [...points.slice(corner), ...points.slice(0, corner)]
  const area = ordered.reduce((sum, point, index) => {
    const next = ordered[(index + 1) % SAMPLE_COUNT]
    return sum + point.x * next.y - next.x * point.y
  }, 0)
  return {
    points: ordered,
    clockwise: area > 0,
    centerX: dotBounds.left + dotBounds.width / 2 - bounds.left,
    width: dotBounds.width,
  }
}

export function squarePoint(index: number, clockwise: boolean): Point {
  const distance = (index / SAMPLE_COUNT) * 4
  const side = Math.floor(distance)
  const offset = distance - side
  const point = [
    { x: offset, y: 0 },
    { x: 1, y: offset },
    { x: 1 - offset, y: 1 },
    { x: 0, y: 1 - offset },
  ][side]
  return clockwise ? point : { x: point.y, y: point.x }
}
