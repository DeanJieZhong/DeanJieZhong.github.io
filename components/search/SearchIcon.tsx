import type { SVGProps } from 'react'

export default function SearchIcon({
  size = 24,
  strokeWidth = 2,
  fillClassName,
  children,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number; fillClassName?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {fillClassName && (
        <rect
          x="3"
          y="3"
          width="13"
          height="13"
          fill="currentColor"
          stroke="none"
          className={fillClassName}
        />
      )}
      {children}
      <path
        d="M16 16V3H3V16H16"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="var(--home-search-ring, 0)"
        opacity="var(--home-search-ring-visible, 1)"
      />
      <path
        d="m16 16 5 5"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="var(--home-search-handle, 0)"
        opacity="var(--home-search-handle-visible, 1)"
      />
    </svg>
  )
}
