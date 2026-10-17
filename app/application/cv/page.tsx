import Link from '@/components/Link'
import ApplicationMaterialLayout from '@/layouts/ApplicationMaterialLayout'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'CV',
  description: 'Academic CV covering education, research experience, and academic activities.',
})

export default function CVPage() {
  return (
    <ApplicationMaterialLayout title="CV">
      <p>Education, research experience, and academic activities.</p>
      <p>View the CV in your browser or download a PDF copy.</p>
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        <Link href="/static/files/cv.pdf">View CV (PDF)</Link>
        <Link href="/static/files/cv.pdf" download>
          Download CV
        </Link>
      </div>
    </ApplicationMaterialLayout>
  )
}
