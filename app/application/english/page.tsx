import CopyTextButton from '@/components/CopyTextButton'
import Image from '@/components/Image'
import ApplicationMaterialLayout from '@/layouts/ApplicationMaterialLayout'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'IELTS Transcript',
  description:
    'IELTS Academic results: overall band 8.0. Test details, detailed scores and a redacted transcript.',
})

const transcriptPath = '/static/images/application/Redacted%20IELTS%20Transcript.png'

// Scores and dates are transcribed from the supplied report. The test format and
// venue were confirmed by the site owner; the origin field is not a test location.
const testDetails = [
  { label: 'Test type', value: 'IELTS Academic' },
  { label: 'Test format', value: 'IELTS on computer' },
  { label: 'Test centre & location', value: "Xi'an Jiaotong-Liverpool University, Suzhou, China" },
  { label: 'Test date', value: '23 August 2026' },
]

type Score = {
  label: string
  value: string
  breakdown: {
    title?: string
    criteria: { label: string; value: string }[]
  }[]
}

// Detailed marks are from the British Council's score breakdown dated 21 September 2026.
const scores: Score[] = [
  { label: 'Overall', value: '8.0', breakdown: [] },
  {
    label: 'Listening',
    value: '8.0',
    breakdown: [{ criteria: [{ label: 'Raw score', value: '35 / 40' }] }],
  },
  {
    label: 'Reading',
    value: '8.5',
    breakdown: [{ criteria: [{ label: 'Raw score', value: '38 / 40' }] }],
  },
  {
    label: 'Writing',
    value: '7.0',
    breakdown: [
      {
        title: 'Task 1',
        criteria: [
          { label: 'Task achievement', value: '5' },
          { label: 'Coherence and cohesion', value: '7' },
          { label: 'Lexical resource', value: '8' },
          { label: 'Grammatical range and accuracy', value: '8' },
        ],
      },
      {
        title: 'Task 2',
        criteria: [
          { label: 'Task response', value: '7' },
          { label: 'Coherence and cohesion', value: '6' },
          { label: 'Lexical resource', value: '7' },
          { label: 'Grammatical range and accuracy', value: '7' },
        ],
      },
    ],
  },
  {
    label: 'Speaking',
    value: '8.0',
    breakdown: [
      {
        criteria: [
          { label: 'Fluency and coherence', value: '8' },
          { label: 'Lexical resource', value: '8' },
          { label: 'Grammatical range and accuracy', value: '8' },
          { label: 'Pronunciation', value: '8' },
        ],
      },
    ],
  },
]

const copyText = [
  ...testDetails.map(({ label, value }) => `${label}: ${value}`),
  '',
  'Band scores',
  ...scores.flatMap(({ label, value, breakdown }) => [
    `${label}: ${value}`,
    ...breakdown.flatMap(({ title, criteria }) =>
      criteria.map(({ label, value }) => `  ${title ? `${title} — ` : ''}${label}: ${value}`)
    ),
  ]),
].join('\n')

export default function EnglishPage() {
  return (
    <ApplicationMaterialLayout title="IELTS Transcript">
      <p>IELTS Academic results and a redacted copy of the official Test Report Form.</p>

      <section aria-labelledby="ielts-details-heading" className="not-prose mt-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 id="ielts-details-heading" className="text-xl font-semibold text-gray-900">
            Test details
          </h2>
          <CopyTextButton text={copyText} />
        </div>

        <dl className="mt-5 divide-y divide-gray-200 border-y border-gray-200">
          {testDetails.map(({ label, value }) => (
            <div key={label} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <dt className="text-sm text-gray-600">{label}</dt>
              <dd className="m-0 text-base text-gray-900">{value}</dd>
            </div>
          ))}
        </dl>

        <h3 id="ielts-scores-heading" className="mt-7 text-base font-semibold text-gray-900">
          Band scores
        </h3>
        <ul
          aria-labelledby="ielts-scores-heading"
          className="mt-4 divide-y divide-gray-200 border-y border-gray-200"
        >
          {scores.map(({ label, value, breakdown }) => (
            <li
              key={label}
              className="grid grid-cols-[6rem_minmax(0,1fr)] gap-x-4 py-5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-x-6"
            >
              <dl>
                <dt className="text-sm text-gray-600">{label}</dt>
                <dd className="text-primary-500 m-0 mt-1 text-2xl font-semibold tabular-nums">
                  {value}
                </dd>
              </dl>
              {breakdown.length > 0 && (
                <div
                  className={`grid content-start gap-y-5 sm:gap-x-12 ${breakdown.length > 1 ? 'sm:grid-cols-2' : ''}`}
                >
                  {breakdown.map(({ title, criteria }) => (
                    <div key={title ?? label}>
                      {title && (
                        <h4 className="mb-3 text-sm font-semibold text-gray-900">{title}</h4>
                      )}
                      <dl className="space-y-2">
                        {criteria.map(({ label, value }) => (
                          <div key={label} className="flex items-baseline gap-2 text-sm">
                            <dt className="text-gray-600">{label}</dt>
                            <dd className="m-0 shrink-0 font-medium text-gray-900 tabular-nums">
                              {value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="ielts-transcript-heading">
        <h2 id="ielts-transcript-heading">Redacted IELTS Transcript</h2>
        <figure className="not-prose mt-6">
          <Image
            src={transcriptPath}
            alt="Redacted IELTS Transcript showing an overall band score of 8.0."
            width={2479}
            height={3508}
            className="m-0 h-auto w-full border border-gray-200"
            unoptimized
          />
        </figure>
      </section>

      <section aria-labelledby="ielts-breakdown-heading">
        <h2 id="ielts-breakdown-heading">IELTS Score Breakdown</h2>
        <figure className="not-prose mt-6">
          <Image
            src="/static/images/application/IELTS%20Score%20Breakdown.svg"
            alt="Original listening, reading, writing and speaking score tables from the British Council email dated 21 September 2026. The detailed marks are also listed in Band scores above."
            width={506}
            height={286}
            className="m-0 h-auto w-full border border-gray-200"
            unoptimized
          />
        </figure>
      </section>
    </ApplicationMaterialLayout>
  )
}
