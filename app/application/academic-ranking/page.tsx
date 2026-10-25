import PdfPreview from '@/components/PdfPreview'
import academicRankingData from '@/data/academicRankingData'
import ApplicationMaterialLayout from '@/layouts/ApplicationMaterialLayout'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Academic Ranking',
  description:
    'Programme cohort ranking, calculation basis, and the official academic ranking letter.',
})

export default function AcademicRankingPage() {
  return (
    <ApplicationMaterialLayout title="Academic Ranking">
      <dl className="not-prose mb-8 space-y-4">
        <div className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-6">
          <dt className="text-sm text-gray-600">Programme</dt>
          <dd className="m-0 text-base text-gray-900">{academicRankingData.programme}</dd>
        </div>
        <div className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-6">
          <dt className="text-sm text-gray-600">Institution</dt>
          <dd className="m-0 text-base text-gray-900">{academicRankingData.institution}</dd>
        </div>
        <div className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-6">
          <dt className="text-sm text-gray-600">Programme cohort rank</dt>
          <dd className="m-0 text-base text-gray-900">
            <strong className="font-semibold tabular-nums">
              {academicRankingData.rank} out of {academicRankingData.cohortSize}
            </strong>{' '}
            students
          </dd>
        </div>
        <div className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-6">
          <dt className="text-sm text-gray-600">Cut-off date</dt>
          <dd className="m-0 text-base text-gray-900">
            <time dateTime={academicRankingData.cutOffDate}>
              {academicRankingData.cutOffDateLabel}
            </time>
          </dd>
        </div>
        <div className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-6">
          <dt className="text-sm text-gray-600">Letter issued</dt>
          <dd className="m-0 text-base text-gray-900">
            <time dateTime={academicRankingData.issuedOn}>{academicRankingData.issuedOnLabel}</time>
          </dd>
        </div>
      </dl>

      <section aria-labelledby="ranking-basis-heading">
        <h2 id="ranking-basis-heading">Ranking basis</h2>
        <p>
          Calculated annually among students in the same {academicRankingData.programme} programme
          and cohort, using the overall weighted average recorded on the official academic
          transcript up to the cut-off date.
        </p>
      </section>

      <section aria-labelledby="official-ranking-heading">
        <h2 id="official-ranking-heading">Official ranking letter</h2>
        <PdfPreview
          src="/static/files/academic-ranking.pdf"
          title="Official academic ranking letter PDF preview"
        />
      </section>
    </ApplicationMaterialLayout>
  )
}
