import scholarsData from './scholarsData'
import fjData from './fjData'
import { pageTitleSlug } from '../lib/pageTitleSlug'
import type { ScholarId } from './scholarsData'

export const researchExperiences = [
  {
    id: 'ism',
    title: 'Engineering for Cancer Immunotherapy',
    description: 'Research internship in cancer immunology.',
    italicTitleText: '',
    supervisors: [
      {
        name: 'Lianjun Zhang',
        degree: 'PhD',
        url: scholarsData['lianjun-zhang'].institutionalProfileUrl,
        scholarId: 'lianjun-zhang',
      },
    ],
    affiliations: [
      {
        name: 'Suzhou Institute of Systems Medicine, Chinese Academy of Medical Sciences & Peking Union Medical College',
      },
    ],
  },
  {
    id: 'igem-2025',
    title: 'iGEM',
    description: 'Top 10 undergraduate research at iGEM 2025 and subsequent advisory work.',
    italicTitleText: '',
    supervisors: [
      {
        name: 'Yongtao Zhu',
        degree: 'PhD',
        url: scholarsData['yongtao-zhu'].institutionalProfileUrl,
        scholarId: 'yongtao-zhu',
      },
      {
        name: 'Kevin Chun Chan',
        degree: 'PhD',
        url: scholarsData['kevin-chan'].institutionalProfileUrl,
        scholarId: 'kevin-chan',
      },
      {
        name: 'John Moraros',
        degree: 'MD, PhD',
        scholarId: 'john-moraros',
      },
    ],
    affiliations: [{ name: 'Xi’an Jiaotong-Liverpool University' }],
  },
  {
    id: 'f-johnsoniae',
    title: 'Motility Mechanisms in Flavobacterium johnsoniae',
    description: 'Bacterial gliding, surface interactions, and microscopy workflows.',
    italicTitleText: 'Flavobacterium johnsoniae',
    supervisors: [
      {
        name: 'Yongtao Zhu',
        degree: 'PhD',
        url: scholarsData['yongtao-zhu'].institutionalProfileUrl,
        scholarId: 'yongtao-zhu',
      },
    ],
    affiliations: [{ name: 'Xi’an Jiaotong-Liverpool University' }],
  },
] as const satisfies readonly ResearchExperienceDetails[]

export type ResearchExperience = (typeof researchExperiences)[number]['id']

export const researchTypes = {
  project: 'Research',
  perspective: 'Commentary',
  software: 'Development',
  advisory: 'Advisory',
} as const

export type ResearchType = keyof typeof researchTypes

export interface ResearchAffiliation {
  name?: string
  url?: string
}

export interface ResearchLink {
  label: string
  url: string
}

export interface ResearchSupervisor {
  name: string
  degree?: string
  url?: string
  scholarId?: ScholarId
}

export interface ResearchExperienceDetails {
  id: string
  title: string
  description: string
  italicTitleText?: string
  supervisors: readonly ResearchSupervisor[]
  affiliations: readonly ResearchAffiliation[]
}

export interface ResearchPhoto {
  src: string
  width: number
  height: number
  alt: string
  titlePlacement?: 'overlay' | 'lower'
  preparedCover?: boolean
}

export interface ResearchEntry {
  id: string
  experience: ResearchExperience
  type: ResearchType
  // Editorial prominence is independent of content type.
  level: 'primary' | 'supporting'
  researchTitle?: string
  name: string
  // Detail routes and title links are opt-in; list-only entries leave this unset.
  hasDetailPage?: boolean
  // List-specific presentation leaves existing detail-page titles unchanged.
  listTitle?: string
  listSummary?: string
  italicTitleText?: string
  articleType?: string
  journal?: string
  summary?: string
  photo?: ResearchPhoto
  role?: string
  researchMentor?: ScholarId
  advisoryDetails?: {
    roster: string
    team: ResearchLink
    institution: string
    supervisors: readonly Pick<ResearchSupervisor, 'name' | 'degree'>[]
  }
  contribution?: string
  relatedResearch?: ResearchLink
  // Actual participation dates, independent of the project's event or cohort year.
  participationPeriod?: string
  // Event/cohort label when exact participation dates have not been recorded.
  eventPeriod?: string
  status?: string
  milestones?: string[]
  publicLinks?: ResearchLink[]
}

