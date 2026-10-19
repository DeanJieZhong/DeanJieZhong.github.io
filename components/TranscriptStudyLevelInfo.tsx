'use client'

import { Popover } from '@base-ui/react/popover'
import { X } from 'lucide-react'
import Link from '@/components/Link'

export default function TranscriptStudyLevelInfo() {
  return (
    <Popover.Root>
      <Popover.Trigger
        aria-label="About study levels and UK year equivalents"
        className="text-primary-500 hover:bg-primary-50 data-popup-open:bg-primary-100 absolute top-1/2 right-0 inline-flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full"
      >
        <svg aria-hidden="true" width={18} height={18} viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 0a10 10 0 1 1 0 20A10 10 0 0 1 10 0ZM10 4.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5ZM9 9v6h2V9H9Z"
          />
        </svg>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner
          side="bottom"
          align="start"
          sideOffset={8}
          collisionPadding={16}
          className="z-50"
        >
          <Popover.Popup className="not-prose w-80 max-w-[calc(100vw-2rem)] rounded-xl border border-gray-200 bg-white p-4 text-sm leading-6 text-gray-700 shadow-lg">
            <div className="mb-2 flex items-center justify-between gap-3">
              <Popover.Title className="font-semibold text-gray-900">Study level</Popover.Title>
              <Popover.Close
                aria-label="Close study level explanation"
                className="-mr-1 inline-flex size-8 cursor-pointer items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              >
                <X aria-hidden="true" size={17} strokeWidth={1.75} />
              </Popover.Close>
            </div>
            <Popover.Description>
              Stage 1 follows XJTLU’s{' '}
              <Link
                href="https://www.xjtlu.edu.cn/en/study/why-study-at-xjtlu/year-one"
                className="underline underline-offset-2"
              >
                Year One curriculum
              </Link>
              . UK year equivalents follow the{' '}
              <Link
                href="https://www.liverpool.ac.uk/media/livacuk/tqsd/collaborative-provision/xjtlu/01,XJTLU,Brief,Overview.pdf"
                className="underline underline-offset-2"
              >
                University of Liverpool’s programme structure
              </Link>
              .
            </Popover.Description>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  )
}
