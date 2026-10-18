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
      <rect x="3" y="3" width="13" height="13" />
      <path d="m16 16 5 5" />
    </svg>
  )
}
