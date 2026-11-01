export interface FjFigure {
  id: string
  layout: 'pair' | 'comparison' | 'single' | 'channel-grid'
  images: { src: string; width: number; height: number; label: string; alt: string }[]
  rowLabels?: string[]
  columnLabels?: string[]
  video?: { src: string; poster: string; width: number; height: number }
  captionTitle: string
  caption: string
}

const fjFigures: Record<string, FjFigure> = {
  'fj-figure-1': {
    id: 'fj-figure-1',
    layout: 'single',
    images: [
      {
        src: '/static/images/research/fj-gliding/celltrace-volume.webp',
        width: 1846,
        height: 1398,
        label: '',
        alt: 'Magenta CellTrace fluorescence following the circular inoculation-droplet footprint in a three-dimensional z-stack display; 300 micrometre scale bar.',
      },
    ],
    captionTitle: 'Fig. 1. CellTrace imaging during development of the population readout.',
    caption:
      'Volume rendering of a z-stack acquired on 25 May 2026 (10× objective; 51 planes at 2 μm intervals). Magenta CellTrace fluorescence follows the circular footprint of the inoculated droplet. Bacteria were observed in bright field beyond this footprint as the colony expanded, without detectable labeling; that bright-field observation is not shown here. Scale bar: 300 μm.',
  },
  'fj-figure-2': {
    id: 'fj-figure-2',
    layout: 'channel-grid',
    images: [
      {
        src: '/static/images/research/fj-gliding/syto9-colony-brightfield-20260805.png',
        width: 3904,
        height: 2648,
        label: 'A. Bright field',
        alt: 'Bright-field view of the established colony; 200 micrometre scale bar.',
      },
      {
        src: '/static/images/research/fj-gliding/syto9-colony-fluorescence-20260805.png',
        width: 3904,
        height: 2648,
        label: 'B. 488 nm fluorescence',
        alt: 'Green SYTO9 fluorescence in the same established-colony field; 200 micrometre scale bar.',
      },
      {
        src: '/static/images/research/fj-gliding/syto9-colony-overlay-20260805.png',
        width: 3904,
        height: 2648,
        label: 'C. Overlay',
        alt: 'Overlay of bright field and SYTO9 fluorescence in the established colony; 200 micrometre scale bar.',
      },
      {
        src: '/static/images/research/fj-gliding/syto9-cells-brightfield-20260805.png',
        width: 3904,
        height: 2648,
        label: 'D. Bright field',
        alt: 'Bright-field view of individual bacteria in a separate slide preparation; 3 micrometre scale bar.',
      },
      {
        src: '/static/images/research/fj-gliding/syto9-cells-fluorescence-20260805.png',
        width: 3904,
        height: 2648,
        label: 'E. 488 nm fluorescence',
        alt: 'Green SYTO9 fluorescence associated with individual bacteria in the same slide field; 3 micrometre scale bar.',
      },
      {
        src: '/static/images/research/fj-gliding/syto9-cells-overlay-20260805.png',
        width: 3904,
        height: 2648,
        label: 'F. Overlay',
        alt: 'Overlay of bright field and SYTO9 fluorescence in the single-cell slide preparation; 3 micrometre scale bar.',
      },
    ],
    captionTitle: 'Fig. 2. SYTO9 staining at colony and single-cell scales.',
    caption:
      '**(A–C)** An established colony stained with 5 μM SYTO9. **(D–F)** Individual bacteria in a separate slide preparation stained at 5 μM. Columns show bright field, the 488 nm fluorescence channel, and their overlay, respectively. These images show staining at two spatial scales; retention of the label through proliferation remains to be tested. Scale bars: 200 μm (A–C), 3 μm (D–F).',
    rowLabels: ['Colony structure', 'Individual cells'],
    columnLabels: ['Bright field', '488 nm fluorescence', 'Overlay'],
  },
  'fj-figure-3': {
    id: 'fj-figure-3',
    layout: 'comparison',
    images: [
      {
        src: '/static/images/research/fj-gliding/cona-wave-brightfield.png',
        width: 3904,
        height: 2648,
        label: 'A. Bright field',
        alt: 'Bacteria and granular features in bright field during the first ConA pilot; 5 micrometre scale bar.',
      },
      {
        src: '/static/images/research/fj-gliding/cona-wave-fluorescence.png',
        width: 3904,
        height: 2648,
        label: 'B. ConA fluorescence',
        alt: 'Yellow ConA-channel fluorescence forming wave-like bands; 5 micrometre scale bar.',
      },
      {
        src: '/static/images/research/fj-gliding/cona-wave-overlay.png',
        width: 3904,
        height: 2648,
        label: 'C. Overlay',
        alt: 'Overlay of the same bright-field and ConA fluorescence views; 5 micrometre scale bar.',
      },
    ],
    captionTitle: 'Fig. 3. Wave-like fluorescence observed in the first ConA pilot.',
    caption:
      '**(A–C)** Bright-field, fluorescence, and overlay views of the same field. Yellow ConA-channel fluorescence forms wave-like bands associated with granular features in bright field. The chamber had partly dried and the bacteria were not moving. Subsequent observations of evaporation-associated signal accumulation prompted reassessment of this pattern; it did not establish specific polysaccharide labeling. Scale bars: 5 μm.',
  },
  'rainbow-trace-figure-1': {
    id: 'rainbow-trace-figure-1',
    layout: 'pair',
    images: [
      {
        src: '/static/images/research/fj-gliding/rainbow-preprocessed-frame.webp',
        width: 1824,
        height: 1216,
        label: 'A. Preprocessed frame',
        alt: 'An inverted grayscale frame after preprocessing, showing elongated F. johnsoniae cells.',
      },
      {
        src: '/static/images/research/fj-gliding/rainbow-temporal-projection.webp',
        width: 1824,
        height: 1216,
        label: 'B. Temporal color projection',
        alt: 'Rainbow Trace output from the same video, with successive time points represented by different colors across the field.',
      },
    ],
    captionTitle: 'Fig. 1. Rainbow Trace processing of a microscopy video.',
    caption:
      '**(A)** Preprocessed frame and **(B)** temporal color projection from the same F. johnsoniae microscopy recording, spanning approximately 29 s after trimming. Colors encode successive time points, allowing the pattern and spatial extent of movement to be inspected in one image. The projection is a visualization of motion over time and does not establish individual cell identities.',
  },
  'fj-figure-4': {
    id: 'fj-figure-4',
    layout: 'single',
    images: [
      {
        src: '/static/images/research/fj-gliding/agarose-observation-chamber.png',
        width: 1920,
        height: 1080,
        label: '',
        alt: 'Annotated observation chamber showing a 1% agarose block with a central opening, double-layered tape, and an oxygen-permeable membrane.',
      },
    ],
    captionTitle: 'Fig. 4. Observation chamber revised to improve hydration.',
    caption:
      'The annotated setup shows a 1% agarose block with a central opening, double-layered tape, and an oxygen-permeable membrane. Agarose-supported buffer reservoirs and a humid enclosure were used to maintain liquid during incubation. The agarose was removed before ConA addition. These changes allowed bacterial movement to be observed for longer before substantial evaporation.',
  },
  'fj-video-1': {
    id: 'fj-video-1',
    layout: 'single',
    images: [],
    video: {
      src: '/static/videos/research/fj-gliding/sprb-helical-motion.mp4',
      poster: '/static/images/research/fj-gliding/sprb-helical-motion-poster.png',
      width: 1920,
      height: 1080,
    },
    captionTitle: 'Video 1. Schematic of SprB motion along helical tracks.',
    caption:
      'Pink dotted paths represent the tracks of SprB movement, and turquoise spheres represent SprB. The animation illustrates how movement of surface adhesins along helical paths can be coupled to traction against the underlying surface. This is a conceptual animation, not an experimental recording.',
  },
}

export default fjFigures
