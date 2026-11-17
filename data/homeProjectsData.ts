import researchData, { researchPageSlug } from './researchData'

// Homepage excerpts from the existing project pages; bilingual copy lives in
// Obsidian's 003_Homepage_Design_and_Content.md. Keep preliminary results qualified.
export const homeIntroduction = [
  'I’m now a final-year undergrad studying biological sciences at Xi’an Jiaotong-Liverpool University. I like engineering biology to do things it wasn’t supposed to do. Sometimes it even works.',
]

export const homeProjectInvitation = 'Look what I’ve been doing.'

const homeProjects = [
  {
    id: 'trogen',
    institutionLines: ['XJTLU'],
    title: ['TroGen'],
    imageScale: 1.25,
    image: {
      src: '/static/images/research/trogen/project-concept.webp',
      width: 6000,
      height: 3448,
      alt: 'Proposed TroGen concept showing bacterial payload delivery in a hypoxic tumor microenvironment and control in normal tissue.',
      caption: 'Proposed concept.',
    },
    paragraphs: [
      'I conceived and led TroGen, exploring engineered commensal bacteria as intracellular delivery vehicles for triple-negative breast cancer. I designed the genetic systems and experimental strategy, and developed bacteria–cell assays to investigate invasion and hypoxia-responsive expression.',
    ],
    awards: [
      'Top 10 — 10 of 190 undergraduate teams worldwide (top 5.3%).',
      'Best New Composite Part — sole undergraduate winner in the category.',
      'Best Oncology Project nominee — shortlisted across undergraduate and overgraduate teams.',
      'Best Wiki nominee — undergraduate award shortlist.',
      'Gold Medal — highest medal tier; all Bronze and Silver criteria plus excellence in three selected areas.',
    ],
    progressTitle: '',
    progress: '',
    note: '',
  },
  {
    id: 'cxcl13-fc',
    institutionLines: ['ISM, CAMS & PUMC'],
    title: ['T Cell &', 'Cytokine', 'Engineering'],
    imageScale: 1.5,
    image: {
      src: '/static/images/home/il4-8fc-mechanism.png',
      width: 1920,
      height: 1080,
      alt: 'Proposed IL4–8Fc mechanism linking IL4-mediated CD8 T cell enhancement with IL8-mediated neutrophil recruitment, alongside functional characterization plots.',
      caption: 'Proposed Mechanism and Functional Characterization of IL4–8Fc',
    },
    paragraphs: [
      'In 2026, I joined Dr. Lianjun Zhang’s lab at the Suzhou Institute of Systems Medicine to explore cancer immunotherapy through CD8 T cell and cytokine engineering.',
      'Working with Jiajia Wang, I contribute to cytokine fusion-protein production, functional assays and immune-cell co-cultures. The projects investigate IL4–IL8 cooperation, CXCL13/CXCR5-mediated recruitment and synthetic TGFβ receptor signaling.',
    ],
    progressTitle: 'What I’m investigating',
    progress:
      'How engineered immune signals can support T cell function and cooperation with other immune cells. My experimental work includes protein purification, neutrophil isolation and flow-cytometry readouts.',
    note: 'Ongoing · January 2026–present',
  },
  {
    id: 'fj-gliding',
    institutionLines: ['XJTLU'],
    title: ['Bacterial', 'Motility'],
    image: {
      src: '/static/images/research/fj-gliding/rainbow-temporal-projection.webp',
      width: 1824,
      height: 1216,
      alt: 'Temporal color projection showing bacterial movement across microscopy frames.',
      caption: 'Rainbow Trace · Temporal color projection of bacterial movement',
    },
    paragraphs: [
      'How does a bacterium glide across a surface? I investigate motility in Flavobacterium johnsoniae, connecting surface-protein motion with cell movement and colony organization.',
      'I designed and tested fluorescence-labeling and microscopy workflows, proposed HA-tag labeling for the surface adhesin SprB, and developed Rainbow Trace and Rainbow Tracker to visualize movement and compare tracking strategies.',
    ],
    progressTitle: 'What I’m developing',
    progress:
      'Experimental readouts and computational tools for studying gliding. Rainbow Trace produces temporal color projections; labeling methods and tracking accuracy are still being validated.',
    note: 'Undergraduate researcher · January 2026–present',
  },
  {
    id: 'dogmaos',
    institutionLines: ['XJTLU & partner teams'],
    title: ['Supporting', 'Our Next', 'Generation'],
    imageScale: 1.3,
    image: {
      src: '/static/images/research/xjtlu-advisory/recruitment-group.webp',
      width: 2000,
      height: 1333,
      alt: 'Incoming and previous XJTLU iGEM members together during recruitment.',
      caption: 'Supporting the next generation at XJTLU and sharing experience with other teams.',
    },
    paragraphs: ['During 2026, I also took on mentorship roles with three iGEM teams.'],
    advisoryTeams: [
      {
        id: 'dogmaos',
        title: 'XJTLU-China, Advisor',
        description:
          'I helped our next iGEM generation develop dogmaOS, a project exploring translation–folding control for protein expression in Escherichia coli. As an advisor, I shaped the early concept and experimental plans and supported team recruitment and university sponsorship.',
        awards: [
          'Best Model (1/281, sole undergrad winner)',
          'Best Education (1/281, sole undergrad winner)',
          'Nominated for Best Measurement & Best Wiki',
          'Gold Medal',
        ],
      },
      {
        id: 'flame',
        title: 'SUDA-ICPI-China, Instructor',
        description:
          'For FLAME, ICPI’s first iGEM project, I helped establish the team and secure university funding, then guided project design, experimental planning and laboratory techniques as an instructor.',
        awards: ['Silver Medal'],
      },
      {
        id: 'b-longum-pancreatic-cancer',
        title: 'Zhejiang University team, Advisor',
        description:
          'The team explored Bifidobacterium longum for antitumor immunity in pancreatic cancer. Drawing on TroGen, I advised on project and experimental design and provided laboratory guidance, strains and plasmids.',
        awards: ['Gold Medal'],
      },
    ],
    progressTitle: '',
    progress: '',
    note: '',
  },
]

export default homeProjects.map((project) => {
  const entry = researchData.find((entry) => entry.id === project.id)
  const label = entry?.participationPeriod || entry?.eventPeriod
  if (!entry?.hasDetailPage || !label) {
    throw new Error(`Missing homepage project route or participation dates: ${project.id}`)
  }
  return {
    ...project,
    label,
    imageScale: project.imageScale ?? 1,
    awards: project.awards ?? [],
    role: project.advisoryTeams ? 'Advisor & Instructor' : entry.role,
    advisoryTeams: (project.advisoryTeams ?? []).map((team) => {
      const teamEntry = researchData.find((item) => item.id === team.id)!
      return { ...team, href: `/research/${researchPageSlug(teamEntry)}/` }
    }),
    href: `/research/${researchPageSlug(entry)}/`,
  }
})
