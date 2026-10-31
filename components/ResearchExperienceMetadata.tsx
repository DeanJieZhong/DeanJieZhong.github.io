import { Fragment } from 'react'
import Link from '@/components/Link'
import ScholarPopover from '@/components/ScholarPopover'
import scholarsData from '@/data/scholarsData'
import type { ScholarId } from '@/data/scholarsData'
import type { ResearchExperienceDetails, ResearchSupervisor } from '@/data/researchData'

const linkStyle = 'underline decoration-gray-400 underline-offset-4 focus-visible:outline-offset-4'

export function ResearchSupervisors({
  supervisors,
  id,
}: {
  supervisors: readonly ResearchSupervisor[]
  id?: string
}) {
  return (
    <p id={id}>
      {supervisors.length > 1 ? 'Supervisors: ' : 'Supervisor: '}
      {supervisors.map((supervisor, index) => {
        const label = [supervisor.name, supervisor.degree].filter(Boolean).join(', ')
        return (
          <Fragment key={supervisor.scholarId || supervisor.name}>
            {index > 0 &&
              (index === supervisors.length - 1
                ? supervisors.length > 2
                  ? ', and '
                  : ' and '
                : ', ')}
            {supervisor.scholarId ? (
              <ScholarPopover scholar={scholarsData[supervisor.scholarId]} />
            ) : supervisor.url ? (
              <Link href={supervisor.url} className={linkStyle}>
                {label}
              </Link>
            ) : (
              label
            )}
          </Fragment>
        )
      })}
    </p>
  )
}

export default function ResearchExperienceMetadata({
  experience,
  role,
  researchMentor,
  className = 'mt-4 space-y-1 text-sm leading-6 text-gray-600 dark:text-gray-300',
  children,
}: {
  experience: ResearchExperienceDetails
  role?: string
  researchMentor?: ScholarId
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div className={className}>
      {role && <p>Role: {role}</p>}
      <ResearchSupervisors supervisors={experience.supervisors} />
      {researchMentor && (
        <p>
          Research mentor: <ScholarPopover scholar={scholarsData[researchMentor]} />
        </p>
      )}
      {experience.affiliations.map((affiliation) => (
        <p key={affiliation.name || affiliation.url}>
          {affiliation.url ? (
            <Link href={affiliation.url} className={linkStyle}>
              {affiliation.name}
            </Link>
          ) : (
            affiliation.name
          )}
        </p>
      ))}
      {children}
    </div>
  )
}
