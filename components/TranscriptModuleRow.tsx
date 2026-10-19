'use client'

import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { X } from 'lucide-react'
import type { TranscriptModule } from '@/data/transcriptData'

export default function TranscriptModuleRow({ module }: { module: TranscriptModule }) {
  const [expanded, setExpanded] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const detailsId = useId()
  const headingId = `${detailsId}-heading`
  const hasDetails = Boolean(module.assessments?.length || module.context?.length)

  function closeDetails() {
    setExpanded(false)
    triggerRef.current?.focus()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape' && expanded) {
      event.preventDefault()
      closeDetails()
    }
  }

  return (
    <>
      <tr>
        <td className="whitespace-nowrap">{module.period}</td>
        <th scope="row" className="px-2 py-2 text-left font-normal whitespace-nowrap">
          {module.code}
        </th>
        <td>{module.title}</td>
        <td className="text-right tabular-nums">{module.credits.toFixed(1)}</td>
        <td className="text-right font-medium whitespace-nowrap tabular-nums">
          <span className="relative inline-block pl-9">
            {hasDetails && (
              <button
                ref={triggerRef}
                type="button"
                aria-label={`Assessment details and context for ${module.code}`}
                aria-expanded={expanded}
                aria-controls={detailsId}
                title="Assessment details and context"
                onClick={() => setExpanded((current) => !current)}
                onKeyDown={handleKeyDown}
                className="text-primary-500 hover:bg-primary-50 aria-expanded:bg-primary-100 absolute top-1/2 left-0 inline-flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full"
              >
                <svg
                  aria-hidden="true"
                  width={18}
                  height={18}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 0a10 10 0 1 1 0 20A10 10 0 0 1 10 0ZM10 4.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5ZM9 9v6h2V9H9Z"
                  />
                </svg>
              </button>
            )}
            {module.mark}%
          </span>
        </td>
      </tr>
      {hasDetails && (
        <tr hidden={!expanded}>
          <td colSpan={5} className="px-0 pt-3 pb-5">
            <div
              id={detailsId}
              role="region"
              aria-labelledby={headingId}
              className="not-prose sticky left-0 w-[100cqi] max-w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm leading-6 text-gray-700 sm:p-5"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 id={headingId} className="font-semibold text-gray-900">
                  {module.code} · Assessment details
                </h3>
                <button
                  type="button"
                  aria-label={`Close assessment details for ${module.code}`}
                  onClick={closeDetails}
                  onKeyDown={handleKeyDown}
                  className="-mr-1 inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-900"
                >
                  <X aria-hidden="true" size={17} strokeWidth={1.75} />
                </button>
              </div>
              {module.context && (
                <section
                  aria-labelledby={`${detailsId}-context-heading`}
                  className="mb-4 border-b border-gray-200 pb-4"
                >
                  <h4
                    id={`${detailsId}-context-heading`}
                    className="mb-2 font-semibold text-gray-900"
                  >
                    Module context
                  </h4>
                  <div className="space-y-3">
                    {module.context.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              )}
              <dl className="divide-y divide-gray-200">
                {module.assessments?.map((assessment) => (
                  <div
                    key={assessment.title}
                    className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-2 py-4 first:pt-0 last:pb-0"
                  >
                    <dt>
                      <strong className="font-semibold text-gray-900">{assessment.title}</strong>{' '}
                      <span className="text-gray-500">
                        ({assessment.type}, {assessment.weight}% of module mark)
                      </span>
                    </dt>
                    <dd className="font-semibold text-gray-900 tabular-nums">
                      {assessment.mark}
                      <span className="font-normal text-gray-500">/100</span>
                    </dd>
                    {assessment.context && (
                      <dd className="col-span-2 space-y-3">
                        {assessment.context.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </dd>
                    )}
                  </div>
                ))}
              </dl>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}
