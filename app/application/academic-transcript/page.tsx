import AcademicTranscript from '@/components/AcademicTranscript'
import ApplicationMaterialLayout from '@/layouts/ApplicationMaterialLayout'
import TranscriptPdfViewer from '@/components/TranscriptPdfViewer'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Academic Transcript',
  description:
    'Academic transcript with module credits, marks, weighted averages, and grading context.',
})

export default function TranscriptPage() {
  const transcriptPdf = '/static/files/academic-transcript.pdf'

  return (
    <ApplicationMaterialLayout title="Academic Transcript">
      <AcademicTranscript />
      <section aria-labelledby="grading-information-heading">
        <h2 id="grading-information-heading">Grading information</h2>
        <p>
          The transcript uses British marking criteria, with 40% as the undergraduate pass mark.
          Module marks are shown as percentages; additional learning grades are recorded as P.
        </p>
      </section>
      <section aria-labelledby="official-transcript-heading">
        <h2 id="official-transcript-heading">Official transcript</h2>
        <TranscriptPdfViewer src={transcriptPdf} />
      </section>
    </ApplicationMaterialLayout>
  )
}
