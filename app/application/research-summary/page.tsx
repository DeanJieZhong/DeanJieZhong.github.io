import ApplicationMaterialLayout from '@/layouts/ApplicationMaterialLayout'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Research Summary',
  description:
    'An overview of research experience, individual contributions, and future interests.',
})

export default function ResearchSummaryPage() {
  return (
    <ApplicationMaterialLayout title="Research Summary">
      <p>This summary is being prepared and will be added here.</p>
    </ApplicationMaterialLayout>
  )
}
