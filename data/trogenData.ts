interface TrogenImage {
  src: string
  width: number
  height: number
  alt: string
  label?: string
}

export interface TrogenFigure {
  id: string
  label: string
  layout: 'single' | 'design' | 'comparison'
  images: TrogenImage[]
  captionTitle: string
  caption: string
  credit: string
}

interface TrogenSection {
  id: string
  title: string
  paragraphs?: string[]
  items?: { title: string; body: string }[]
  figure?: TrogenFigure
  subsections?: { id: string; title: string; paragraphs: string[]; figure?: TrogenFigure }[]
  links?: { label: string; url: string }[]
}

// Confirmed copy and captions: Obsidian Personal_Website/iGEM2025_TroGen.md, Draft 3.
const trogenData: {
  title: string
  summary: string
  photo: TrogenImage
  role: string
  participationPeriod: string
  pis: { name: string; url?: string }[]
  context: { name: string; url?: string }[]
  wiki: string
  overview: string[]
  conceptFigure: TrogenFigure
  sections: TrogenSection[]
} = {
  title: 'TroGen: A commensal bacterial platform for intracellular drug delivery in TNBC',
  summary:
    'A Top 10 undergraduate project at iGEM 2025, exploring tumor-associated bacteria for intracellular drug delivery in triple-negative breast cancer.',
  photo: {
    src: '/static/images/research/trogen/gemy_edited.png',
    width: 2827,
    height: 1590,
    alt: 'A bright green mascot among a crowd at an iGEM event.',
  },
  role: 'Research lead',
  participationPeriod: 'Feb–Nov 2025',
  pis: [
    {
      name: 'Yongtao Zhu, PhD',
      url: 'https://connect.xjtlu.edu.cn/user/zhulab',
    },
    { name: 'Kevin C. Chan, PhD' },
  ],
  context: [
    { name: 'iGEM 2025' },
    { name: 'XJTLU-Science-China', url: 'https://2025.igem.wiki/xjtlu-science-china/' },
    { name: 'Xi’an Jiaotong-Liverpool University' },
  ],
  wiki: 'https://2025.igem.wiki/xjtlu-science-china/',
  overview: [
    'I proposed intracellular microbiome engineering as TroGen’s central concept: could tumor-associated bacteria provide a starting point for delivering therapeutic payloads inside cancer cells? We explored this question in the context of triple-negative breast cancer.',
    'My main work was to develop bacteria–cell co-culture experiments using *Staphylococcus xylosus*, carry out the experiments, and interpret the measurements. I also investigated environmental sensing strategies and helped turn the project’s broader ideas into experimental questions.',
  ],
  conceptFigure: {
    id: 'trogen-figure-1',
    label: 'Figure 1 · Proposed project concept',
    layout: 'single',
    images: [
      {
        src: '/static/images/research/trogen/project-concept.webp',
        width: 6000,
        height: 3448,
        alt: 'TroGen concept schematic illustrating proposed intracellular payload delivery and environmental control functions.',
      },
    ],
    captionTitle: 'TroGen’s proposed concept.',
    caption:
      'The project explored tumor-associated bacteria as a starting point for intracellular payload delivery. This schematic illustrates intended functions, including payload release, tumor-cell lysis, and conditional bacterial survival. These functions were design goals and were not validated in this work.',
    credit: 'Project schematic: XJTLU-Science-China, iGEM 2025.',
  },
  sections: [
    {
      id: 'my-contribution',
      title: 'My contribution',
      items: [
        {
          title: 'Experimental work.',
          body: 'I developed co-culture workflows and performed mammalian cell and tumor-sphere culture, flow cytometry, and fluorescence imaging. For bacterial growth comparisons across oxygen and nitrate conditions, I contributed to design decisions about vessels, sample allocation, and evaporation, and took part in sampling.',
        },
        {
          title: 'Engineering design.',
          body: 'I led the design and selection of the FnBPA–sfGFP bicistronic expression strategy and developed a hypoxia-responsive regulation concept, followed by preliminary reporter characterization.',
        },
        {
          title: 'Analysis and collaboration.',
          body: 'I analyzed co-culture and imaging data in FlowJo, ImageJ, and Prism, maintained experimental records, sought expert advice, coordinated access to resources, and prepared scientific figures and presentations.',
        },
      ],
      figure: {
        id: 'trogen-figure-2',
        label: 'Figure 2 · Expression design',
        layout: 'design',
        images: [
          {
            src: '/static/images/research/trogen/fnbpa-sfgfp-design.jpeg',
            width: 3000,
            height: 2100,
            alt: 'Archived FnBPA–sfGFP bicistronic expression schematic showing the intended architecture of the strategy.',
          },
        ],
        captionTitle: 'FnBPA–sfGFP expression design.',
        caption:
          'Archived schematic of the bicistronic strategy I led in designing and selecting. It records the intended expression architecture; sfGFP fluorescence alone does not establish FnBPA protein expression or cell-wall localization.',
        credit:
          'Project schematic: XJTLU-Science-China, iGEM 2025. Strategy design and selection led by Jie Zhong.',
      },
    },
    {
      id: 'selected-findings',
      title: 'Selected findings',
      paragraphs: [
        'Our co-culture measurements showed differences in fluorescence-positive host-cell fractions across cell lines and between FnBPA-expressing bacteria and reporter controls. Initial reporter imaging also recorded higher fluorescence under hypoxia.',
        'These observations remain preliminary. Dye carry-over or transfer was not rigorously excluded, so fluorescence positivity cannot be equated directly with bacterial internalization. Independent culture replication could not be verified for the hypoxia-reporter imaging. The work did not establish therapeutic delivery or anticancer efficacy.',
      ],
    },
    {
      id: 'research-decisions',
      title: 'Research decisions',
      subsections: [
        {
          id: 'co-culture-assay',
          title: 'Building and revising the co-culture assay',
          paragraphs: [
            'Starting without an established co-culture protocol in our laboratory, I adapted published methods and sought advice on translating an organoid–bacteria approach to a two-dimensional cell assay.',
            'Early experiments exposed practical problems. Poor cell recovery led me to move from 12-well to six-well plates. I reduced the number of samples processed per run to make handling more timely, recording problems and revisions as the workflow developed.',
            'Weak sfGFP signals prompted a change in labeling. Following Kanghui Ruan’s recommendation, I compared sfGFP with CellTrace Far Red, performing the confocal imaging, ImageJ analysis, and interpretation. This comparison informed our subsequent use of CellTrace. High positive fractions persisted after additional washing, leaving questions about the source of the signal unresolved.',
          ],
          figure: {
            id: 'trogen-figure-3',
            label: 'Figure 3 · Evaluating the fluorescence label',
            layout: 'comparison',
            images: [
              {
                src: '/static/images/research/trogen/sfgfp-field-29.jpg',
                width: 512,
                height: 512,
                alt: 'Green sfGFP channel from confocal field 29, acquired on 9 September 2025.',
                label: 'A · sfGFP',
              },
              {
                src: '/static/images/research/trogen/celltrace-field-29.jpg',
                width: 512,
                height: 512,
                alt: 'CellTrace Far Red channel from the same confocal field, displayed in red.',
                label: 'B · CellTrace Far Red',
              },
              {
                src: '/static/images/research/trogen/merged-field-29.jpg',
                width: 512,
                height: 512,
                alt: 'Merged sfGFP and CellTrace Far Red channels from the same confocal field.',
                label: 'C · Merge',
              },
            ],
            captionTitle: 'Evaluating the fluorescence label.',
            caption:
              'An example field from my 9 September 2025 confocal comparison shows sfGFP (green), CellTrace Far Red (pseudocolored red), and the merged view. I performed image acquisition, ImageJ analysis, and interpretation. Acquisition settings differed between channels, so these views illustrate label assessment without providing a calibrated brightness comparison or evidence of bacterial internalization.',
            credit: 'Imaging and analysis: Jie Zhong.',
          },
        },
        {
          id: 'hypoxia-sensing',
          title: 'Choosing a hypoxia-sensing strategy',
          paragraphs: [
            'My SrrAB research raised concerns about broad regulatory effects and uncertainty about transferring the system between species. I investigated nreABC as a potentially more focused alternative and developed a regulation concept around it. This was a design decision based on research. I later carried out preliminary reporter imaging and analysis under contrasting oxygen conditions; downstream biosafety and therapeutic functions remained unvalidated.',
          ],
        },
      ],
    },
    {
      id: 'reflection',
      title: 'Reflection & next questions',
      paragraphs: [
        'I learned to design experiments from the ground up while taking responsibility for moving a research project forward. Making mistakes, revisiting decisions, and finding alternative approaches were part of that process: experimental design and project leadership developed together.',
        'The question I would most like to pursue concerns *S. xylosus* itself: what mechanisms might enable it to enter tumor cells, and what could explain its apparent selectivity across cell lines?',
      ],
    },
    {
      id: 'team-resources',
      title: 'People & resources',
      paragraphs: [
        'TroGen was developed with XJTLU-Science-China under Yongtao Zhu and Kevin C. Chan. My work benefited from Kanghui Ruan’s co-culture and labeling advice, Ziyang Lu’s flow cytometry support, Yongjie Sha’s experimental guidance, and Guang Cai’s support with cell and spheroid culture. Early discussions and a paper recommendation from Weiwei Dai also helped shape the project.',
      ],
      links: [
        {
          label: 'Project wiki',
          url: 'https://2025.igem.wiki/xjtlu-science-china/',
        },
        {
          label: 'Results',
          url: 'https://2025.igem.wiki/xjtlu-science-china/result/',
        },
        {
          label: 'Experiments',
          url: 'https://2025.igem.wiki/xjtlu-science-china/experiments/',
        },
        {
          label: 'Full attributions',
          url: 'https://teams.igem.org/wiki/5636/attributions',
        },
      ],
    },
  ],
}

export default trogenData
