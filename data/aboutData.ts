import type { ResearchEntry } from './researchData'

export interface AboutPhoto {
  src: string
  alt: string
  width: number
  height: number
  caption?: string
}

export interface ResearchSummary {
  id: string
  institution: string
  role?: string
  period?: string
  researchQuestion?: string
  contribution?: string
  outcomes?: string[]
  // Use an existing Research entry with hasDetailPage enabled.
  projectId?: ResearchEntry['id']
}

export interface EducationRecord {
  id: string
  school: string
  degree?: string
  major?: string
  period?: string
  grades?: string
  ranking?: string
  courses?: string[]
  honors?: string[]
  scholarships?: string[]
  // Summer schools, exchanges, and further study belong to the relevant education record.
  additionalLearning?: string[]
}

export interface LanguageRecord {
  id: string
  name: string
  proficiency?: string
  contexts?: string[]
  examResults?: string[]
}

export interface TeachingRecord {
  id: string
  subject: string
  students?: string
  period?: string
  responsibilities?: string[]
  methods?: string[]
  outcomes?: string[]
}

export interface SportRecord {
  id: string
  sport: string
  experience?: string
  goals?: string[]
  achievements?: string[]
  photos?: AboutPhoto[]
}

export interface LegoWork {
  id: string
  title: string
  description?: string
  photos?: AboutPhoto[]
}

interface AboutData {
  // Keep the source dimensions so replacement photos retain their original proportions.
  // Omit to use the shared author avatar.
  portrait?: Pick<AboutPhoto, 'src' | 'width' | 'height'>
  research: ResearchSummary[]
  education: EducationRecord[]
  languages: LanguageRecord[]
  teaching: TeachingRecord[]
  sports: SportRecord[]
  lego: {
    introduction?: string
    featuredWorks: LegoWork[]
  }
}

// Add only confirmed content, in reading order; omit unknown optional fields.
// The author introduction remains in data/authors/default.mdx.
// Contact details remain in data/siteMetadata.js.
const aboutData: AboutData = {
  portrait: {
    // Original photo extracted from draft.key, slide 10 (IMG_8303.HEIC).
    src: '/static/images/about/portrait-8303.webp',
    width: 960,
    height: 1280,
  },
  research: [],
  education: [],
  languages: [
    {
      id: 'mandarin',
      name: 'Chinese (Mandarin)',
      proficiency: 'Native',
    },
    {
      id: 'english',
      name: 'English',
      proficiency: 'Advanced',
      examResults: [
        'IELTS overall: 8.0',
        'Listening: 8.0 · Reading: 8.5 · Writing: 7.0 · Speaking: 8.0',
      ],
    },
    {
      id: 'spanish',
      name: 'Spanish',
      proficiency: 'Basic',
    },
    {
      id: 'hakka',
      name: 'Chinese (Hakka)',
      proficiency: 'Intermediate',
    },
  ],
  teaching: [],
  sports: [],
  lego: { featuredWorks: [] },
}

export default aboutData
