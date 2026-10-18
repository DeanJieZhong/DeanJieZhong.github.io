import CopyTextButton from '@/components/CopyTextButton'
import Image from '@/components/Image'
import Link from '@/components/Link'
import ApplicationMaterialLayout from '@/layouts/ApplicationMaterialLayout'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'IELTS Transcript',
  description:
    'IELTS Academic results: overall band 8.0, CEFR C1. Test details and a redacted transcript.',
})

const transcriptPath = '/static/images/application/Redacted%20IELTS%20Transcript.png'

// Scores and dates are transcribed from the supplied report. The test format and
// venue were confirmed by the site owner; the origin field is not a test location.
const testDetails = [
  { label: 'Test type', value: 'IELTS Academic' },
  { label: 'Test format', value: 'IELTS on computer' },
  { label: 'Test centre', value: "Xi'an Jiaotong-Liverpool University" },
  { label: 'Location', value: 'Suzhou, China' },
  { label: 'Test date', value: '23 August 2026' },
  { label: 'Centre number', value: 'CX208' },
]

const scores = [
  { label: 'Overall band score', value: '8.0' },
  { label: 'Listening', value: '8.0' },
  { label: 'Reading', value: '8.5' },
  { label: 'Writing', value: '7.0' },
  { label: 'Speaking', value: '8.0' },
  { label: 'CEFR level', value: 'C1' },
]

const copyText = [...testDetails, ...scores]
  .map(({ label, value }) => `${label}: ${value}`)
  .join('\n')

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

        <h3 className="mt-7 text-base font-semibold text-gray-900">Band scores</h3>
        <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
          {scores.map(({ label, value }) => (
            <div key={label}>
              <dt className="text-sm text-gray-600">{label}</dt>
              <dd className="text-primary-500 m-0 mt-1 text-2xl font-semibold tabular-nums">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="ielts-transcript-heading">
        <h2 id="ielts-transcript-heading">Redacted IELTS Transcript</h2>
        <p>A public copy of the Test Report Form issued on 24 August 2026.</p>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          <Link href={transcriptPath} target="_blank" rel="noopener noreferrer">
            Open full-size image
          </Link>
          <Link href={transcriptPath} download="Redacted IELTS Transcript.png">
            Download PNG
          </Link>
        </div>
        <figure className="not-prose mt-6">
          <Link
            href={transcriptPath}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Redacted IELTS Transcript at full size"
            className="interaction-image block border border-gray-200"
          >
            <Image
              src={transcriptPath}
              alt="Redacted IELTS Transcript showing an overall band score of 8.0 and CEFR level C1."
              width={2479}
              height={3508}
              className="m-0 h-auto w-full"
              unoptimized
            />
          </Link>
        </figure>
      </section>
    </ApplicationMaterialLayout>
  )
}
