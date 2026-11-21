import Link from '@/components/Link'
import MaterialsLayout from '@/layouts/MaterialsLayout'
import { genPageMetadata } from 'app/seo'
import styles from './Materials.module.css'

export const metadata = genPageMetadata({
  title: 'Materials',
  description:
    'CV, academic transcript, academic ranking, and English language qualifications for academic applications.',
})

const materials = [
  {
    id: 'cv',
    title: 'CV',
    href: '/materials/cv',
    description: 'Education, research experience, and academic activities, with a downloadable CV.',
  },
  {
    id: 'transcript',
    title: 'Academic Transcript',
    href: '/materials/academic-transcript',
    description: 'Academic records by year, including module credits, marks, and grading context.',
  },
  {
    id: 'ranking',
    title: 'Academic Ranking',
    href: '/materials/academic-ranking',
    description: 'Programme cohort ranking, calculation basis, and the official ranking letter.',
  },
  {
    id: 'ielts',
    title: 'IELTS Transcript',
    href: '/materials/ielts-transcript',
    description: 'English language test results and supporting documentation.',
  },
]

export default function MaterialsPage() {
  return (
    <MaterialsLayout title="Materials" isOverview>
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
    </MaterialsLayout>
  )
}
