import type { FjSection } from './fjData'

export interface FjTool {
  slug: string
  title: string
  summary: string
  sections: FjSection[]
}

export const fjProjectPath = '/research/motility-mechanisms-in-flavobacterium-johnsoniae'

const fjTools: Record<string, FjTool> = {
  'rainbow-trace': {
    slug: 'rainbow-trace',
    title: 'Rainbow Trace',
    summary:
      'Automated temporal color projections for comparing bacterial movement in microscopy videos.',
    sections: [
      {
        id: 'research-need',
        title: 'Research need',
        paragraphs: [
          'The original Fiji macro required repeated manual steps and parameter adjustments to generate rainbow projections. Besides taking time, differences in processing settings between groups could reduce the comparability of the resulting images. I adapted this workflow into Python to automate video processing and apply consistent settings within an experiment.',
        ],
      },
      {
        id: 'workflow',
        title: 'Workflow and output',
        paragraphs: [
          'Rainbow Trace assigns colors to successive time points and combines them into a single temporal color projection, making the temporal pattern and spatial extent of bacterial movement easier to inspect. Batch processing and retained outputs support comparison and review of microscopy observations (Fig. 1).',
        ],
        figures: [
          {
            id: 'rainbow-trace-figure-1',
            afterParagraph: 0,
          },
        ],
      },
      {
        id: 'current-status',
        title: 'Current status',
        paragraphs: [
          'The workflow has produced usable visualization outputs from research videos. Temporal color projections support visual comparison of movement patterns; they do not assign cell identities or measure tracking accuracy. Dataset-wide throughput and runtime comparisons remain to be documented.',
        ],
      },
    ],
  },
  'rainbow-tracker': {
    slug: 'rainbow-tracker',
    title: 'Rainbow Tracker',
    summary:
      'A single-cell tracking pipeline designed to preserve identity relationships through cell interactions and support interpretable motion analysis.',
    sections: [
      {
        id: 'research-need',
        title: 'Research need and development',
        paragraphs: [
          'I designed, developed, and iteratively tested a single-cell tracking pipeline around the difficulties visible in our videos: bacteria touch, their segmented images merge, and their identities can be lost when they separate. I combined existing segmentation and matching components with logic for identity continuity, movement through the field boundary, and temporary missing detections. Development involved repeated inspection of intermediate labels, trajectories, and cases where filtering removed real bacteria or matching linked incompatible observations.',
        ],
      },
      {
        id: 'tracking-logic',
        title: 'Tracking logic',
        paragraphs: [
          'A central design decision was to distinguish identity continuity from evidence of motion. The pipeline can retain identity relationships through ambiguous encounters while excluding uncertain links from motion measurements. This allows a possible identity connection to be retained without interpreting an unobserved interval as a measured trajectory. Trajectory images, measurement tables, and diagnostic outputs make these decisions available for inspection.',
        ],
      },
      {
        id: 'testing',
        title: 'Iteration and current status',
        paragraphs: [
          'I compared tracking variants across nine complete microscopy videos comprising 6,750 frames. These internal comparisons examined continuity, identity counts, and the consequences of different filtering and matching choices. They provided a basis for revising the pipeline, while measurement of identity-switch rates and tracking accuracy still requires systematic comparison with manual identity annotations.',
        ],
      },
    ],
  },
}

export default fjTools
