import researchData, { researchExperiences, researchPageSlug } from './researchData'

// Homepage excerpts from the existing project pages; bilingual copy lives in
// Obsidian's 003_Homepage_Design_and_Content.md. Keep preliminary results qualified.
export const homeIntroduction = [
  'I’m now a final-year undergrad studying biological sciences at Xi’an Jiaotong-Liverpool University. I like engineering biology to do things it wasn’t supposed to do. Sometimes it even works.',
]

export const homeProjectInvitation = 'Look what I’ve been doing.'

const homeProjects = [
  {
    id: 'trogen',
    label: 'iGEM - 2025',
    title: ['TroGen'],
    image: {
      src: '/static/images/research/trogen/project-concept.webp',
      width: 6000,
      height: 3448,
      alt: 'Proposed TroGen concept showing bacterial payload delivery in a hypoxic tumor microenvironment and control in normal tissue.',
      caption: 'Proposed concept. Illustration by Shuning Dong.',
    },
    paragraphs: [
      'In 2025, I conceived and led TroGen, a project exploring engineered commensal bacteria as intracellular delivery vehicles for triple-negative breast cancer.',
      'I led the genetic system design and experimental strategy, developed bacteria–cell co-culture assays, and carried out flow cytometry and confocal imaging. Our work connected bacterial–cell interactions, restriction–modification system bypass and hypoxia-responsive regulation.',
    ],
    progressTitle: 'What we built',
    progress:
      'Engineered bacterial strains and preliminary co-culture and reporter data. Reporter fluorescence was higher under low oxygen; intracellular payload delivery and anticancer efficacy remained to be validated.',
    note: 'Top 10 undergraduate team · iGEM 2025',
  },
  {
    id: 'cxcl13-fc',
    label: 'Intern - Ongoing',
    title: ['T Cell & Cytokine', 'Engineering'],
    imageScale: 1.2,
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
    label: 'Research - Ongoing',
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
]

export default homeProjects.map((project) => {
  const entry = researchData.find((entry) => entry.id === project.id)
  if (!entry?.hasDetailPage) throw new Error(`Missing homepage project route: ${project.id}`)
  const experience = researchExperiences.find((experience) => experience.id === entry.experience)
  return {
    ...project,
    imageScale: project.imageScale ?? 1,
    institutionLines: experience?.affiliations[0]?.name.split(', ') ?? [],
    role: entry.role,
    href: `/research/${researchPageSlug(entry)}/`,
  }
})
