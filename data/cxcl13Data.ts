export type Cxcl13Block =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'heading'; id: string; text: string }
  | {
      type: 'figure-group'
      id: string
      panels: {
        label: string
        src: string
        alt: string
        width: number
        height: number
        crop: { x: number; y: number; width: number; height: number }
      }[]
      caption: string
    }
  | {
      type: 'figure'
      id?: string
      src: string
      alt: string
      width: number
      height: number
      crop?: { x: number; y: number; width: number; height: number }
      size?: 'medium' | 'supporting'
      caption: string
    }

export interface Cxcl13Section {
  id: string
  title: string
  blocks: Cxcl13Block[]
}

interface Cxcl13Summary {
  overview: Cxcl13Section
  projects: {
    id: string
    title: string
    navTitle: string
    sections: Cxcl13Section[]
  }[]
  development: Cxcl13Section
  references: {
    id: string
    title: string
    entries: string[]
  }
}

// English source: Systems_Medicine_Research_Summary.md in the Obsidian vault.
const cxcl13Data: Cxcl13Summary = {
  overview: {
    id: 'research-context',
    title: 'Research context and role',
    blocks: [
      {
        type: 'paragraph',
        text: 'In Jan 2026, I joined Dr. Lianjun Zhang’s lab at the Suzhou Institute of Systems Medicine (ISM), CAMS & PUMC. I spent the first few months studying immunology and reading research papers before beginning experimental work in late March with Jiajia Wang, a senior PhD candidate in the lab.',
      },
      {
        type: 'paragraph',
        text: 'My work focuses on engineering CD8 T cells and cytokines for cancer immunotherapy. The IL4–8Fc project aims to address tumor antigen escape by combining IL4’s support of CD8 T cell function with IL8-mediated neutrophil recruitment. In the CXCL13Fc/CXCR5 project, we test whether combining CXCL13Fc with CXCR5 overexpression can improve CD8 T cell recruitment and function, with the longer-term aim of promoting tertiary lymphoid structures (TLS). The TGFβ receptor engineering project explores whether a synthetic receptor can turn TGFβ, normally an immunosuppressive cue, into a trigger for IL4-associated signaling.',
      },
      {
        type: 'paragraph',
        text: 'Dr. Lianjun Zhang guides the research, while Jiajia Wang trains me in experimental techniques, supervises my work and helps me troubleshoot. Below, I describe my contributions and present results from our work together.',
      },
    ],
  },
  projects: [
    {
      id: 'il4-il8-fc',
      title: 'IL4–IL8 heterodimeric Fc fusion protein',
      navTitle: 'IL4–8Fc',
      sections: [
        {
          id: 'il4-il8-fc-research-question',
          title: 'Research question & approach',
          blocks: [
            {
              type: 'paragraph',
              text: 'Tumor cells can escape T cell recognition by losing or varying the antigens they display. Neutrophils can complement antigen-specific T cell killing: in melanoma models, they helped eliminate antigen-loss variants following T cell therapy ([Hirschhorn et al., 2023](https://pubmed.ncbi.nlm.nih.gov/37001503/)).',
            },
            {
              type: 'paragraph',
              text: 'IL4 and IL8 offer complementary ways to engage these cells. Fc–IL4 improves CD8 T cell metabolism and effector function, enhancing antitumor activity in mouse models ([Feng et al., 2024](https://www.nature.com/articles/s41586-024-07962-4)). IL8 recruits neutrophils ([Yoshimura et al., 1987](https://pubmed.ncbi.nlm.nih.gov/3480540/)). In an IL8-humanized lung cancer model, it also promoted a neutrophil population capable of antigen cross-presentation and supporting T cell responses ([Tang et al., 2025](https://pubmed.ncbi.nlm.nih.gov/39515330/)).',
            },
            {
              type: 'paragraph',
              text: 'IL4–8Fc combines the two cytokines in one heterodimeric fusion protein: one Fc chain carries IL4 and the other carries IL8 (Fig. 1). The aim is to enhance CD8 T cell function while recruiting neutrophils to help control tumor cells that escape antigen recognition. We test whether both arms retain their activity and whether the combined protein improves cooperation between the two cell populations. Comparisons with IgGFc, IL4Fc and IL8Fc assess the contribution of each cytokine, while neutrophil–tumor–T cell co-cultures measure the resulting T cell activation and effector responses.',
            },
            {
              type: 'figure',
              src: '/static/images/research/systems-medicine/il4-il8-fc-functional-schematic.png',
              alt: 'IL4–8Fc proposed mechanism linking IL4-mediated CD8 T cell enhancement with IL8-mediated neutrophil recruitment and antitumor activity',
              width: 1920,
              height: 1080,
              caption:
                'Fig. 1. IL4–8Fc design and proposed mechanism of action. Two Fc chains carry IL4 and IL8 on separate arms, aiming to enhance CD8 T cell function and recruit neutrophils for a coordinated antitumor response.',
            },
          ],
        },
        {
          id: 'il4-il8-fc-my-contribution',
          title: 'My contribution',
          blocks: [
            {
              type: 'list',
              items: [
                '**Recombinant protein expression, purification and quality control**: Cultured and transfected 293F cells to express Fc-related proteins, then performed protein purification and endotoxin testing.',
                '**IL4 activity assays**: Stimulated cells after Th2 induction, performed intracellular IL4 staining and flow cytometry, and used Th2-associated responses as a readout of IL4 function.',
                '**Direct effects on T cells**: Participated in CD8 T cell experiments comparing IgGFc, IL4Fc, IL8Fc and IL4–8Fc, using flow cytometry to assess survival, differentiation and effector-associated phenotypes.',
                '**Neutrophil-mediated tumor-cell killing**: Isolated neutrophils, pretreated them with IL8Fc, and performed LDH assays to assess their killing of tumor cells.',
                '**Neutrophil–T cell co-cultures**: Independently performed neutrophil isolation and fusion-protein treatment, tumor-cell plating and co-culture, addition of naïve OT-I cells, and subsequent flow staining and acquisition to examine how neutrophil–tumor interactions influence T cell activation and effector function.',
              ],
            },
          ],
        },
        {
          id: 'il4-il8-fc-experimental-progress',
          title: 'Experimental progress',
          blocks: [
            {
              type: 'heading',
              id: 'il4-il8-fc-direct-response',
              text: '1. Direct effects on CD8 T cells',
            },
            {
              type: 'paragraph',
              text: 'Treatment with IL4Fc or IL4–8Fc increased the frequency of CD44⁺CD62L⁻ CD8 T cells compared with the IgGFc control, consistent with a shift toward an effector phenotype (Fig. 2).',
            },
            {
              type: 'figure',
              id: 'il4-il8-fc-figure-5',
              src: '/static/images/research/systems-medicine/il4-il8-fc-cd8-differentiation.png',
              alt: 'Four CD44/CD62L flow plots above summary proportions of CD44-positive CD62L-positive and CD44-positive CD62L-negative CD8 T cells across IgGFc, IL4Fc, IL8Fc and IL4–8Fc',
              width: 1920,
              height: 1080,
              crop: { x: 340, y: 50, width: 1250, height: 990 },
              caption:
                'Fig. 2. CD8 T cell differentiation after fusion-protein treatment. Representative CD44/CD62L flow plots and summary proportions of CD44⁺CD62L⁺ and CD44⁺CD62L⁻ cells compare IgGFc, IL4Fc, IL8Fc and IL4–8Fc.',
            },
            {
              type: 'paragraph',
              text: 'Both treatments also increased the frequencies of GZMB⁺ and IFNγ⁺TNFα⁺ CD8 T cells relative to IgGFc (Fig. 3A–B). In contrast, the frequency of IL2⁺ cells was lower in both groups (Fig. 3C).',
            },
            {
              type: 'figure-group',
              id: 'il4-il8-fc-figure-6',
              panels: [
                {
                  label: 'A. GZMB',
                  src: '/static/images/research/systems-medicine/il4-il8-fc-direct-cd8-gzmb.png',
                  alt: 'Representative GZMB flow plots and GZMB-positive CD8 T cell proportions across IgGFc, IL4Fc, IL8Fc and IL4–8Fc',
                  width: 1920,
                  height: 1080,
                  crop: { x: 80, y: 300, width: 1680, height: 480 },
                },
                {
                  label: 'B. IFNγ / TNFα',
                  src: '/static/images/research/systems-medicine/il4-il8-fc-direct-cd8-ifng-tnfa.png',
                  alt: 'Representative IFNγ/TNFα flow plots and double-positive CD8 T cell proportions across IgGFc, IL4Fc, IL8Fc and IL4–8Fc',
                  width: 1920,
                  height: 1080,
                  crop: { x: 80, y: 300, width: 1680, height: 480 },
                },
                {
                  label: 'C. IL2',
                  src: '/static/images/research/systems-medicine/il4-il8-fc-direct-cd8-il2.png',
                  alt: 'Representative IL2 flow plots and IL2-positive CD8 T cell proportions across IgGFc, IL4Fc, IL8Fc and IL4–8Fc',
                  width: 1920,
                  height: 1080,
                  crop: { x: 80, y: 300, width: 1680, height: 480 },
                },
              ],
              caption:
                'Fig. 3. Effector-associated readouts after direct CD8 T cell treatment. Each panel pairs representative flow plots with the corresponding summary across IgGFc, IL4Fc, IL8Fc and IL4–8Fc: (A) GZMB⁺ cells, (B) IFNγ⁺TNFα⁺ cells and (C) IL2⁺ cells.',
            },
            {
              type: 'heading',
              id: 'il4-il8-fc-neutrophil-migration',
              text: '2. Neutrophil recruitment',
            },
            {
              type: 'paragraph',
              text: 'Human IL8 (hIL8, 10 ng/mL) and IL8Fc (100 µg/mL) both promoted neutrophil migration relative to the control. A CXCR2 inhibitor (10 µM) reduced migration in both groups, supporting a role for CXCR2 signaling in the chemotactic response (Fig. 4).',
            },
            {
              type: 'figure',
              id: 'il4-il8-fc-figure-7',
              src: '/static/images/research/systems-medicine/il8-fc-neutrophil-migration.png',
              alt: 'Six microscopy images and migrated neutrophil counts comparing control, human IL8 and IL8Fc, each with or without a CXCR2 inhibitor',
              width: 1920,
              height: 1080,
              crop: { x: 12, y: 125, width: 1896, height: 825 },
              caption:
                'Fig. 4. Neutrophil migration toward hIL8 and IL8Fc. Representative microscopy images and migrated-cell counts compare control, human IL8 (hIL8, 10 ng/mL) and IL8Fc (100 µg/mL), each with or without a CXCR2 inhibitor (CXCR2i, 10 µM). The legend label “non” indicates no inhibitor. Cell counts are reported in units of 10⁴.',
            },
            {
              type: 'heading',
              id: 'il4-il8-fc-coculture-response',
              text: '3. T cell responses in co-culture',
            },
            {
              type: 'paragraph',
              text: 'In co-cultures of protein-pretreated neutrophils, B16OVA tumor cells and naïve OT-I T cells, IL4–8Fc increased the expression of the activation markers CD44 and CD25 on T cells relative to IgGFc (Fig. 5).',
            },
            {
              type: 'figure',
              id: 'il4-il8-fc-figure-8',
              src: '/static/images/research/systems-medicine/il4-il8-fc-coculture.png',
              alt: 'Neutrophil–B16OVA–OT-I co-culture timeline and CD44 and CD25 flow cytometry results',
              width: 1920,
              height: 1080,
              crop: { x: 145, y: 80, width: 1685, height: 795 },
              caption:
                'Fig. 5. Co-culture design and T cell activation. Neutrophils were treated with IgGFc, IL4Fc, IL8Fc or IL4–8Fc on day 0. B16OVA cells were added on day 1, followed by naïve OT-I T cells and IL2 on day 2. CD44 and CD25 expression was assessed by flow cytometry on day 4. Histograms and MFI summaries are shown for each treatment.',
            },
            {
              type: 'paragraph',
              text: 'IL4–8Fc also increased the frequency of GZMB⁺ CD8 T cells, whereas IL4Fc and IL8Fc alone showed no significant difference from IgGFc. In the representative flow plots, GZMB⁺ cells accounted for 57.1% of CD8 T cells with IL4–8Fc and 13.7% with IgGFc (Fig. 6).',
            },
            {
              type: 'figure',
              id: 'il4-il8-fc-figure-9',
              src: '/static/images/research/systems-medicine/il4-il8-fc-gzmb.png',
              alt: 'Representative GZMB flow plots and a summary across IgGFc, IL4Fc, IL8Fc and IL4–8Fc conditions',
              width: 1920,
              height: 1080,
              crop: { x: 80, y: 300, width: 1710, height: 480 },
              caption:
                'Fig. 6. GZMB expression after co-culture. Representative flow plots and quantification of GZMB⁺ CD8 T cells following co-culture under the four protein-treatment conditions.',
            },
          ],
        },
        {
          id: 'il4-il8-fc-reflection',
          title: 'Reflection',
          blocks: [
            {
              type: 'list',
              items: [
                '**Evaluating function in biological context**: The activity of an engineered molecule depends on the cells and interactions around it. Testing across systems of increasing complexity helps establish how that activity changes in the environment where the molecule is intended to work.',
                '**Designing complementary functions**: Combining components starts with defining the role of each and how those roles contribute to a shared objective. Evaluating the combination alongside its individual components helps determine whether their functions work together as intended.',
                '**Interpreting functional profiles**: Biological responses can change in several directions at once. Interpreting multiple readouts in relation to the intended function helps identify useful changes and potential trade-offs that a single metric may miss.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'cxcl13-cxcr5',
      title: 'CXCL13Fc fusion protein and CXCR5-engineered CD8 T cells',
      navTitle: 'CXCL13Fc / CXCR5',
      sections: [
        {
          id: 'research-question',
          title: 'Research question & approach',
          blocks: [
            {
              type: 'paragraph',
              text: 'CXCL13 is a chemokine that attracts B cells and subsets of T cells through its receptor, CXCR5. The CXCL13–CXCR5 axis helps determine where these lymphocytes accumulate and interact. In tumors, one setting for these interactions is tertiary lymphoid structures (TLS): organized aggregates of immune cells that resemble lymphoid tissue.',
            },
            {
              type: 'paragraph',
              text: 'TLS are of interest in cancer immunotherapy because they have been associated with better tumor control and responses to treatment. CXCL13 provides a potential way to influence these structures. In nasopharyngeal carcinoma, CXCL13-producing T cells recruit B cells and colocalize with them in TLS ([Li et al., 2021](https://pmc.ncbi.nlm.nih.gov/articles/PMC8276302/)). In a mouse melanoma model, CXCL13-dependent B cell recruitment drove TLS expansion, and tumors with more and larger TLS responded better to checkpoint immunotherapy ([Rodriguez et al., 2021](https://pmc.ncbi.nlm.nih.gov/articles/PMC8362934/)).',
            },
            {
              type: 'paragraph',
              text: 'Our project asks whether engineering both sides of the CXCL13–CXCR5 axis can improve CD8 T cell recruitment and antitumor function. We pair CXCL13Fc (Fig. 7), designed to extend the circulating half-life of CXCL13, with CD8 T cells that overexpress CXCR5 to increase their responsiveness to the chemokine. We examine migration and tissue distribution, proliferation, cytotoxicity, stemness and memory-associated properties. The longer-term aim is to test whether this combination can promote TLS formation within tumors.',
            },
            {
              type: 'figure',
              src: '/static/images/research/systems-medicine/cxcl13-fc-molecular-design.png',
              alt: 'Schematic of CXCL13 fused to the two arms of an Fc scaffold',
              width: 1920,
              height: 1080,
              caption:
                'Fig. 7. CXCL13–Fc fusion protein design. Schematic showing CXCL13 linked to Fc.',
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
                '**Recombinant protein expression, purification and quality control**: Cultured and transfected 293F cells to express CXCL13Fc and the IgGFc control protein, then performed protein purification and endotoxin testing.',
                '**Engineered CD8 T cell preparation**: Repeatedly performed the full workflow, including viral packaging, mouse tissue processing, naïve CD8 T cell isolation and activation, viral transduction, and culture expansion.',
                '**Flow cytometry and data analysis**: Independently performed surface and intracellular staining, flow cytometric acquisition, and FlowJo analysis.',
                '**Mouse experiments**: Performed multiple rounds of ear tagging, tumor inoculation, and adoptive T cell transfer via tail-vein injection. Dissected mice and collected lymph nodes, spleen and bone marrow, and used flow cytometry on harvested tissues to assess T cell distribution *in vivo*.',
              ],
            },
          ],
        },
        {
          id: 'experimental-progress',
          title: 'Selected experimental results',
          blocks: [
            {
              type: 'paragraph',
              text: 'Our *in vitro* migration assay showed chemotactic activity of CXCL13Fc toward CXCR5⁺ T cells, with higher fusion-protein concentrations corresponding to more migrated cells. The assay included commercial mCXCL13 at 100 ng/mL as a reference and tested CXCL13Fc up to 10 µg/mL. Representative migration images are shown in Fig. 8. At 10 µg/mL CXCL13Fc, approximately 100,000 cells migrated, compared with approximately 35,000–36,000 in the control condition (Fig. 9).',
            },
            {
              type: 'figure',
              src: '/static/images/research/systems-medicine/cxcl13-fc-migration-images.png',
              alt: 'Representative microscopy images of migrated T cells under control, IgGFc, mCXCL13 and five CXCL13Fc concentration conditions',
              width: 1920,
              height: 1080,
              caption:
                'Fig. 8. Representative images of T cell migration. Conditions include control, IgGFc (10 µg/mL), commercial mCXCL13 (100 ng/mL), and CXCL13Fc at 100 ng/mL, 500 ng/mL, 1 µg/mL, 5 µg/mL and 10 µg/mL.',
            },
            {
              type: 'figure',
              src: '/static/images/research/systems-medicine/cxcl13-fc-migration-quantification.png',
              alt: 'Migrated CXCR5-positive T cell counts for the conditions shown in Fig. 8',
              width: 1920,
              height: 1080,
              caption:
                'Fig. 9. Quantification of T cell migration. Migrated CXCR5⁺ T cell counts for the conditions shown in Fig. 8. The y-axis reports cell number in units of 10⁴. n = 1 per condition.',
            },
          ],
        },
        {
          id: 'reflection',
          title: 'Reflection',
          blocks: [
            {
              type: 'list',
              items: [
                '**Engineering interacting components**: Engineering can target multiple components of a biological system together. Complementary changes can improve how those components interact and strengthen the desired response.',
                '**Breaking research goals into testable questions**: A broad research goal can be broken down into smaller questions, each linked to a measurable readout. Testing these questions step by step, then considering the results together, provides a way to evaluate the larger idea.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'cesome',
      title: 'Cesome exploration for plasmid endotoxin removal',
      navTitle: 'Cesome',
      sections: [
        {
          id: 'cesome-research-question',
          title: 'Research question & approach',
          blocks: [
            {
              type: 'paragraph',
              text: 'Plasmids were used across all projects, and residual endotoxin was a persistent problem in their preparation. Treatment with the endotoxin-removal kit used at the time did not provide adequate clearance. I proposed evaluating Cesome and Cecelle for endotoxin removal, with the aim of developing a plasmid-recovery protocol for subsequent transfection.',
            },
            {
              type: 'paragraph',
              text: 'Cesome and Cecelle are two cerium-containing materials developed in my parents’ research group. They differ in how cerium ions are incorporated: Cesome forms hollow spheres with cerium ions on the inner wall, whereas Cecelle has a core–shell structure with cerium ions in its core.',
            },
            {
              type: 'paragraph',
              text: 'Previous work in the group examined ROS/RNS scavenging and macrophage polarization following Cesome treatment in an LPS-stimulated model. Their observations included a shift from M1-like toward M2-like states and a substantial reduction in ROS/RNS that persisted throughout the observation period. Discussions of these findings led us to hypothesize that Cesome might also act directly on LPS, the initiating stimulus. Published work on an engineered cerium oxide (CeO₂) nanozyme has also demonstrated LPS hydrolysis, providing a precedent for evaluating cerium-containing materials against endotoxin ([Jin et al., 2026](https://www.nature.com/articles/s41467-026-74689-3)). I evaluated this hypothesis in LPS solutions before investigating plasmid treatment and recovery.',
            },
          ],
        },
        {
          id: 'cesome-my-contribution',
          title: 'My contribution',
          blocks: [
            {
              type: 'list',
              items: [
                '**Experimental design**: Proposed the plasmid-endotoxin application and independently designed the Cesome/Cecelle screen, the five-concentration Cesome series and their controls.',
                '**Endotoxin assays**: Independently prepared and treated samples, tested LPS dilutions and endotoxin standards, and ran material-only, unloaded-polymer and reagent controls. Plotted the readings and fitted standard curves in Prism.',
                '**Plasmid-recovery protocol development**: Designed and tested ethanol precipitation and centrifugation with DNA-only, Cesome-only and mixed samples. Collected supernatants and resuspended fractions, and revised the planned washing and resuspension steps after examining the results.',
                '**DLS and NanoDrop measurements**: At Soochow University, used DLS to examine material size and scattering signals after treatment, and NanoDrop to measure DNA concentrations in supernatants and resuspended fractions.',
              ],
            },
          ],
        },
        {
          id: 'cesome-research-decisions',
          title: 'Research decisions',
          blocks: [
            {
              type: 'list',
              items: [
                '**Overall study design**: I divided the overall objective into a sequence of testable questions and used targeted controls to distinguish treatment responses from background signals and processing effects. Results at each stage informed the next comparison or adjustment.',
                '**Design of individual experiments**: I matched the number of conditions to assay capacity and handling requirements. When throughput was limited, I prioritized independently prepared and treated replicates while reducing the number of concentration levels, so that consistency within each condition could be assessed.',
              ],
            },
          ],
        },
        {
          id: 'cesome-experimental-progress',
          title: 'Experimental progress',
          blocks: [
            {
              type: 'heading',
              id: 'cesome-initial-screen',
              text: 'Material selection and concentration response',
            },
            {
              type: 'paragraph',
              text: 'In the initial screen, the Cesome-treated LPS sample gave a reading close to background, while the LPS-only control remained high (Fig. 10). Cecelle showed high signals even without added LPS. These findings supported further testing of Cesome and prompted a separate investigation of Cecelle-associated background.',
            },
            {
              type: 'figure',
              id: 'cesome-figure-10',
              src: '/static/images/research/systems-medicine/cesome-initial-screen.png',
              alt: 'Initial screen comparing all six OD405 readings: no material, Cecelle and Cesome, each with and without LPS',
              width: 1920,
              height: 1230,
              caption:
                'Fig. 10. Initial material screen. Gray bars show no-LPS controls; blue bars show samples with added LPS. Each bar represents one recorded OD405 reading, with the value labeled above it.',
              size: 'medium',
            },
            {
              type: 'paragraph',
              text: 'Across the concentration series, lower concentrations produced little change or variable responses. At 50 µg/mL Ce, all three independently treated samples approached background, providing a starting condition for protocol development (Fig. 11).',
            },
            {
              type: 'figure',
              id: 'cesome-figure-11',
              src: '/static/images/research/systems-medicine/cesome-concentration-controls.png',
              alt: 'OD405 readings at five Ce concentrations including zero, comparing three LPS-containing samples and one no-LPS control per concentration',
              width: 2220,
              height: 1320,
              caption:
                'Fig. 11. Cesome concentration series with controls. Filled circles show three separately prepared and treated samples containing 10 ng/mL LPS at each Ce concentration; horizontal bars mark their means. Open squares show one no-LPS control per concentration. At 0 Ce, these correspond to LPS-only and reagent-background controls, respectively. Concentrations are displayed as discrete groups.',
            },
            {
              type: 'heading',
              id: 'cesome-material-background',
              text: 'Investigating material background',
            },
            {
              type: 'paragraph',
              text: 'Both Cecelle and the unloaded polymer produced elevated signals without added LPS (Fig. 12). The background was therefore present even without Ce loading, identifying the polymer and its preparation reagents as possible sources requiring further investigation.',
            },
            {
              type: 'figure',
              id: 'cesome-figure-12',
              src: '/static/images/research/systems-medicine/cesome-material-background.png',
              alt: 'OD405 readings for water, Cecelle and unloaded polymer, each with and without LPS',
              width: 1920,
              height: 1230,
              caption:
                'Fig. 12. Material-background controls. Filled circles show three LPS-containing samples per condition, with means marked by horizontal bars. Open squares show one no-LPS control per condition. The polymer control contains no loaded Ce.',
              size: 'medium',
            },
            {
              type: 'heading',
              id: 'cesome-protocol-development',
              text: 'Plasmid treatment and recovery',
            },
            {
              type: 'paragraph',
              text: 'The DNA-only control also gave no detectable DNA signal in the resuspended fraction (Fig. 13), showing that recovery required troubleshooting independently of Cesome. I suspected pellet loss during washing and planned changes to liquid removal and resuspension. DLS observations after prolonged ethanol exposure also suggested changes in material state, making ethanol compatibility another consideration for separation.',
            },
            {
              type: 'figure',
              id: 'cesome-figure-13',
              src: '/static/images/research/systems-medicine/cesome-nanodrop-readings.png',
              alt: 'Table of recorded NanoDrop concentrations for DNA-only, Cesome-only and mixed samples, distinguishing recorded zero readings from missing values',
              width: 2280,
              height: 825,
              caption:
                'Fig. 13. NanoDrop measurements during protocol development. Concentrations are shown for supernatants and resuspended fractions after ethanol precipitation and centrifugation. The two values for DNA + Cesome at 15,000 × g are separate recorded readings. Dashes indicate unrecorded values; zeros are explicit zero readings. The separately measured DNA stock was 93.8 µg/mL.',
            },
            {
              type: 'paragraph',
              text: 'The final plasmid trial did not reproduce the near-background signal seen in the initial LPS screen (Fig. 14). The experimental group remained similar to the plasmid-only control, and elevated Cesome-only and reagent backgrounds complicated interpretation. Work stopped at endotoxin testing, leaving treatment performance, background control and DNA recovery unresolved.',
            },
            {
              type: 'figure',
              id: 'cesome-figure-14',
              src: '/static/images/research/systems-medicine/cesome-plasmid-trial.png',
              alt: 'Recorded OD405 values for endotoxin-free water, plasmid only, Cesome only and the experimental group in the final plasmid trial',
              width: 1920,
              height: 1230,
              caption:
                'Fig. 14. Plasmid trial with material and water controls. Points show the recorded readings: two for plasmid only, three for Cesome only, three for the experimental group and one for endotoxin-free water. Horizontal bars mark group means where multiple readings are available. The experimental group is shown in blue.',
              size: 'medium',
            },
          ],
        },
        {
          id: 'cesome-reflection',
          title: 'Reflection',
          blocks: [
            {
              type: 'list',
              items: [
                '**Evaluating practical value**: A method’s value depends on performance in its intended use, compatibility with subsequent steps and implementation costs. Interpreting that performance also requires understanding how the intervention and measurement system jointly shape the observed response.',
                '**Finding new applications in existing observations**: Connecting observations from one research context with practical needs in another can generate new application hypotheses. Mechanistic understanding can develop alongside the exploration of those applications.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'tgfb-receptor',
      title: 'TGFβ signal-switching receptor engineering',
      navTitle: 'TGFβ receptor',
      sections: [
        {
          id: 'tgfb-receptor-research-question',
          title: 'Research question & approach',
          blocks: [
            {
              type: 'paragraph',
              text: 'TGFβ in the tumor microenvironment can suppress CD8 T cell cytotoxic function ([Thomas and Massagué, 2005](https://pubmed.ncbi.nlm.nih.gov/16286245/)). IL4 signaling has been shown to support the function of exhausted CD8 T cells in experimental tumor models ([Feng et al., 2024](https://www.nature.com/articles/s41586-024-07962-4)). These findings provide a rationale for redirecting the T cell response to TGFβ toward IL4-associated signaling.',
            },
            {
              type: 'paragraph',
              text: 'The chimeric receptor combines the extracellular TGFβ-binding domain of TGFβRII, a CD8α transmembrane domain and the intracellular signaling domain of IL4Rα. Expressed on engineered CD8 T cells, it is designed to couple TGFβ recognition to IL4Rα-associated intracellular signaling, with the aim of supporting T cell effector function.',
            },
            {
              type: 'paragraph',
              text: 'The initial objective is to establish TGFβ binding and activation of IL4-associated signaling, using STAT6 phosphorylation as a downstream readout. The longer-term goal is to improve antitumor activity after adoptive transfer, compared with vector-transduced T cells in tumor-bearing mice.',
            },
          ],
        },
        {
          id: 'tgfb-receptor-my-contribution',
          title: 'My contribution',
          blocks: [
            {
              type: 'list',
              items: [
                '**Engineered T cell preparation and culture**: Performed viral packaging of the TGFβRII–IL4Rα receptor construct, naïve T cell isolation and activation, viral transduction, cell counting and culture expansion to prepare receptor-expressing and vector-control cells. Followed culture conditions across multiple experimental rounds.',
              ],
            },
          ],
        },
        {
          id: 'tgfb-receptor-experimental-progress',
          title: 'Selected experimental results',
          blocks: [
            {
              type: 'paragraph',
              text: 'According to Jiajia Wang, TGFβ stimulation did not induce detectable STAT6 phosphorylation in cells expressing the engineered receptor.',
            },
          ],
        },
      ],
    },
  ],
  development: {
    id: 'research-development',
    title: 'Research development',
    blocks: [
      {
        type: 'paragraph',
        text: 'Through independent study and experimental work, I developed a foundation in immunology and studied how cytokine and receptor engineering can alter cell recruitment, responses to signals and interactions between cells. Connecting these molecular interventions to cellular behavior strengthened my interest in designing biological systems with new functions and developing methods to test and refine them.',
      },
    ],
  },
  references: {
    id: 'references',
    title: 'References',
    entries: [
      'Feng, B., Bai, Z., Zhou, X., et al. (2024). [The type 2 cytokine Fc–IL-4 revitalizes exhausted CD8⁺ T cells against cancer](https://www.nature.com/articles/s41586-024-07962-4). *Nature*, 634, 712–720. DOI: 10.1038/s41586-024-07962-4.',
      'Hirschhorn, D., Budhu, S., Kraehenbuehl, L., et al. (2023). [T cell immunotherapies engage neutrophils to eliminate tumor antigen escape variants](https://pubmed.ncbi.nlm.nih.gov/37001503/). *Cell*, 186(7), 1432–1447.e17. DOI: 10.1016/j.cell.2023.03.007.',
      'Jin, L., Zhang, C., Yi, H., et al. (2026). [Lipopolysaccharide hydrolysis-targeting nano-chimeras detoxify endotoxin through specific adsorption and efficient degradation](https://www.nature.com/articles/s41467-026-74689-3). *Nature Communications*, 17, 7814. DOI: 10.1038/s41467-026-74689-3.',
      'Li, J. P., Wu, C. Y., Chen, M. Y., et al. (2021). [PD-1⁺CXCR5⁻CD4⁺ Th-CXCL13 cell subset drives B cells into tertiary lymphoid structures of nasopharyngeal carcinoma](https://pmc.ncbi.nlm.nih.gov/articles/PMC8276302/). *Journal for ImmunoTherapy of Cancer*, 9(7), e002101. DOI: 10.1136/jitc-2020-002101.',
      'Rodriguez, A. B., Peske, J. D., Woods, A. N., et al. (2021). [Immune mechanisms orchestrate tertiary lymphoid structures in tumors via cancer-associated fibroblasts](https://pmc.ncbi.nlm.nih.gov/articles/PMC8362934/). *Cell Reports*, 36(3), 109422. DOI: 10.1016/j.celrep.2021.109422.',
      'Tang, Z., Hu, J., Li, X. C., et al. (2025). [A subset of neutrophils activates anti-tumor immunity and inhibits non-small-cell lung cancer progression](https://pubmed.ncbi.nlm.nih.gov/39515330/). *Developmental Cell*, 60(3), 379–395.e8. DOI: 10.1016/j.devcel.2024.10.010.',
      'Thomas, D. A., & Massagué, J. (2005). [TGF-beta directly targets cytotoxic T cell functions during tumor evasion of immune surveillance](https://pubmed.ncbi.nlm.nih.gov/16286245/). *Cancer Cell*, 8(5), 369–380. DOI: 10.1016/j.ccr.2005.10.012.',
      'Yoshimura, T., Matsushima, K., Tanaka, S., et al. (1987). [Purification of a human monocyte-derived neutrophil chemotactic factor that has peptide sequence similarity to other host defense cytokines](https://pubmed.ncbi.nlm.nih.gov/3480540/). *Proceedings of the National Academy of Sciences of the USA*, 84(24), 9233–9237. DOI: 10.1073/pnas.84.24.9233.',
    ],
  },
}

export default cxcl13Data
