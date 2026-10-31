import type { ColleagueId } from './colleaguesData'

export interface TrogenAward {
  id: string
  headline: string
  title?: string
  status?: string
  detail: string
  featured?: boolean
  icon: { src: string; width: number; height: number }
}

export type TrogenBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; id: string; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'figure'; figureId: string }
  | { type: 'awards'; awards: TrogenAward[] }

export interface TrogenSection {
  id: string
  title: string
  blocks: TrogenBlock[]
}
interface TrogenResearchLine {
  id: string
  title: string
  navTitle: string
  sections: TrogenSection[]
}
interface TrogenData {
  title: string
  summary: string
  photo: { src: string; width: number; height: number; alt: string }
  role: string
  participationPeriod: string
  colleagues: ColleagueId[]
  context: { name: string; url: string | null }[]
  wiki: string
  overview: TrogenBlock[]
  researchLines: TrogenResearchLine[]
  sections: TrogenSection[]
  references: string[]
}
// English content synchronized from iGEM2025_TroGen.md, Draft 4 (2026-10-31).
// The bilingual source and editorial history remain in Obsidian.
const trogenData: TrogenData = {
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
  colleagues: ['shuning-dong', 'tianran-chen', 'rui-chen', 'shulei-he', 'zhicheng-yang'],
  context: [
    {
      name: 'School of Science, Xi’an Jiaotong-Liverpool University',
      url: null,
    },
    {
      name: 'XJTLU-Science-China',
      url: 'https://2025.igem.wiki/xjtlu-science-china/',
    },
  ],
  wiki: 'https://2025.igem.wiki/xjtlu-science-china/',
  overview: [
    {
      type: 'paragraph',
      text: '**Tumor-associated intracellular bacteria.** In the MMTV-PyMT mouse model, mammary tumors had approximately eight times the median bacterial load of normal mammary tissue (Fig. 1A). Tumors also contained a distinct, less diverse microbial community, with *Staphylococcus* among the major genera (Fig. 1B). Bacteria were detected predominantly in tumor epithelial cells, and approximately 97% of the bacteria-like structures observed by electron microscopy were located in the cytosol (Fig. 1C; [Fu et al., 2022](https://pubmed.ncbi.nlm.nih.gov/35395179/)).',
    },
    {
      type: 'figure',
      figureId: '1',
    },
    {
      type: 'paragraph',
      text: '**Proposed concept.** These differences in abundance and composition, together with intracellular localization, led me to hypothesize that certain commensal bacteria might preferentially associate with tumor cells and serve as intracellular delivery vehicles. I conceived and led TroGen to investigate this possibility in triple-negative breast cancer (TNBC), proposing engineered *Staphylococcus xylosus* and *Staphylococcus epidermidis* as carriers for intracellular delivery of the anticancer payload apoptin (Fig. 2). Hypoxia-responsive regulation was intended to concentrate payload expression in the tumor environment, while antibiotic-dependent containment would limit bacterial survival in normoxic tissues. This concept defined three connected research lines: bacterial–cell interactions, genetic modification of the selected strains, and environmental regulation of engineered functions.',
    },
    {
      type: 'figure',
      figureId: '2',
    },
    {
      type: 'paragraph',
      text: '**My role.** I led the scientific direction, genetic system design and experimental strategy. I developed and performed the bacteria–cell co-culture experiments, maintained mammalian cell and tumor-spheroid cultures, and conducted flow cytometry, confocal imaging and the associated data analysis. Other team members performed most bacterial construction and transformation experiments.',
    },
    {
      type: 'paragraph',
      text: '**Project progress.** The project yielded engineered bacterial strains and preliminary data from co-culture and reporter assays. Intracellular payload delivery, anticancer efficacy and conditional containment remained objectives for subsequent validation.',
    },
  ],
  researchLines: [
    {
      id: 'bacterial-cell-interactions',
      title: 'Bacteria–cell co-culture & assay development',
      navTitle: 'Bacteria–cell co-culture',
      sections: [
        {
          id: 'research-question',
          title: 'Research question and approach',
          blocks: [
            {
              type: 'paragraph',
              text: 'I investigated *Staphylococcus xylosus* ATCC 29971 invasion of four mammary cell lines—MDA-MB-231, 4T1, HBL-100 and HC11—and examined bacterial spatial distribution by confocal imaging.',
            },
            {
              type: 'paragraph',
              text: 'I designed a bicistronic FnBPA–sfGFP cassette to coordinate transcription of the candidate invasion factor and fluorescent reporter while producing separate proteins (Fig. 3). Constitutive promoter variants were intended to reduce dependence on native growth-phase regulation and enable comparisons across expression strengths. Matched reporter-only controls supported assessment of FnBPA-associated effects ([project design](https://2025.igem.wiki/xjtlu-science-china/design/)).',
            },
            {
              type: 'figure',
              figureId: '3',
            },
          ],
        },
        {
          id: 'my-contribution',
          title: 'My contribution',
          blocks: [
            {
              type: 'list',
              items: [
                '**Genetic design and experimental strategy.** Designed the FnBPA–sfGFP cassette and reporter controls, planned comparisons across cell lines and bacterial exposures, and interpreted fluorescence and host-cell viability measurements.',
                '**Assay development, execution and analysis.** Developed and refined co-culture and bacterial-labeling workflows, maintained monolayer and tumor-spheroid cultures, and performed co-culture, flow cytometry, confocal imaging and data analysis using FlowJo, ImageJ and Prism.',
              ],
            },
          ],
        },
        {
          id: 'co-culture-assay',
          title: 'Research decisions',
          blocks: [
            {
              type: 'paragraph',
              text: 'I established the laboratory’s initial bacteria–cell co-culture workflow through literature-based method adaptation and expert consultation. This included adapting an organoid–bacteria approach to a two-dimensional cell system ([Dong et al., 2022](https://doi.org/10.1016/j.xpro.2022.101624)) and revising the workflow in response to experimental constraints.',
            },
            {
              type: 'paragraph',
              text: 'Low and variable sfGFP fluorescence complicated interpretation of the initial co-culture measurements. Following Kanghui Ruan’s recommendation, I compared sfGFP with CellTrace Far Red through confocal imaging and ImageJ analysis. This assessment informed the subsequent selection of CellTrace for bacterial tracking.',
            },
            {
              type: 'paragraph',
              text: 'Because flow cytometry measures fluorescence without spatial localization, I paired it with multichannel imaging and gentamicin-protection checks. I also extended co-culture to 4T1 spheroids to examine bacterial distribution in a three-dimensional cell model. The co-culture workflow is shown in Fig. 4.',
            },
            {
              type: 'figure',
              figureId: '4',
            },
          ],
        },
        {
          id: 'selected-findings',
          title: 'Selected findings',
          blocks: [
            {
              type: 'heading',
              id: 'coculture-results',
              text: 'Co-culture',
            },
            {
              type: 'paragraph',
              text: 'With the FnBPA-containing construct, MDA-MB-231 cells showed high fluorescence-positive fractions that converged with HBL-100 at higher bacterial exposures, whereas 4T1 remained above HC11 across the tested range (Fig. 5A, B). The reporter-only strain also produced exposure-dependent fluorescence in human cell lines, with a larger separation between MDA-MB-231 and HBL-100 at the highest tested exposure (Fig. 5C).',
            },
            {
              type: 'figure',
              figureId: '5',
            },
            {
              type: 'paragraph',
              text: 'These measurements quantify host-cell-associated fluorescence. Dye carry-over and transfer remained unresolved contributors, so the observed differences identify patterns for mechanistic follow-up. FnBPA protein expression and surface localization require direct assessment.',
            },
            {
              type: 'heading',
              id: 'localization-results',
              text: 'Intracellular localization',
            },
            {
              type: 'paragraph',
              text: 'I examined bacterial-label distribution relative to cell contours, nuclei and LysoTracker-positive compartments by multichannel imaging (Fig. 6). Green signals appeared within the drawn cell contours, with incomplete overlap with LysoTracker. Resolving internalization and endosomal escape requires three-dimensional localization and compartment-specific controls.',
            },
            {
              type: 'figure',
              figureId: '6',
            },
            {
              type: 'heading',
              id: 'spheroid-results',
              text: 'Tumor spheroids',
            },
            {
              type: 'paragraph',
              text: 'I cultured and passaged 4T1 tumor spheroids and extended bacterial co-culture to this three-dimensional model. Serial fluorescence observations showed changes in signal distribution around and over spheroid regions. Background fluorescence and variable sample quality limited assessment of penetration depth and cell-level internalization ([project results](https://2025.igem.wiki/xjtlu-science-china/result/)).',
            },
          ],
        },
      ],
    },
    {
      id: 'restriction-modification',
      title: 'Restriction–modification system bypass',
      navTitle: 'R–M system bypass',
      sections: [
        {
          id: 'rm-research-question',
          title: 'Research question and approach',
          blocks: [
            {
              type: 'paragraph',
              text: '**Restriction and modification.** Most restriction–modification (R–M) systems combine a restriction endonuclease (R), which cleaves DNA, with a DNA methyltransferase (M), which marks host DNA for protection. Different arrangements of recognition, modification and cleavage functions distinguish the major system types. Type I systems include a specificity subunit (HsdS), methyltransferase (HsdM) and restriction subunit (HsdR). Type IV systems differ: they recognize modified DNA and generally lack a paired protective methyltransferase ([Lee et al., 2019](https://pubmed.ncbi.nlm.nih.gov/31848274/)).',
            },
            {
              type: 'paragraph',
              text: '**HsdMS-mediated plasmid modification.** HsdS determines which DNA sequences are recognized, while HsdM methylates those sites. Expressing the recipient strain’s HsdMS in an auxiliary *E. coli* host was intended to give plasmids the recipient’s protective methylation pattern before transfer, reducing cleavage by its Type I restriction system. The auxiliary host supplies the modification components without the HsdR restriction subunit ([Lee et al., 2019](https://pubmed.ncbi.nlm.nih.gov/31848274/)).',
            },
            {
              type: 'paragraph',
              text: '**S. epidermidis ATCC 14990.** My analysis identified an apparently intact Type I system, a second Type I locus with a possible disruption, and a putative Type II system. I developed an HsdMS-based plasmid artificial modification strategy and an auxiliary *E. coli* host design to address the predicted Type I barrier.',
            },
            {
              type: 'paragraph',
              text: '**S. xylosus ATCC 29971.** I considered a candidate Type IV restriction system as a possible source of sensitivity to modified DNA. This hypothesis informed the selection of a JM110-based plasmid-preparation route, developed with the bacterial team and advisors.',
            },
            {
              type: 'paragraph',
              text: '**E. coli Nissle 1917.** I reviewed database-predicted Type I and Type II systems alongside published transformation experience, and evaluated DNA-modification and sequence-level approaches in relation to these predicted barriers.',
            },
          ],
        },
        {
          id: 'rm-my-contribution',
          title: 'My contribution',
          blocks: [
            {
              type: 'list',
              items: [
                '**Genome interpretation.** Cross-checked REBASE and NCBI annotations against sequence similarity and gene organization; identified a restriction-gene candidate on a separate contig; and assessed whether incomplete or ambiguously annotated loci could encode functional restriction systems.',
                '**Genetic design and experimental direction.** Designed the HsdMS gene-replacement cassette and auxiliary-host validation plan for *S. epidermidis*, selected a JM110-based route for *S. xylosus*, and interpreted construction results with the bacterial team and advisors to guide subsequent revisions.',
              ],
            },
          ],
        },
        {
          id: 'rm-research-decisions',
          title: 'Research decisions',
          blocks: [
            {
              type: 'paragraph',
              text: '**Interpreting a disrupted Type I locus.** A transposase-related pseudogene downstream of *hsdR–hsdS* suggested an interrupted *hsdM*. I therefore considered this Type I locus potentially non-functional.',
            },
            {
              type: 'paragraph',
              text: '**Questioning a possible Type II annotation.** Sequence similarity and the reported organization of staphylococcal mismatch repair led me to question a *mutH* annotation and consider a Sau3AI-like restriction enzyme. I hypothesized that this candidate and a Dcm-like methyltransferase might form a functional Type II pair.',
            },
            {
              type: 'paragraph',
              text: '**Designing the HsdMS auxiliary host.** I designed an *E. coli* auxiliary host in which an *S. epidermidis hsdMS* cassette replaced the native *dcm* locus (Fig. 7A). The aim was to introduce host-matched plasmid methylation while removing Dcm as a potential source of interference. For *S. xylosus*, the JM110 route instead used a plasmid-propagation host lacking Dam and Dcm methylation (Fig. 7B).',
            },
            {
              type: 'figure',
              figureId: '7',
            },
          ],
        },
        {
          id: 'rm-experimental-progress',
          title: 'Results',
          blocks: [
            {
              type: 'paragraph',
              text: 'The strain-specific approaches and their outcomes are summarized in Fig. 8.',
            },
            {
              type: 'figure',
              figureId: '8',
            },
            {
              type: 'heading',
              id: 'rm-xylosus-results',
              text: '*S. xylosus* ATCC 29971',
            },
            {
              type: 'paragraph',
              text: 'The team obtained plasmid-containing transformants using JM110-based plasmid preparation and a revised transformation workflow. These strains enabled subsequent reporter and co-culture experiments.',
            },
            {
              type: 'heading',
              id: 'rm-epidermidis-results',
              text: '*S. epidermidis* ATCC 14990',
            },
            {
              type: 'paragraph',
              text: 'The team constructed an HsdMS-carrying *E. coli* auxiliary strain with positive PCR screening. Transformation of the target *S. epidermidis* strain remained unsuccessful under the conditions tested.',
            },
            {
              type: 'heading',
              id: 'rm-ecn-results',
              text: '*E. coli* Nissle 1917',
            },
            {
              type: 'paragraph',
              text: 'My R–M work on this strain comprised analysis of predicted restriction features and evaluation of candidate DNA-modification and sequence-design approaches.',
            },
            {
              type: 'paragraph',
              text: 'The successful *S. xylosus* workflow combined changes in DNA preparation and transformation conditions; their individual contributions to transformation success remained unresolved.',
            },
            {
              type: 'paragraph',
              text: '[Team construction results](https://2025.igem.wiki/xjtlu-science-china/result/) · [Engineering iterations](https://2025.igem.wiki/xjtlu-science-china/engineering/)',
            },
          ],
        },
      ],
    },
    {
      id: 'hypoxia-sensing',
      title: 'Hypoxia-responsive Module (HRM)',
      navTitle: 'Hypoxia-responsive Module',
      sections: [
        {
          id: 'hypoxia-research-question',
          title: 'Research question and approach',
          blocks: [
            {
              type: 'paragraph',
              text: 'I investigated oxygen-responsive gene regulation as a potential means of controlling engineered bacterial functions. The Hypoxia-responsive Module (HRM) combined the staphylococcal *nreABC* regulatory system with the PnarT promoter (Fig. 9B). Initial characterization examined reporter fluorescence under contrasting oxygen conditions, with conditional payload expression and bacterial survival as downstream design objectives.',
            },
            {
              type: 'paragraph',
              text: '**Roles of NreA, NreB and NreC.** NreB is a cytoplasmic oxygen-sensing kinase that transfers phosphate to the transcriptional regulator NreC. NreA is a nitrate receptor: nitrate binding relieves its inhibition of NreB. These functions connect oxygen and nitrate availability to gene regulation and informed the proposed PnarT-controlled output (Fig. 9A; [Kamps et al., 2004](https://pubmed.ncbi.nlm.nih.gov/15101978/); [Nilkens et al., 2014](https://pubmed.ncbi.nlm.nih.gov/24261791/)).',
            },
            {
              type: 'figure',
              figureId: '9',
            },
          ],
        },
        {
          id: 'hypoxia-my-contribution',
          title: 'My contribution',
          blocks: [
            {
              type: 'list',
              items: [
                '**Literature-based selection and genetic design.** Identified and compared candidate sensing systems, including SrrAB, nreABC and lactate-responsive approaches; developed the nreABC-based design; and planned reporter characterization and downstream applications.',
                '**Experimental characterization.** Performed fluorescence imaging and image analysis under contrasting oxygen conditions, and contributed to the design, sampling and execution of complementary bacterial growth experiments.',
              ],
            },
          ],
        },
        {
          id: 'hypoxia-research-decisions',
          title: 'Research decisions',
          blocks: [
            {
              type: 'paragraph',
              text: '**Selecting a regulatory system.** My evaluation of SrrAB raised concerns about broad regulatory effects and transferability between species. I selected nreABC for further study because of its established role in staphylococcal oxygen and nitrate regulation, while accounting for its endogenous functions and potential interactions with the host ([Niemann et al., 2014](https://pubmed.ncbi.nlm.nih.gov/24389349/)).',
            },
            {
              type: 'paragraph',
              text: '**Including the regulatory genes.** I initially considered using PnarT alone with the host’s endogenous regulators. I hypothesized that additional plasmid-borne promoter copies could compete for a limited regulator pool and weaken the response. This motivated inclusion of *nreABC* alongside PnarT in the [cassette design](https://2025.igem.wiki/xjtlu-science-china/design/#organization2); the proposed titration effect was not directly tested.',
            },
            {
              type: 'paragraph',
              text: '**Separating sensing from application.** I used an sfGFP reporter to assess the module’s oxygen-associated response before interpreting proposed payload or containment functions. Hypoxia sensing, intracellular localization and cell-type selectivity required distinct experimental readouts.',
            },
          ],
        },
        {
          id: 'hypoxia-experimental-progress',
          title: 'Results',
          blocks: [
            {
              type: 'paragraph',
              text: 'Reporter imaging of engineered *S. xylosus* showed higher fluorescence under 5% O₂ than under 21% O₂ (Fig. 10). These observations provided preliminary evidence of an oxygen-associated reporter response; downstream payload and containment functions remained unvalidated.',
            },
            {
              type: 'figure',
              figureId: '10',
            },
          ],
        },
      ],
    },
  ],
  sections: [
    {
      id: 'research-development',
      title: 'Honors and awards',
      blocks: [
        {
          type: 'paragraph',
          text: '**iGEM 2025.** Awards received by XJTLU-Science-China.',
        },
        {
          type: 'awards',
          awards: [
            {
              id: 'top-10',
              headline: 'Top 10',
              detail: 'Among 190 undergraduate teams',
              icon: {
                src: '/static/images/research/trogen/awards/top-10.png',
                width: 330,
                height: 361,
              },
              title: 'Undergraduate project ranking',
              featured: true,
            },
            {
              id: 'composite-part',
              headline: 'Best New Composite Part',
              status: 'Sole winner',
              detail: 'Among 190 undergraduate teams',
              icon: {
                src: '/static/images/research/trogen/awards/composite-part.png',
                width: 336,
                height: 368,
              },
              featured: true,
            },
            {
              id: 'gold-medal',
              headline: 'Gold Medal',
              detail: 'iGEM 2025',
              icon: {
                src: '/static/images/research/trogen/awards/gold-medal.png',
                width: 368,
                height: 368,
              },
            },
            {
              id: 'oncology-nominee',
              headline: 'Best Oncology Project',
              status: 'Nominee',
              detail: 'Undergraduate & overgraduate divisions',
              icon: {
                src: '/static/images/research/trogen/awards/oncology-nominee.png',
                width: 343,
                height: 342,
              },
            },
            {
              id: 'wiki-nominee',
              headline: 'Best Wiki',
              status: 'Nominee',
              detail: 'Undergraduate division',
              icon: {
                src: '/static/images/research/trogen/awards/wiki-nominee.png',
                width: 330,
                height: 362,
              },
            },
          ],
        },
        {
          type: 'paragraph',
          text: '[Official competition results](https://competition.igem.org/results/2025)',
        },
      ],
    },
    {
      id: 'reflection',
      title: 'Research development',
      blocks: [
        {
          type: 'paragraph',
          text: '**Bioengineering possibilities.** Developing TroGen’s early-stage concept broadened my understanding of how natural bacteria–host interactions could inform new therapeutic strategies.',
        },
        {
          type: 'paragraph',
          text: '**Engineering perspective.** I learned to translate a therapeutic concept into interconnected requirements for bacterial entry, genetic modification and environmental regulation, with assays to evaluate each function.',
        },
        {
          type: 'paragraph',
          text: '**Independent research.** I established an experimental framework from the literature and specialist advice, revising designs and priorities in response to results.',
        },
      ],
    },
    {
      id: 'team-resources',
      title: 'People and project resources',
      blocks: [
        {
          type: 'paragraph',
          text: 'TroGen was conducted by the XJTLU-Science-China team with funding from the School of Science, Xi’an Jiaotong-Liverpool University.',
        },
        {
          type: 'paragraph',
          text: 'Kanghui Ruan, a doctoral candidate in Dr. Shang Cai’s lab at Westlake University during the project, advised on co-culture and bacterial labeling. Yongjie Sha, then a doctoral student at Soochow University, provided experimental guidance, and Guang Cai supported cell and spheroid culture.',
        },
        {
          type: 'paragraph',
          text: 'Early discussions and a paper recommendation from Dr. Weiwei Dai, a faculty member in XJTLU’s School of Science whose group I had previously worked in, informed the project concept.',
        },
        {
          type: 'paragraph',
          text: '[Project wiki](https://2025.igem.wiki/xjtlu-science-china/) · [Full attributions](https://teams.igem.org/wiki/5636/attributions)',
        },
      ],
    },
  ],
  references: [
    'Fu, A., Yao, B., Dong, T., et al. (2022). [Tumor-resident intracellular microbiota promotes metastatic colonization in breast cancer](https://pubmed.ncbi.nlm.nih.gov/35395179/). *Cell*, 185, 1356–1372.e26.',
    'Dong, T., Fu, A., & Cai, S. (2022). [Protocols for genetic labeling and tracing of Staphylococcus xylosus during tumor progression](https://doi.org/10.1016/j.xpro.2022.101624). *STAR Protocols*, 3, 101624.',
    'Lee, J. Y. H., Carter, G. P., Pidot, S. J., et al. (2019). [Mining the Methylome Reveals Extensive Diversity in Staphylococcus epidermidis Restriction Modification](https://pubmed.ncbi.nlm.nih.gov/31848274/). *mBio*, 10, e02451-19.',
    'Niemann, V., Koch-Singenstreu, M., Neu, A., et al. (2014). [The NreA protein functions as a nitrate receptor in the staphylococcal nitrate regulation system](https://pubmed.ncbi.nlm.nih.gov/24389349/). *Journal of Molecular Biology*, 426, 1539–1553.',
    'Kamps, A., Achebach, S., Fedtke, I., Unden, G., & Götz, F. (2004). [Staphylococcal NreB: an O₂-sensing histidine protein kinase with an O₂-labile iron–sulphur cluster of the FNR type](https://pubmed.ncbi.nlm.nih.gov/15101978/). *Molecular Microbiology*.',
    'Nilkens, S., Koch-Singenstreu, M., Niemann, V., Götz, F., Stehle, T., & Unden, G. (2014). [Nitrate/oxygen co-sensing by an NreA/NreB sensor complex of Staphylococcus carnosus](https://pubmed.ncbi.nlm.nih.gov/24261791/). *Molecular Microbiology*, 91, 381–393.',
  ],
}

export default trogenData
