import AcademicTranscript from '@/components/AcademicTranscript'
import ApplicationMaterialLayout from '@/layouts/ApplicationMaterialLayout'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Academic Transcript',
  description:
    'Academic transcript with module credits, marks, weighted averages, and grading context.',
})

export default function TranscriptPage() {
  return (
    <ApplicationMaterialLayout title="Academic Transcript">
      <AcademicTranscript />
      <section aria-labelledby="academic-context-heading">
        <h2 id="academic-context-heading">Academic context</h2>
        <p>
          The transcript uses British marking criteria, with 40% as the undergraduate pass mark.
          Module marks are shown as percentages; additional learning grades are recorded as P.
        </p>
      </section>
    </ApplicationMaterialLayout>
  )
}
