import researchData, { researchPageSlug } from './researchData'

// Homepage narrative introducing the project pages; bilingual copy lives in
// Obsidian's 003_Homepage_Design_and_Content.md. Keep preliminary results qualified.
export const homeIntroduction = [
  'I’m now a final-year undergrad studying biological sciences at Xi’an Jiaotong-Liverpool University. I like engineering biology to do things it wasn’t supposed to do. Sometimes it even works.',
]

export const homeProjectInvitation = 'Look what I’ve been doing.'

export const homeOutlook = {
  title: ['What’s', 'next?'],
  paragraphs: [
    'Looking back, exploring engineering applications of biological principles is what has been sustaining my curiosity. I’m now seeking a PhD in synthetic biology or bioengineering to pursue those ideas in depth and self-refine as an independent researcher.',
    'If we look further, I hope to stay closely involved in developing such systems throughout my career, ideally seeing direct benefits to the world. I’m open to academia, industry, entrepreneurship, or paths that bring them together.',
  ],
}

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
      'That interest took shape in iGEM 2025, when I conceived and led TroGen. I designed all genetic systems and experimental strategies, and carried out the bacteria–cell co-culture experiments and subsequent analyses. Our work culminated in a prototype chassis with validated TNBC cell invasiveness and hypoxia responsiveness.',
    ],
    awardsIntroduction: 'We won:',
    awards: [
      'Top 10 (among 190 undergrad teams)',
      'Best New Composite Part (sole undergrad winner)',
      'Nominated for Best Oncology Project & Best Wiki',
      'Gold Medal',
    ],
    memory: {
      src: '/static/images/home/trogen-team-selfie.jpeg',
      width: 4032,
      height: 3024,
      alt: 'TroGen team selfie at night with the Eiffel Tower in the background.',
    },
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
      'The complexity of cancer drove me to undertake an internship in immunology. Working with a PhD candidate, I have engineered T cells, produced cytokine fusion proteins, and conducted functional assays and adoptive T cell transfer experiments in mice. Our preliminary results showed that IL4–8Fc increased T cell activation and the proportion of granzyme B⁺ CD8 T cells in co-culture.',
    ],
    progressTitle: '',
    progress: '',
    note: '',
  },
  {
    id: 'fj-gliding',
    institutionLines: ['XJTLU'],
    title: ['Bacterial', 'Motility'],
    imageScale: 0.75,
    image: {
      src: '/static/images/research/fj-gliding/rainbow-temporal-projection.webp',
      width: 1824,
      height: 1216,
      alt: 'Temporal color projection showing bacterial movement across microscopy frames.',
      caption: 'Rainbow Trace representative result',
    },
    paragraphs: [
      'Meanwhile, I continued working with my iGEM supervisor Dr. Yongtao Zhu, studying bacterial motility.',
      'Flavobacterium johnsoniae glides without flagella, using surface proteins that travel along helical paths. How this motion is coordinated within colonies remains incompletely understood. I am developing fluorescence-based methods to distinguish migration from growth and track the surface adhesin SprB. This has involved refining strategies for labeling colony polysaccharides and tracking surface adhesins. I also developed Rainbow Trace to visualize motion and an early version of Rainbow Tracker to follow individual cells.',
    ],
    progressTitle: '',
    progress: '',
    note: '',
  },
  {
    id: 'dogmaos',
    institutionLines: ['XJTLU & partner teams'],
    title: ['Community', 'Engagement'],
    role: 'Advisor & Instructor',
    imageScale: 0.975,
    image: {
      src: '/static/images/home/dogmaos.jpg',
      width: 2400,
      height: 1600,
      alt: 'XJTLU-China dogmaOS team holding awards at iGEM 2026.',
      caption: 'The XJTLU-China dogmaOS team at iGEM 2026.',
    },
    paragraphs: [
      'I stayed involved in the iGEM community in the hope of giving others an experience as memorable as mine. Along the way, I made many like-minded friends, and we often stayed up late over hot pot.',
    ],
    advisoryTeams: [
      {
        id: 'dogmaos',
        title: 'Xi’an Jiaotong-Liverpool University, Advisor',
        description:
          'I helped the team turn early ideas into dogmaOS, advising on the concept and experimental plans while supporting recruitment and university sponsorship.',
        awardsIntroduction: 'I’m proud to say we won:',
        awards: [
          'Best Model (sole undergrad winner)',
          'Best Education (sole undergrad winner)',
          'Nominated for Best Measurement & Best Wiki',
          'Gold Medal',
        ],
      },
      {
        id: 'flame',
        title: 'Soochow University ICPI, Instructor',
        description:
          'I helped establish ICPI’s first iGEM team, secure 240,000 CNY in university funding, and guide the design and experiments for FLAME, which earned a Silver Medal.',
        awards: [],
      },
      {
        id: 'b-longum-pancreatic-cancer',
        title: 'Zhejiang University-University of Edinburgh Institute, Advisor',
        description:
          'I advised on project design, shared strains and plasmids, and provided laboratory guidance for the team’s bacterial cancer immunotherapy project, which earned a Gold Medal.',
        awards: [],
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
    awardsIntroduction: project.awardsIntroduction ?? '',
    memory: project.memory ?? null,
    awards: project.awards ?? [],
    role: project.role ?? entry.role,
    advisoryTeams: (project.advisoryTeams ?? []).map((team) => {
      const teamEntry = researchData.find((item) => item.id === team.id)!
      return { ...team, href: `/research/${researchPageSlug(teamEntry)}/` }
    }),
    href: `/research/${researchPageSlug(entry)}/`,
  }
})
