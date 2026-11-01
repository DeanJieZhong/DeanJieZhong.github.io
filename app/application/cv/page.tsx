import PdfPreview from '@/components/PdfPreview'
import ApplicationMaterialLayout from '@/layouts/ApplicationMaterialLayout'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'CV',
  description: 'Academic CV covering education, research experience, and academic activities.',
})

export default function CVPage() {
  return (
    <ApplicationMaterialLayout title="CV">
      <p className="text-sm text-gray-500">
        Version: <time dateTime="2026-11-01">1 November 2026</time>
      </p>
      <PdfPreview src="/static/files/cv.pdf?v=2026-11-01" title="CV PDF preview" />
    </ApplicationMaterialLayout>
  )
}
