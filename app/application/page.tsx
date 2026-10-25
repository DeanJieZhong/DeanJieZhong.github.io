import Link from '@/components/Link'
import ApplicationMaterialLayout from '@/layouts/ApplicationMaterialLayout'
import { genPageMetadata } from 'app/seo'
import styles from './Application.module.css'

export const metadata = genPageMetadata({
  title: 'Application',
  description:
    'CV, academic transcript, academic ranking, English language qualifications, and research summary for academic applications.',
})

const materials = [
  {
    id: 'cv',
    title: 'CV',
    href: '/application/cv',
    description: 'Education, research experience, and academic activities, with a downloadable CV.',
  },
  {
    id: 'transcript',
    title: 'Academic Transcript',
    href: '/application/academic-transcript',
    description: 'Academic records by year, including module credits, marks, and grading context.',
  },
  {
    id: 'ranking',
    title: 'Academic Ranking',
    href: '/application/academic-ranking',
    description: 'Programme cohort ranking, calculation basis, and the official ranking letter.',
  },
  {
    id: 'ielts',
    title: 'IELTS Transcript',
    href: '/application/ielts-transcript',
    description: 'English language test results and supporting documentation.',
  },
  {
    id: 'research',
    title: 'Research Summary',
    href: '/application/research-summary',
    description:
      'Research experience, individual contributions, technical skills, and future interests.',
  },
]

export default function ApplicationPage() {
  return (
    <ApplicationMaterialLayout title="Application" isOverview>
      <div className="not-prose grid grid-cols-1 gap-5">
        {materials.map((material) => (
          <section
            key={material.id}
            id={material.id}
            aria-labelledby={`${material.id}-heading`}
            className="scroll-mt-8"
          >
            <Link
              href={material.href}
              aria-labelledby={`${material.id}-heading`}
              aria-describedby={`${material.id}-description`}
              className={`${styles.materialCard} block p-6 no-underline sm:px-8`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h2
                  id={`${material.id}-heading`}
                  className="m-0 text-xl leading-snug font-semibold text-gray-900"
                >
                  {material.title}
                </h2>
                <span aria-hidden="true" className="text-primary-500 shrink-0">
                  →
                </span>
              </div>
              <p
                id={`${material.id}-description`}
                className="mt-3 mb-0 text-sm leading-6 text-gray-600"
              >
                {material.description}
              </p>
            </Link>
          </section>
        ))}
      </div>
    </ApplicationMaterialLayout>
  )
}
