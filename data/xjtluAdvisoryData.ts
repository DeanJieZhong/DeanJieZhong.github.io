// Personal account confirmed on 2026-10-20 in Personal_Website/iGEM_advisory.md.
// Team name and Advisor role verified against the official team roster.
export interface AdvisoryPhoto {
  src: string
  width: number
  height: number
  alt: string
  caption: string
}

const photoRoot = '/static/images/research/xjtlu-advisory'

export const advisorySectionPhotos: Record<string, AdvisoryPhoto> = {
  'team-recruitment': {
    src: `${photoRoot}/recruitment-group.webp`,
    width: 2000,
    height: 1333,
    alt: 'Incoming and previous XJTLU iGEM members posing together in a classroom.',
    caption: 'Incoming and previous XJTLU iGEM members together during the recruitment period.',
  },
  'external-collaboration': {
    src: `${photoRoot}/icpi-xjtlu-exchange.webp`,
    width: 2000,
    height: 731,
    alt: 'The XJTLU and SUDA ICPI teams standing together in front of the ICPI wall sign.',
    caption:
      'The XJTLU–ICPI exchange meeting I helped bring about, where both teams shared their work and the challenges they were facing.',
  },
}

export const advisoryAdditionalPhotos: AdvisoryPhoto[] = [
  {
    src: `${photoRoot}/recruitment-session.webp`,
    width: 2000,
    height: 1333,
    alt: 'A recruitment information session with a presenter, a large screen, and a seated audience.',
    caption: 'A recruitment information session for incoming iGEM members.',
  },
  {
    src: `${photoRoot}/recruitment-moments.webp`,
    width: 2000,
    height: 1500,
    alt: 'An informal group photograph around a meeting-room table during the recruitment period.',
    caption: 'An informal moment with the team during the recruitment period.',
  },
  {
    src: `${photoRoot}/biochina.webp`,
    width: 2000,
    height: 1500,
    alt: 'The XJTLU team gathered beside a dogmaOS poster at BIOCHINA.',
    caption: 'Attending BIOCHINA together with the XJTLU team.',
  },
]

export const advisorySelectionSlides = {
  pdf: '/static/files/xjtlu-advisory/selection-slides.pdf',
  caption:
    'Four selected slides from the team’s early internal-selection presentation, which I helped prepare. They capture the proposed direction, the people involved, and the team’s preparation process.',
  pages: [
    {
      page: 1,
      originalSlide: 3,
      title: 'Project goal',
      src: `${photoRoot}/selection-slide-1.webp`,
      alt: 'Original slide 3: the team’s proposed protein-expression platform, illustrated through an insulin-production timeline.',
    },
    {
      page: 2,
      originalSlide: 17,
      title: 'Instructors & advisors',
      src: `${photoRoot}/selection-slide-2.webp`,
      alt: 'Original slide 17: the instructors and advisors, including Jie Zhong and his previous TroGen experience.',
    },
    {
      page: 3,
      originalSlide: 19,
      title: 'Early brainstorming',
      src: `${photoRoot}/selection-slide-3.webp`,
      alt: 'Original slide 19: the team’s early brainstorming activities, with a working-session photograph and notes.',
    },
    {
      page: 4,
      originalSlide: 21,
      title: 'Modeling discussions',
      src: `${photoRoot}/selection-slide-4.webp`,
      alt: 'Original slide 21: the team’s modeling work, with photographs of in-person and online discussions.',
    },
  ],
}

const xjtluAdvisoryData = {
  title: 'Xi’an Jiaotong-Liverpool University',
  role: 'Advisor',
  eventPeriod: 'iGEM 2026',
  team: 'XJTLU-China',
  project: 'dogmaOS',
  projectTitlePrefix: 'Translation–Folding Control for Protein Expression in',
  organism: 'Escherichia coli',
  photo: {
    src: `${photoRoot}/dogmaos_cover.png`,
    width: 1930,
    height: 908,
    alt: 'An early XJTLU team photograph with Dean identified by a label above the group.',
  },
  // Temporarily use TroGen's people and institution as the template, at the user's request.
  pis: [
    { name: 'Yongtao Zhu, PhD', url: 'https://connect.xjtlu.edu.cn/user/zhulab' },
    { name: 'Kevin C. Chan, PhD' },
  ],
  wiki: 'https://2026.igem.wiki/xjtlu-china/',
  summary:
    'Guiding project conceptualization and supporting recruitment and university sponsorship for XJTLU-China’s 2026 iGEM team.',
  introduction:
    'Drawing on my experience with XJTLU’s 2025 team, I advised XJTLU-China through early project development and continued conceptual discussions later in the season.',
  sections: [
    {
      id: 'project-direction',
      title: 'Rethinking project selection',
      paragraphs: [
        'Early discussions centered on choosing a problem and then finding a solution. I encouraged the team to also begin with a fundamental biological mechanism and explore what engineering it could make possible. This opened up another way to develop project ideas.',
        'We discussed earlier iGEM work on cell-free expression and considered several possibilities, including mitochondrial transplantation and editing. We set the mitochondrial directions aside because of their technical difficulty.',
      ],
    },
    {
      id: 'proposal-development',
      title: 'From translation regulation to a proposal',
      paragraphs: [
        'When the discussion turned to ribosomes and translation, I recalled a Tsinghua iGEM project from 2025 on regulating translation speed. It provided a starting point for exploring the direction that became dogmaOS.',
        'I worked with the team to assess feasibility, develop an experimental plan, identify candidate target proteins, and prepare presentation slides. This included late-night discussions in which I contributed experience and guidance as an advisor. The team presented the resulting project concept and passed the university’s internal selection for sponsorship.',
      ],
    },
    {
      id: 'team-recruitment',
      title: 'Team recruitment',
      paragraphs: [
        'As a member of the previous year’s team, I organized recruitment information sessions, prepared presentation materials, and participated in two rounds of interviews over two weeks.',
      ],
    },
    {
      id: 'external-collaboration',
      title: 'Continued advice & collaboration',
      paragraphs: [
        'During the middle and later stages of the project, I continued to advise on conceptual development and the overall research direction.',
        'I also facilitated an exchange meeting between XJTLU-China and SUDA ICPI, where both teams shared their work and the challenges they were facing.',
      ],
    },
  ],
  links: [
    { label: 'Official team roster', url: 'https://teams.igem.org/6096/roster' },
    { label: '2026 project wiki', url: 'https://2026.igem.wiki/xjtlu-china/' },
    {
      label: 'Related work: Tsinghua-A 2025 — pause-aware codon design',
      url: 'https://2025.igem.wiki/tsinghua-a/design',
    },
  ],
}

export default xjtluAdvisoryData