// Entries appear in this order within each experience and level, regardless of type.
// Supporting work belongs to the experience, without implying a specific project dependency.
// Add future work to its experience here; the list and detail routes reuse these entries.
// Omit optional fields until content is confirmed.
const researchData: ResearchEntry[] = [
  {
    id: 'trogen',
    hasDetailPage: true,
    experience: 'igem-2025',
    type: 'project',
    level: 'primary',
    name: 'TroGen',
    listTitle: 'TroGen: A commensal bacterial platform for intracellular drug delivery in TNBC',
    listSummary: 'Exploring tumor-associated bacteria for intracellular drug delivery.',
    summary: 'Exploring tumor-associated bacteria for intracellular drug delivery.',
    role: 'Research lead',
    participationPeriod: 'Feb–Nov 2025',
  },
  {
    id: 'fj-gliding',
    hasDetailPage: true,
    experience: 'f-johnsoniae',
    type: 'project',
    level: 'primary',
    name: fjData.title,
    listTitle: fjData.title,
    italicTitleText: fjData.species,
    summary: 'Exploring the molecular basis of surface interactions in a model gliding bacterium.',
    role: 'Research lead',
    participationPeriod: 'Jan 2026–Present',
    status: 'Ongoing',
  },
  {
    id: 'cxcl13-fc',
    hasDetailPage: true,
    experience: 'ism',
    type: 'project',
    level: 'primary',
    name: 'CD8⁺ T Cell & Cytokine Engineering',
    listTitle: 'CD8⁺ T Cell & Cytokine Engineering',
    photo: {
      src: '/static/images/research/systems-medicine/flow-cover-hue-lowered.png',
      width: 5712,
      height: 2142,
      alt: 'A flow cytometer and a monitor displaying flow cytometry plots in the laboratory.',
    },
    summary:
      'Exploring cancer immunotherapy from a synthetic biology perspective by engineering T cells and immune signaling proteins to enhance antitumor immunity.',
    role: 'Research trainee',
    researchMentor: 'jiajia-wang',
    participationPeriod: 'Jan 2026–Present',
    status: 'Ongoing',
  },
  {
    id: 'rainbow-trace',
    hasDetailPage: true,
    experience: 'f-johnsoniae',
    type: 'software',
    level: 'supporting',
    name: 'Rainbow Trace',
    participationPeriod: 'Apr 2026',
    listTitle: 'Rainbow Trace: A Python workflow for bacterial motility visualization',
    summary:
      'A Python workflow adapted from an existing Fiji macro to apply consistent processing parameters across images from the same experiment and reduce repetitive manual processing.',
    contribution: 'Workflow adaptation and Python development',
    relatedResearch: {
      label: fjData.title,
      url: '/research/motility-mechanisms-in-flavobacterium-johnsoniae',
    },
  },
  {
    id: 'rainbow-tracker',
    hasDetailPage: true,
    experience: 'f-johnsoniae',
    type: 'software',
    level: 'supporting',
    name: 'Rainbow Tracker',
    participationPeriod: 'Jul 2026',
    listTitle: 'Rainbow Tracker: Tracking bacterial identities across microscopy frames',
    summary:
      'An experimental workflow for tracking bacterial identities across frames, with rules for contact, separation, missed detections, boundary crossings, and uncertain observations.',
    contribution: 'Tracking logic design and manual inspection',
    relatedResearch: {
      label: fjData.title,
      url: '/research/motility-mechanisms-in-flavobacterium-johnsoniae',
    },
  },
  {
    id: 'spotlight',
    hasDetailPage: true,
    experience: 'ism',
    type: 'perspective',
    level: 'primary',
    name: 'Genome-wide human T cell screens: barriers and design',
    articleType: 'Spotlight',
    journal: 'Trends in Cancer',
    summary:
      'A commentary on future paradigms for T cell screening, accepted by Trends in Cancer (IF 21.6).',
    role: 'Co-first author',
    status: 'Accepted',
    participationPeriod: 'Aug–Sep 2026',
  },
  {
    id: 'dogmaos',
    hasDetailPage: true,
    experience: 'igem-2025',
    type: 'advisory',
    level: 'supporting',
    name: 'DogmaOS',
    listTitle: 'Xi’an Jiaotong-Liverpool University iGEM Team 2026',
    role: 'Advisor',
    eventPeriod: 'iGEM 2026',
  },
  {
    id: 'flame',
    hasDetailPage: true,
    experience: 'igem-2025',
    type: 'advisory',
    level: 'supporting',
    name: 'FLAME',
    listTitle: 'Soochow University ICPI iGEM Team 2026',
    summary:
      'As an instructor for SUDA-ICPI-China, I worked with university leadership to establish Soochow University’s first iGEM team and secure funding.\nMy guidance focused on project design, experimental planning, and laboratory techniques.',
    photo: {
      src: '/static/images/research/soochow-university/cover.png',
      width: 6078,
      height: 1900,
      alt: 'The XJTLU and ICPI teams together at Soochow University, with Dean identified above the group.',
      preparedCover: true,
    },
    role: 'Instructor',
    eventPeriod: 'iGEM 2026',
    advisoryDetails: {
      roster: 'https://teams.igem.org/6428/roster',
      team: {
        label: 'SUDA-ICPI-China',
        url: 'https://2026.igem.wiki/suda-icpi-china/',
      },
      institution: 'International College of Pharmaceutical Innovation, Soochow University',
      supervisors: [{ name: 'Xinchen Teng', degree: 'PhD' }],
    },
  },
  {
    id: 'b-longum-pancreatic-cancer',
    hasDetailPage: true,
    experience: 'igem-2025',
    type: 'advisory',
    level: 'supporting',
    name: 'Bifidobacterium longum elicits anti-tumor immunity in pancreatic cancer',
    listTitle: 'Zhejiang University-University of Edinburgh Institute iGEM Team 2026',
    photo: {
      src: '/static/images/research/zhejiang-university/cover.png',
      width: 2776,
      height: 1041,
      alt: 'An online discussion with the Zhejiang University iGEM team alongside a fluorescence microscopy image.',
      titlePlacement: 'lower',
    },
    role: 'Advisor',
    eventPeriod: 'iGEM 2026',
  },
]

export function researchPageSlug(entry: ResearchEntry) {
  const title =
    entry.photo || entry.type === 'advisory' || entry.id === 'trogen' || entry.id === 'fj-gliding'
      ? entry.listTitle || entry.researchTitle || entry.name
      : entry.researchTitle?.trim() || entry.name
  return pageTitleSlug(title)
}

export const researchDetailEntries = researchData.filter((entry) => entry.hasDetailPage)

export default researchData
