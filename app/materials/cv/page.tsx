import PdfPreview from '@/components/PdfPreview'
import MaterialsLayout from '@/layouts/MaterialsLayout'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'CV',
  description: 'Academic CV covering education, research experience, and academic activities.',
})

export default function CVPage() {
  return (
    <MaterialsLayout title="CV">
      <p className="text-sm text-gray-500">
        Version: <time dateTime="2026-11-20">20 November 2026</time>
      </p>
      <PdfPreview src="/static/files/cv.pdf?v=2026-11-20" title="CV PDF preview" />
    </MaterialsLayout>
  )
}
