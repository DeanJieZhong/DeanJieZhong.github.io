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
      <PdfPreview src="/static/files/cv.pdf" title="CV PDF preview" />
    </ApplicationMaterialLayout>
  )
}
