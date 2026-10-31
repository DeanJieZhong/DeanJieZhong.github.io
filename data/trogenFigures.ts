interface TrogenImage {
  src: string
  width: number
  height: number
  alt: string
  label?: string
  mobileSrc?: string
}
export interface TrogenFigure {
  id: string
  layout: 'single' | 'design' | 'comparison' | 'pair' | 'assay' | 'triptych' | 'stacked'
  maxWidth: number
  images: TrogenImage[]
  captionTitle: string
  caption: string
}
// Figure captions and assets synchronized from the Obsidian Draft 4.
const trogenFigures: Record<string, TrogenFigure> = {
  '1': {
    id: 'trogen-figure-1',
    layout: 'triptych',
    maxWidth: 840,
    images: [
      {
        src: '/static/images/research/trogen/background-qpcr.png',
        width: 870,
        height: 726,
        alt: 'qPCR comparison of bacterial loads in controls, normal mammary tissue and breast tumors.',
        label: 'A',
      },
      {
        src: '/static/images/research/trogen/staphylococcus-relative-abundance.webp',
        width: 1800,
        height: 1500,
        alt: 'Estimated Staphylococcus relative abundance: 1.7% in control, 6.2% in normal breast and 36.0% in breast tumor.',
        label: 'B',
      },
      {
        src: '/static/images/research/trogen/fu-2022-figure-2e-right-em.png',
        width: 506,
        height: 398,
        alt: 'One electron micrograph of an MMTV-PyMT mammary tumor, with red arrows indicating cytosolic bacteria-like structures and a 0.2 μm scale bar.',
        label: 'C',
      },
    ],
    captionTitle: 'Fig. 1. Bacterial abundance and intracellular localization in mammary tumors.',
    caption:
      '**(A)** qPCR-based bacterial loads in normal mammary tissue and tumors (median and 95% CI); the dashed line marks the detection limit. NTC, no-template control; EBC, environmental background control. **(B)** Estimated *Staphylococcus* relative abundance in control, normal breast and breast tumor samples. **(C)** A representative electron micrograph showing cytosolic bacteria-like structures in an MMTV-PyMT mammary tumor (red arrows). Scale bar, 0.2 μm.',
  },
  '2': {
    id: 'trogen-figure-2',
    layout: 'single',
    maxWidth: 680,
    images: [
      {
        src: '/static/images/research/trogen/project-concept.webp',
        width: 6000,
        height: 3448,
        alt: 'Proposed TroGen delivery and environmental-control concept.',
      },
    ],
    captionTitle:
      'Fig. 2. Proposed concept for intracellular payload delivery and environmental control.',
    caption:
      'Schematic of the proposed delivery and containment strategy. Left: engineered commensal *Staphylococcus* would enter TNBC cells and deliver an anticancer payload in the hypoxic tumor environment. Right: hypoxia-responsive regulation and antibiotic-dependent containment were intended to limit payload activity and bacterial survival under normoxic, antibiotic-containing conditions. Green cells represent bacteria; blue dots represent the payload.',
  },
  '3': {
    id: 'trogen-figure-3',
    layout: 'single',
    maxWidth: 560,
    images: [
      {
        src: '/static/images/research/trogen/wiki-design-fnbpa.webp',
        width: 2390,
        height: 630,
        alt: 'Bicistronic FnBPA–sfGFP cassette with a shared promoter and separate ribosome-binding sites.',
      },
    ],
    captionTitle: 'Fig. 3. Bicistronic FnBPA–sfGFP expression design.',
    caption:
      'The *fnbA* and *sfgfp* coding sequences share a promoter and have separate ribosome-binding sites (RBSs). FnBPA denotes fibronectin-binding protein A; sfGFP denotes superfolder green fluorescent protein.',
  },
  '4': {
    id: 'trogen-figure-4',
    layout: 'single',
    maxWidth: 420,
    images: [
      {
        src: '/static/images/research/trogen/wiki-design-coculture.webp',
        width: 6000,
        height: 10050,
        alt: 'Bacteria–cell co-culture workflow.',
      },
    ],
    captionTitle: 'Fig. 4. Bacteria–cell co-culture workflow.',
    caption:
      'Overview of bacterial labeling, host-cell preparation, co-culture and downstream analysis.',
  },
  '5': {
    id: 'trogen-figure-5',
    layout: 'comparison',
    maxWidth: 840,
    images: [
      {
        src: '/static/images/research/trogen/coculture-fnbpa-human.png',
        width: 1600,
        height: 1205,
        alt: 'Comparison of MDA-MB-231 and HBL-100 fluorescence-positive host-cell fractions with the FnBPA-containing construct.',
        label: 'A. FnBPA cassette · human cells',
      },
      {
        src: '/static/images/research/trogen/coculture-fnbpa-murine.png',
        width: 1600,
        height: 1185,
        alt: 'Comparison of 4T1 and HC11 fluorescence-positive host-cell fractions with the FnBPA-containing construct.',
        label: 'B. FnBPA cassette · murine cells',
      },
      {
        src: '/static/images/research/trogen/coculture-reporter-human.png',
        width: 1600,
        height: 1122,
        alt: 'Comparison of MDA-MB-231 and HBL-100 fluorescence-positive host-cell fractions with the reporter-only construct.',
        label: 'C. Reporter only · human cells',
      },
    ],
    captionTitle: 'Fig. 5. Fluorescence-based co-culture comparisons across mammary cell lines.',
    caption:
      '**(A, B)** FnBPA-containing *S. xylosus* with human and murine cell-line pairs. **(C)** Reporter-only *S. xylosus* with human cell lines. Purple bars denote MDA-MB-231 (A, C) or 4T1 (B); black bars denote HBL-100 (A, C) or HC11 (B). Horizontal axes show multiplicity of infection (MOI); vertical axes show fluorescence-positive host cells (%), with axis breaks retained. Mean ± SD and significance annotations are shown. Culture-level replication is incompletely documented; HBL-100 measurements likely included aliquots from one culture, according to my recollection.',
  },
  '6': {
    id: 'trogen-figure-6',
    layout: 'pair',
    maxWidth: 760,
    images: [
      {
        src: '/static/images/research/trogen/coculture-multichannel.jpeg',
        width: 1600,
        height: 1200,
        alt: 'Multichannel co-culture field 5 with green bacterial labeling, red LysoTracker signal, blue nuclei and white cell contours.',
        label: 'A. Field 5',
      },
      {
        src: '/static/images/research/trogen/localization-field-3.jpg',
        width: 1600,
        height: 1200,
        alt: 'Multichannel co-culture field 3 showing bacterial-label signal and LysoTracker distribution relative to nuclei and cell contours.',
        label: 'B. Field 3',
      },
    ],
    captionTitle: 'Fig. 6. Multichannel imaging of bacterial–cell spatial relationships.',
    caption:
      'Two co-culture imaging fields. Green: CFSE-labeled bacteria; red: LysoTracker; blue: nuclear staining. White contours were drawn from bright-field images. The fields show bacterial-label signal relative to cell contours and acidic compartments. The panels contain no calibrated scale bar and provide two-dimensional spatial observations.',
  },
  '7': {
    id: 'trogen-figure-7',
    layout: 'stacked',
    maxWidth: 680,
    images: [
      {
        src: '/static/images/research/trogen/wiki-design-rm-10.png',
        width: 1800,
        height: 1069,
        alt: 'Auxiliary E. coli host design showing replacement of dcm by an hsdMS-containing cassette.',
        label: 'A. HsdMS auxiliary-host design',
      },
      {
        src: '/static/images/research/trogen/wiki-design-rm-11.png',
        width: 1800,
        height: 670,
        alt: 'JM110-based plasmid preparation and transformation workflow for S. xylosus ATCC 29971.',
        label: 'B. S. xylosus transformation workflow',
      },
    ],
    captionTitle: 'Fig. 7. HsdMS auxiliary-host design and S. xylosus transformation workflow.',
    caption:
      '**(A)** Proposed replacement of the *dcm* locus in the auxiliary *E. coli* host with an *hsdMS*-containing cassette for plasmid artificial modification. **(B)** JM110-based plasmid preparation and transformation of *S. xylosus* ATCC 29971. The panels show the genetic design and transformation workflow; construction and transformation outcomes are described below.',
  },
  '10': {
    id: 'trogen-figure-10',
    layout: 'single',
    maxWidth: 460,
    images: [
      {
        src: '/static/images/research/trogen/wiki-design-hrm-fluorescence.png',
        width: 1800,
        height: 1602,
        alt: 'HRM fluorescence comparison under hypoxia and normoxia, with four plotted values per group and a difference-between-means panel.',
      },
    ],
    captionTitle: 'Fig. 10. HRM reporter fluorescence under contrasting oxygen conditions.',
    caption:
      'Fluorescence measurements from engineered *S. xylosus* under hypoxia (5% O₂) and normoxia (21% O₂). Left: fluorescence distributions. Right: the difference-between-means estimate and interval. The plot labels four values per condition; their culture-level independence is undocumented.',
  },
  '9': {
    id: 'trogen-figure-9',
    layout: 'stacked',
    maxWidth: 680,
    images: [
      {
        src: '/static/images/research/trogen/nreabc-mechanism-original.png',
        width: 3000,
        height: 2100,
        alt: 'NreABC mechanism diagram showing NreB autophosphorylation, phosphotransfer to NreC, nitrate sensing by NreA, and activation of PnarT.',
        label: 'A. NreABC regulatory mechanism',
      },
      {
        src: '/static/images/research/trogen/wiki-design-hrm.webp',
        width: 6000,
        height: 1912,
        alt: 'HRM cassette schematic showing nreABC regulatory genes and a PnarT-controlled output.',
        label: 'B. HRM gene cassette',
      },
    ],
    captionTitle: 'Fig. 9. NreABC signaling and the Hypoxia-responsive Module.',
    caption:
      '**(A)** Functional schematic of oxygen and nitrate sensing. NreB autophosphorylation and phosphotransfer activate NreC-dependent transcription; nitrate binding to NreA relieves inhibition of NreB. **(B)** Gene cassette combining *nreABC* with a PnarT-controlled output. Panel A summarizes the regulatory mechanism that informed the design; reporter measurements are shown in Fig. 10.',
  },
  '8': {
    id: 'trogen-figure-8',
    layout: 'single',
    maxWidth: 840,
    images: [
      {
        src: '/static/images/research/trogen/rm-bypass-attempts-original.png',
        width: 2622,
        height: 640,
        alt: 'R–M system bypass attempts diagram comparing S. epidermidis ATCC 14990, S. xylosus ATCC 29971 and E. coli Nissle 1917.',
      },
    ],
    captionTitle: 'Fig. 8. R–M system bypass attempts across candidate strains.',
    caption:
      'Overview of R–M system assessments and transformation outcomes for *S. epidermidis* ATCC 14990, *S. xylosus* ATCC 29971 and *E. coli* Nissle 1917. The strain-specific approaches and my contributions are described in the text.',
  },
}

export default trogenFigures
