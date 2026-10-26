import { notFound } from 'next/navigation'
import { researchDetailEntries, researchPageSlug } from '@/data/researchData'
import trogenData from '@/data/trogenData'
import TrogenProject from '@/components/TrogenProject'
import fjData from '@/data/fjData'
import FjProject from '@/components/FjProject'
import PhotoResearchProject from '@/components/PhotoResearchProject'
import Cxcl13Article from '@/components/Cxcl13Article'
import XjtluAdvisory from '@/components/XjtluAdvisory'
import xjtluAdvisoryData from '@/data/xjtluAdvisoryData'
import { genPageMetadata } from 'app/seo'

interface ResearchPageProps {
  params: Promise<{ id: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return researchDetailEntries.map((entry) => ({ id: researchPageSlug(entry) }))
}

export async function generateMetadata({ params }: ResearchPageProps) {
  const { id } = await params
  const entry = researchDetailEntries.find((item) => researchPageSlug(item) === id)
  if (!entry) notFound()

  if (entry.id === 'trogen') {
    return genPageMetadata({
      title: trogenData.title,
      description: trogenData.summary,
      image: trogenData.photo.src,
      robots: { index: false, follow: false },
    })
  }

  if (entry.id === 'fj-gliding') {
    return genPageMetadata({
      title: fjData.title,
      description: fjData.summary,
      image: fjData.photo.src,
      robots: { index: false, follow: false },
    })
  }

  if (entry.id === 'dogmaos') {
    return genPageMetadata({
      title: entry.listTitle || entry.name,
      description: xjtluAdvisoryData.summary,
      image: xjtluAdvisoryData.photo.src,
      robots: { index: false, follow: false },
    })
  }

  if (entry.photo || entry.type === 'advisory') {
    return genPageMetadata({
      title: entry.listTitle || entry.researchTitle || entry.name,
      description: entry.summary,
      image: entry.photo?.src,
      robots: { index: false, follow: false },
    })
  }

  return genPageMetadata({
    title: entry.researchTitle?.trim() || entry.name,
    description: entry.summary || 'Research project details coming soon.',
    robots: { index: false, follow: false },
  })
}

export default async function ResearchPage({ params }: ResearchPageProps) {
  const { id } = await params
  const entry = researchDetailEntries.find((item) => researchPageSlug(item) === id)
  if (!entry) notFound()
  if (entry.id === 'trogen') return <TrogenProject />
  if (entry.id === 'fj-gliding') return <FjProject />
  if (entry.id === 'dogmaos') return <XjtluAdvisory title={entry.listTitle || entry.name} />
  if (entry.photo) {
    return (
      <PhotoResearchProject
        entry={entry}
        photo={entry.photo}
        showOverviewHeading={entry.id !== 'cxcl13-fc'}
      >
        {entry.id === 'cxcl13-fc' ? <Cxcl13Article /> : null}
      </PhotoResearchProject>
    )
  }

  // Keep unfinished research routes blank until their own content is ready.
  return null
}
