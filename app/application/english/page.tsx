import ApplicationMaterialLayout from '@/layouts/ApplicationMaterialLayout'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'IELTS Transcript',
  description: 'English language test results and supporting documentation.',
})

export default function EnglishPage() {
  return (
    <ApplicationMaterialLayout title="IELTS Transcript">
      <p>English language qualifications and supporting documents.</p>
      <h2>Test results</h2>
      <p>English language test results and supporting documentation will be added here.</p>
    </ApplicationMaterialLayout>
  )
}
