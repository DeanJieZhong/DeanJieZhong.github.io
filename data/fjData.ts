export interface FjSection {
  id: string
  title: string
  paragraphs: string[]
  href?: string
  figures?: { id: string; afterParagraph: number }[]
}

interface FjResearchArea {
  id: string
  title: string
  sections: FjSection[]
}

interface FjProjectData {
  title: string
  titlePrefix: string
  species: string
  summary: string
  photo: { src: string; width: number; height: number; alt: string }
  role: string
  institution: string
  participationPeriod: string
  overview: FjSection
  researchAreas: FjResearchArea[]
}

// Content updated from the user’s reviewed Obsidian annotations.
const fjData: FjProjectData = {
  title: 'Motility Mechanisms in Flavobacterium johnsoniae',
  titlePrefix: 'Motility Mechanisms in',
  species: 'Flavobacterium johnsoniae',
  summary:
    'Developing fluorescence imaging methods and computational tools to investigate gliding motility in Flavobacterium johnsoniae.',
  photo: {
    src: '/static/images/research/fj-gliding/colony.png',
    width: 4776,
    height: 2687,
    alt: 'Microscopy image of a colony edge for the FJ gliding project.',
  },
  role: 'Undergraduate researcher',
  institution: 'Xi’an Jiaotong-Liverpool University',
  participationPeriod: 'Jan 2026–Present',
  overview: {
    id: 'research-context',
    title: 'Research context and role',
    paragraphs: [
      '*Flavobacterium johnsoniae* is a model organism for studying gliding motility and polysaccharide utilization in Bacteroidota (formerly Bacteroidetes). Its type IX secretion system (T9SS), characteristic of this bacterial phylum, exports surface adhesins and enzymes involved in extracellular polymer degradation. This machinery connects surface movement with access to complex nutrients, although secretion and gliding are distinct functions: some bacteria retain a T9SS without being motile ([McBride et al., 2009](https://pmc.ncbi.nlm.nih.gov/articles/PMC2772454/); [Johnston et al., 2018](https://pmc.ncbi.nlm.nih.gov/articles/PMC5738736/)).',
      'In the helical-track model of gliding, the surface adhesin SprB moves along helical paths around the cell. When SprB engages the underlying surface, its motion generates traction that translates and rotates the bacterium ([Nakane et al., 2013](https://pubmed.ncbi.nlm.nih.gov/23781102/)). The animation below illustrates this relationship: pink dotted paths represent the routes of SprB motion, and turquoise spheres represent SprB. The project connects this protein-level mechanism with cell movement and the organization of bacterial colonies.',
      'Our three-person team comprises Dean Jie Zhong, Shuning Dong, and Shulei He. I conceived and led development of the founder-equivalent mass approach, designed and performed the fluorescence-labeling and microscopy trials, proposed HA-tag labeling for SprB, and led anti-GFP labeling trials on existing fusion strains. I also explored colony polysaccharide staining, redesigned the observation chamber to improve hydration, and developed the Rainbow Trace and Rainbow Tracker analysis tools. Shuning leads genetic engineering, including the HA-tag construction; Shulei focuses on bioinformatics and protein work.',
      'The project is currently at the stage of developing and testing measurement methods. Labeling trials have exposed constraints on cell-associated signal, growth, and sample hydration, while raising questions about fusion-protein stability. These observations have guided successive changes in experimental design. Rainbow Trace produces usable temporal color projections, while Rainbow Tracker has supported comparisons of tracking strategies on research videos. The experimental readouts and tracking accuracy still require further validation.',
    ],
    figures: [
      {
        id: 'fj-video-1',
        afterParagraph: 1,
      },
    ],
  },
  researchAreas: [
    {
      id: 'migration-proliferation',
      title: 'Distinguishing migration from proliferation',
      sections: [
        {
          id: 'founder-question',
          title: 'Research question & approach',
          paragraphs: [
            'A nutrient may support cell proliferation and, if it acts as a chemoattractant, also elicit directed migration. If bacteria accumulate toward a candidate attractant, increased cell numbers alone cannot establish whether they moved toward it or proliferated faster there. I therefore asked how to detect directional redistribution of a bacterial population while reducing the confounding contribution of nutrient-supported proliferation.',
            'I proposed a fluorescence-based founder-equivalent mass approach: label an initial population and follow where its fluorescence subsequently goes. Conceptually, one labeled founder may produce two, four, or more descendants, but those descendants share the original label rather than each contributing a new founder’s worth of signal. Tracking the distribution and centroid of that fluorescence could therefore reveal redistribution of the initial population without counting local proliferation as equivalent new signal. This working model assumes that the label partitions between daughter cells without generating new label, with losses through bleaching, leakage, or degradation characterized during method development.',
          ],
        },
        {
          id: 'founder-contribution',
          title: 'My contribution',
          paragraphs: [
            'I originated the measurement concept and led its experimental development, designing the labeling and imaging trials and carrying out the microscopy. I developed the proposed fluorescence-weighted analysis, tested CellTrace and alternative staining conditions, and evaluated whether the signal represented the bacteria of interest without disrupting colony growth or organization.',
          ],
        },
        {
          id: 'founder-progress',
          figures: [
            {
              id: 'fj-figure-1',
              afterParagraph: 1,
            },
            {
              id: 'fj-figure-2',
              afterParagraph: 3,
            },
          ],
          title: 'Experimental progress and decisions',
          paragraphs: [
            'The proposed readout integrates fluorescence across image pixels and follows its spatial centroid, reducing dependence on identifying every bacterium.',
            'I initially chose CellTrace Far Red because it had produced bright, clearly resolved individual staphylococci in the TroGen project. In F. johnsoniae, however, the retained fluorescence followed the circular footprint of the inoculated droplet (Fig. 1). During bright-field observation, bacteria were visible beyond that footprint as the colony expanded, but they were not detectably labeled; that outward expansion was not captured in the saved image. I considered cell-envelope differences between Gram-positive staphylococci and Gram-negative F. johnsoniae, as well as possible labeling of free proteins in the medium, as explanations to investigate. The fluorescence could not be assumed to represent the migrating cells.',
            'This mismatch prompted a switch to SYTO9, a widely used nucleic acid stain suitable for both Gram-positive and Gram-negative bacteria ([SYTO stain documentation](https://www.thermofisher.com/TFS-Assets/LSG/manuals/mp07572.pdf)). The immediate goal was to obtain detectable cell-associated fluorescence and test compatibility with growth before evaluating whether any label could support the founder-equivalent readout.',
            'I compared SYTO9 and PI staining conditions, varying staining timing, concentration, and sample handling. Earlier SYTO9 trials showed a tradeoff between colony growth and detectable fluorescence after prestaining, motivating a finer concentration series and more consistent preparation. On 5 August, prestaining at 0.625–5 μM produced fluorescence but no colony growth, whereas the unstained control grew. Staining established colonies revealed fluorescent colony structures, but dye addition could displace cells and increase background. Separate slide preparations allowed fluorescence to be inspected at the level of individual bacteria (Fig. 2).',
            'These comparisons established practical criteria for further method development: detectable cell-associated fluorescence, preservation of growth and spatial organization, and a measurable relationship between the label and the initial population. SYTO9 staining demonstrated that fluorescence could be obtained under some conditions; it did not validate the label-partitioning hypothesis underlying the founder-equivalent readout. That quantitative approach remains to be established.',
          ],
        },
      ],
    },
    {
      id: 'sprb-labeling',
      title: 'SprB labeling for motion analysis',
      sections: [
        {
          id: 'sprb-question',
          title: 'Research question & approach',
          paragraphs: [
            'To understand how perturbations alter gliding, I aimed to establish a way to follow individual SprB-associated signals on the bacterial surface. Reliable labeling would allow us to ask whether a treatment changes the speed, path, or continuity of SprB motion, connecting a change in whole-cell behavior to effects on the motility machinery. The immediate methodological challenge was to obtain sufficiently sparse, specific signals for single-particle tracking.',
          ],
        },
        {
          id: 'sprb-contribution',
          title: 'My contribution',
          paragraphs: [
            'I proposed an HA-tag strategy for SprB, with antibody titration offering a way to explore labeling density. Shuning Dong completed the genetic construction, and I performed the subsequent microscopy observations. I am also primarily responsible for testing primary- and secondary-antibody labeling conditions targeting GFP in the laboratory’s existing sfGFP–SprB fusion strains, including constructs carrying SprB C-terminal regions.',
          ],
        },
        {
          id: 'sprb-progress',
          title: 'Experimental progress and decisions',
          paragraphs: [
            'An early TIRF trial was an important turning point. GFP fluorescence was visible across the bacterial body, but it did not resolve into the discrete surface targets needed for SprB tracking; mCherry signals in the tested strains were too weak for useful observations. I considered high labeling density and intracellular background as possible explanations. These observations prompted the team to pursue the HA-tag strategy I had already proposed, so that labeling density could be varied through antibody concentration rather than relying solely on fusion-protein fluorescence.',
            'In subsequent anti-GFP trials, I used negative controls and the location of fluorescent puncta relative to bacteria to judge whether signals were suitable for tracking. Signals in negative controls and puncta that did not reliably colocalize with bacteria prevented me from treating the apparent positives as usable SprB trajectories.',
            'We subsequently identified a potentially important limitation of the strains tested: they retained porV. PorV is a T9SS cargo shuttle involved in exporting proteins that include extracellular proteases; SprB is a T9SS substrate whose secretion does not require PorV. A published study used a porV deletion to limit degradation of a HaloTag–SprB fusion by endogenous secreted proteases ([Lauber et al., 2024](https://www.nature.com/articles/s41564-024-01644-7)). This provides a specific rationale for testing whether PorV-dependent protease secretion also compromises our sfGFP–SprB constructs.',
            'The next step is to test the fusion-protein stability hypothesis in a porV-deletion background and assess whether cell-associated labeling improves. This is a planned comparison, not a completed rescue experiment. Our current observations do not establish the cause of the labeling failure, and reliable SprB tracking has not yet been achieved; they have narrowed the next experiments from adjusting antibody conditions alone to also examining the strain background and fusion-protein integrity.',
          ],
        },
      ],
    },
    {
      id: 'colony-polysaccharides',
      title: 'Colony polysaccharide labeling',
      sections: [
        {
          id: 'cona-approach',
          title: 'Research question & approach',
          paragraphs: [
            'Polysaccharides may help organize F. johnsoniae cells into motile microcolonies. Concanavalin A (ConA) is a lectin that binds particular glucose- and mannose-containing carbohydrate structures. In published work on F. johnsoniae, fluorescent ConA labeled extracellular polysaccharide-rich cores within moving microcolonies, known as zorbs, rather than individual cells ([Li et al., 2021](https://www.nature.com/articles/s41467-021-25408-7)). This provided a basis for testing whether a comparable spatial readout could reveal polysaccharide organization in our colonies.',
            'I designed and carried out ConA labeling and imaging trials to explore that readout under our observation conditions. Because ConA recognizes a subset of carbohydrate structures, the aim was to identify ConA-binding material and its spatial relationship to the colony, rather than to measure all colony polysaccharides.',
          ],
        },
        {
          id: 'cona-progress',
          figures: [
            {
              id: 'fj-figure-3',
              afterParagraph: 0,
            },
            {
              id: 'fj-figure-4',
              afterParagraph: 1,
            },
          ],
          title: 'Experimental progress and decisions',
          paragraphs: [
            'In the first ConA pilot, the observation chamber partly dried out and the bacteria stopped moving. I observed wave-like fluorescence associated with granular features in bright field (Fig. 3), but this pattern alone could not establish polysaccharide-specific labeling. Background fluorescence in other channels also made comparison in the ConA detection channel, with and without dye, a necessary control.',
            'I revised the chamber to include agarose-supported buffer reservoirs and a humid enclosure, and used the supernatant after briefly centrifuging the ConA preparation (Fig. 4). The revised conditions retained liquid and allowed bacterial movement to be observed. Fluorescence remained broadly distributed, and as the chamber dried, signal accumulated near cells. This gave an alternative explanation for the apparent association in the first pilot. Because the expected target is extracellular material, lack of overlap with individual bacteria is not by itself evidence of labeling failure. The unresolved issue is whether the signal identifies a specific polysaccharide structure rather than background or evaporation-driven concentration; a dye-only control without bacteria was still missing. The work improved sample hydration and clarified the controls needed, while specific polysaccharide labeling remained unconfirmed.',
          ],
        },
      ],
    },
    {
      id: 'microscopy-tools',
      title: 'Computational tools for microscopy',
      sections: [
        {
          id: 'rainbow-trace',
          title: 'Rainbow Trace',
          href: '/research/rainbow-trace/',
          paragraphs: [],
        },
        {
          id: 'rainbow-tracker',
          title: 'Rainbow Tracker',
          href: '/research/rainbow-tracker/',
          paragraphs: [],
        },
      ],
    },
  ],
}

export default fjData
