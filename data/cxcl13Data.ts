export type Cxcl13Block =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | {
      type: 'figure'
      src: string
      alt: string
      width: number
      height: number
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
        text: 'I joined the ongoing doctoral research of Jiajia Wang, a senior PhD candidate in Lianjun Zhang’s group at the Suzhou Institute of Systems Medicine. My work explores how engineered receptors and immunomodulatory fusion proteins might change where T cells accumulate and how they function. I contribute to four experimental research lines, connecting repeated laboratory practice with questions about what an experiment can establish and how its readout should guide the next decision.',
      },
      {
        type: 'paragraph',
        text: 'Lianjun Zhang guides the overall research direction. Within Jiajia Wang’s ongoing doctoral research, I carry out the experimental and analytical work described below, performing procedures independently and working together with her on parts of the studies. We discuss experimental difficulties and data interpretation; she has been present throughout my mouse procedures. I also proposed the Cesome application and designed its experiments.',
      },
      {
        type: 'paragraph',
        text: 'The experimental results presented below come from our shared research work. The contribution sections describe my own involvement, while the figures show the progress of the studies we worked on together. The Cesome figures come from my experiments and analysis.',
      },
      {
        type: 'paragraph',
        text: 'From January to March 2026, I studied immunology textbooks and read research literature. I have been carrying out experimental work since late March 2026.',
      },
      {
        type: 'paragraph',
        text: 'My experimental experience during this period also includes Ficoll separation of human peripheral blood mononuclear cells (PBMCs) and Transwell cell migration assays.',
      },
    ],
  },
  projects: [
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
              text: 'CXCL13 is a chemokine that directs the migration and positioning of B cells and subsets of T cells through its receptor CXCR5, contributing to the spatial organization of immune cells ([Li et al., 2021](https://pmc.ncbi.nlm.nih.gov/articles/PMC8276302/)). Tertiary lymphoid structures (TLS) are lymphoid-like structures that form in tumors or chronically inflamed tissues. CXCL13-mediated B-cell recruitment contributes to TLS formation and expansion in some tumor models, and TLS have been associated with stronger antitumor immunity and treatment responses in some cancer studies. These findings provide a rationale for exploring the CXCL13–CXCR5 axis as a way to influence local immune-cell distribution and TLS formation ([Rodriguez et al., 2021](https://pmc.ncbi.nlm.nih.gov/articles/PMC8362934/)).',
            },
            {
              type: 'paragraph',
              text: 'Against this background, the main project investigates whether combining CXCL13Fc (Fig. 1) with CXCR5 overexpression can influence CD8 T cell localization, effector function, stemness maintenance and immune memory. The Fc fusion is intended to extend ligand exposure, while receptor overexpression is intended to increase cellular responsiveness. My work focuses on cellular properties as part of the longer-term investigation of TLS formation.',
            },
            {
              type: 'figure',
              src: '/static/images/research/systems-medicine/cxcl13-fc-molecular-design.png',
              alt: 'Schematic of CXCL13 fused to the two arms of an Fc scaffold',
              width: 1920,
              height: 1080,
              caption:
                'Fig. 1. CXCL13–Fc fusion protein design. Schematic showing CXCL13 linked to Fc.',
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
                'Recombinant protein expression, purification and quality control: Cultured and transfected 293F cells to express CXCL13Fc and the IgGFc control protein, then performed protein purification and endotoxin testing.',
                'Engineered CD8 T cell preparation: Independently completed multiple rounds of the full workflow, including viral packaging, mouse tissue processing, naïve CD8 T cell isolation and activation, viral transduction, and culture expansion. Adjusted polybrene conditions according to the plans agreed through discussion.',
                'Flow cytometry and data analysis: Independently performed surface and intracellular staining, flow cytometric acquisition, and FlowJo analysis to assess differences between groups and their possible explanations.',
                'Mouse experiments: Repeatedly performed ear tagging, tumor inoculation, and adoptive T cell transfer via tail-vein injection. Dissected mice and collected lymph nodes, spleen and bone marrow, and used flow cytometry on harvested tissues to assess T cell distribution in vivo.',
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
              text: 'Our in vitro experiment showed chemotactic activity of CXCL13Fc toward CXCR5⁺ T cells, with higher fusion-protein concentrations corresponding to more migrated cells. Representative migration images are shown in Fig. 2, and Fig. 3 shows approximately 100,000 cells at 10 µg/mL CXCL13Fc, compared with approximately 35,000–36,000 in the control condition. This result provides a basis for further investigation of the axis in cell localization.',
            },
            {
              type: 'figure',
              src: '/static/images/research/systems-medicine/cxcl13-fc-migration-images.png',
              alt: 'Representative microscopy images of migrated T cells under control, IgGFc, mCXCL13 and five CXCL13Fc concentration conditions',
              width: 1920,
              height: 1080,
              caption:
                'Fig. 2. Representative images of T cell migration. Conditions include control, IgGFc (10 µg/mL), commercial mCXCL13 (100 ng/mL), and CXCL13Fc at 100 ng/mL, 500 ng/mL, 1 µg/mL, 5 µg/mL and 10 µg/mL.',
            },
            {
              type: 'figure',
              src: '/static/images/research/systems-medicine/cxcl13-fc-migration-quantification.png',
              alt: 'Migrated CXCR5-positive T cell counts for the conditions shown in Fig. 2',
              width: 1920,
              height: 1080,
              caption:
                'Fig. 3. Quantification of T cell migration. Migrated CXCR5⁺ T cell counts for the conditions shown in Fig. 2. The y-axis reports cell number in units of 10⁴. n = 1 per condition.',
            },
          ],
        },
        {
          id: 'reflection',
          title: 'Reflection',
          blocks: [
            {
              type: 'paragraph',
              text: '*To be discussed.*',
            },
          ],
        },
      ],
    },
    {
      id: 'il4-il8-fc',
      title: 'IL4 and IL8 Fc fusion proteins',
      navTitle: 'IL4 / IL8 Fc',
      sections: [
        {
          id: 'il4-il8-fc-research-question',
          title: 'Research question & approach',
          blocks: [
            {
              type: 'paragraph',
              text: 'T cell immunotherapy depends on specific recognition of tumor antigens, but antigen heterogeneity within tumors and antigen loss during treatment can allow some tumor cells to escape immune clearance. Neutrophils offer a complementary approach: in specific T cell immunotherapy models, they have been shown to help eliminate tumor antigen escape variants, providing a rationale for connecting antigen-dependent and antigen-independent antitumor responses ([Hirschhorn et al., 2023](https://pubmed.ncbi.nlm.nih.gov/37001503/)).',
            },
            {
              type: 'paragraph',
              text: 'IL4 and IL8 provide ways to engage these two cell populations. Fc–IL4 can act directly on CD8 T cells to improve their metabolism and effector function in specific tumor models ([Feng et al., 2024](https://www.nature.com/articles/s41586-024-07962-4)). IL8 induces neutrophil migration ([Yoshimura et al., 1987](https://pubmed.ncbi.nlm.nih.gov/3480540/)); in an IL8-humanized mouse model of lung cancer, it also promotes a neutrophil subset capable of antigen cross-presentation, enhancing antitumor T cell responses ([Tang et al., 2025](https://pubmed.ncbi.nlm.nih.gov/39515330/)). These findings suggest that neutrophils may both contribute to tumor clearance and support T cell responses.',
            },
            {
              type: 'paragraph',
              text: 'The project therefore combines IL4 and IL8 in an IL4-8Fc fusion protein (Fig. 4), aiming to enhance T cell effector function through the IL4 arm and recruit neutrophils through the IL8 arm. The research first examines whether each component retains its biological activity after fusion, then investigates whether the protein promotes functional cooperation between the two cell populations. Experiments compare responses to IgGFc, IL4Fc, IL8Fc and IL4-8Fc, using neutrophil–tumor–T cell co-cultures to examine how protein treatment affects subsequent T cell activation and effector function.',
            },
            {
              type: 'figure',
              src: '/static/images/research/systems-medicine/il4-il8-fc-molecular-design.png',
              alt: 'Schematic showing IL4 and IL8 on the two arms of an Fc fusion protein',
              width: 1920,
              height: 1080,
              caption:
                'Fig. 4. IL4–IL8–Fc fusion protein design. Schematic showing IL4 and IL8 linked through an Fc scaffold.',
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
                'Recombinant protein expression, purification and quality control: Cultured and transfected 293F cells to express Fc-related proteins, then performed protein purification and endotoxin testing.',
                'IL4 activity assays: Stimulated cells after Th2 induction, performed intracellular IL4 staining and flow cytometry, and used Th2-associated responses as a readout of IL4 function.',
                'Direct effects on T cells: Participated in CD8 T cell experiments comparing IgGFc, IL4Fc, IL8Fc and IL4-8Fc, using flow cytometry to assess survival, differentiation and effector-associated phenotypes.',
                'Neutrophil-mediated tumor-cell killing: Isolated neutrophils, pretreated them with IL8Fc, and performed LDH assays to assess their killing of tumor cells.',
                'Neutrophil–T cell co-cultures: Independently performed neutrophil isolation and fusion-protein treatment, tumor-cell plating and co-culture, addition of naïve OT-I cells, and subsequent flow staining and acquisition to examine how neutrophil–tumor interactions influence T cell activation and effector function.',
              ],
            },
          ],
        },
        {
          id: 'il4-il8-fc-experimental-progress',
          title: 'Experimental progress',
          blocks: [
            {
              type: 'paragraph',
              text: 'In our co-culture experiments, the IL4-8Fc condition showed higher CD44 and CD25 fluorescence than the IgGFc condition (Fig. 5). This connected the protein-treatment strategy to measurable changes in OT-I activation-associated markers.',
            },
            {
              type: 'figure',
              src: '/static/images/research/systems-medicine/il4-il8-fc-coculture.png',
              alt: 'Neutrophil–B16OVA–OT-I co-culture timeline and CD44 and CD25 flow cytometry results',
              width: 2720,
              height: 1287,
              caption:
                'Fig. 5. Co-culture design and activation-associated readouts. Neutrophils receive protein treatment on day 0, followed by B16OVA on day 1 and naïve OT-I with IL2 on day 2; flow cytometry is performed on day 4. The four protein conditions are shown alongside CD44 and CD25 fluorescence distributions and MFI summaries. These readouts track changes in T cell activation-associated markers.',
            },
            {
              type: 'paragraph',
              text: 'The same research sequence also showed a higher proportion of GZMB⁺ cells among CD8 T cells in the IL4-8Fc condition. Representative flow plots display 57.1% with IL4-8Fc and 13.7% with IgGFc (Fig. 6).',
            },
            {
              type: 'figure',
              src: '/static/images/research/systems-medicine/il4-il8-fc-gzmb.png',
              alt: 'Representative GZMB flow plots and a summary across IgGFc, IL4Fc, IL8Fc and IL4-8Fc conditions',
              width: 2720,
              height: 1287,
              caption:
                'Fig. 6. GZMB expression after co-culture. Representative flow plots and summary results compare the four protein conditions, showing gates, data points and significance annotations. Source: IL4–IL8Fc presentation, slide 15.',
            },
          ],
        },
        {
          id: 'il4-il8-fc-reflection',
          title: 'Reflection',
          blocks: [
            {
              type: 'paragraph',
              text: '*To be discussed.*',
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
              text: 'Residual endotoxin (lipopolysaccharide, LPS) in plasmid preparations can affect transfection efficiency in sensitive cells and trigger nonspecific immune responses that complicate subsequent experiments. Endotoxin control is therefore part of experimental material quality management ([QIAGEN, 2024](https://www.qiagen.com/en-US/resources/download/KitHandbook/hb-1194-003-hb-endofree-plasmid-purif-1124-ww)). For this project, a treatment method also needed to support plasmid recovery and subsequent use in cell experiments.',
            },
            {
              type: 'paragraph',
              text: 'Endotoxin in CXCL13Fc plasmid preparations prompted a separate question about experimental materials. I proposed testing Cesome, a material from my parents’ research group that had previously been studied for ROS removal. Discussions with them led to the hypothesis that it might also act on LPS. I received prepared materials and designed the tests of this application.',
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
                'Application proposal and experimental design: Proposed using Cesome to treat endotoxin in plasmid preparations and independently designed material comparisons, concentration series and controls.',
                'Sample treatment and endotoxin testing: Independently prepared and treated samples and measured endotoxin, examining how materials, concentrations and background signals affected the readouts.',
                'Treatment and plasmid-recovery protocol development: Independently designed and iterated a protocol integrating Cesome treatment, material separation and plasmid recovery, with downstream transfection as the intended application. Set up DNA-only, Cesome-only and mixed-sample controls, compared ethanol precipitation and centrifugation conditions, and revised washing and resuspension plans in response to experimental observations.',
                'Material characterization and DNA quantification: Used dynamic light scattering (DLS) at Soochow University to examine Cesome particle size and scattering signals under different treatment conditions. Combined this with NanoDrop measurements of DNA in supernatants and resuspended samples to assess material behavior and plasmid recovery.',
                'Data analysis: Organized assay readings, plotted data and fitted standard curves in Prism, and assessed the measurements alongside standards and background signals.',
              ],
            },
          ],
        },
        {
          id: 'cesome-research-decisions',
          title: 'Research decisions',
          blocks: [
            {
              type: 'paragraph',
              text: 'The assay imposed a practical constraint: small liquid volumes, sequential mixing and short incubations limited the number of samples I could handle reliably. I therefore generally preserved three separately prepared and treated samples per condition while reducing the number of concentration levels.',
            },
          ],
        },
        {
          id: 'cesome-experimental-progress',
          title: 'Experimental progress',
          blocks: [
            {
              type: 'paragraph',
              text: 'In the 29 July experiment, I tested five Ce concentrations, including a zero-material control. At 50 µg/mL Ce, the mean OD405 was 0.068, compared with 0.643 without Ce, with three samples per LPS-containing condition. The nonzero concentrations are shown in Fig. 7. The standard curve from the same experiment was non-monotonic (Fig. 8), so this round is presented as a comparison of raw OD405 readings.',
            },
            {
              type: 'figure',
              src: '/static/images/research/systems-medicine/cesome-od405.png',
              alt: 'Original OD405 readings across four nonzero Ce concentrations in the 29 July Cesome experiment',
              width: 2204,
              height: 1244,
              caption:
                'Fig. 7. OD405 readings across the concentration series. The plot shows three separately prepared and treated samples at each of four nonzero Ce concentrations, with a line connecting group means. The zero-Ce control is reported in the main text. My experimental record and Prism analysis, 29 July 2026.',
            },
            {
              type: 'figure',
              src: '/static/images/research/systems-medicine/cesome-standard-curve.png',
              alt: 'Non-monotonic endotoxin standard response from the same 29 July experiment',
              width: 1260,
              height: 752,
              caption:
                'Fig. 8. Endotoxin standard response. The standard curve from the same experiment shows a non-monotonic response, documenting the calibration issue encountered in this round. My experimental record and Prism analysis, 29 July 2026.',
            },
            {
              type: 'paragraph',
              text: 'On 4 August, I extended the work to development of the treatment and recovery protocol, comparing centrifugation conditions and using NanoDrop and DLS at Soochow University to assess DNA recovery and Cesome material behavior. Observations from that round focused subsequent protocol revisions on retaining the pellet, washing and resuspension. The final experiment on 12 August ended at the endotoxin-detection stage after unsuccessful LPS removal.',
            },
          ],
        },
        {
          id: 'cesome-reflection',
          title: 'Reflection',
          blocks: [
            {
              type: 'paragraph',
              text: '*To be discussed.*',
            },
          ],
        },
      ],
    },
    {
      id: 'tb4',
      title: 'TGFβ signal-switching receptor engineering (TB4)',
      navTitle: 'TGFβ receptor / TB4',
      sections: [
        {
          id: 'tb4-research-question',
          title: 'Research question & approach',
          blocks: [
            {
              type: 'paragraph',
              text: 'TGFβ is an immunosuppressive signal in the tumor microenvironment that can inhibit cytotoxic T cell effector function and limit antitumor activity ([Thomas and Massagué, 2005](https://pubmed.ncbi.nlm.nih.gov/16286245/)). This raises a receptor-engineering question: can the T cell response to this external signal be altered to trigger a different intracellular pathway?',
            },
            {
              type: 'paragraph',
              text: 'The TB4 strategy couples the extracellular recognition domain of TGFβRII to IL4Rα-associated intracellular signaling, aiming to turn TGFβ recognition into a signal that promotes T cell activation and effector function. The research plan examines receptor binding to TGFβ, IL4-associated downstream signaling such as STAT6 phosphorylation, and the antitumor activity of the engineered T cells relative to vector controls.',
            },
          ],
        },
        {
          id: 'tb4-my-contribution',
          title: 'My contribution',
          blocks: [
            {
              type: 'list',
              items: [
                'Engineered T cell preparation and culture: Performed viral packaging of the TGFβRII–IL4Rα receptor construct, naïve T cell isolation and activation, viral transduction, cell counting and culture expansion to prepare TB4 and vector-control cells. Followed culture conditions across multiple experimental rounds.',
              ],
            },
          ],
        },
        {
          id: 'tb4-experimental-progress',
          title: 'Selected experimental results',
          blocks: [
            {
              type: 'paragraph',
              text: 'Two documented rounds included three TB4 transduction wells on 30 June and four on 6 July, with vector controls cultured in parallel. I counted 3.65 million TB4 cells in the first round, and the second culture was subsequently expanded to six wells. These experiments provided cell cultures for subsequent receptor-function studies.',
            },
            {
              type: 'paragraph',
              text: 'In subsequent testing of the TB4 response to TGFβ, no activation of downstream STAT6 phosphorylation was detected, according to Jiajia Wang.',
            },
          ],
        },
        {
          id: 'tb4-reflection',
          title: 'Reflection',
          blocks: [
            {
              type: 'paragraph',
              text: '*To be discussed.*',
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
        text: '*To be discussed together with application goals.*',
      },
    ],
  },
  references: {
    id: 'references',
    title: 'References',
    entries: [
      'Feng, B., Bai, Z., Zhou, X., et al. (2024). [The type 2 cytokine Fc–IL-4 revitalizes exhausted CD8⁺ T cells against cancer](https://www.nature.com/articles/s41586-024-07962-4). *Nature*, 634, 712–720. DOI: 10.1038/s41586-024-07962-4.',
      'Hirschhorn, D., Budhu, S., Kraehenbuehl, L., et al. (2023). [T cell immunotherapies engage neutrophils to eliminate tumor antigen escape variants](https://pubmed.ncbi.nlm.nih.gov/37001503/). *Cell*, 186(7), 1432–1447.e17. DOI: 10.1016/j.cell.2023.03.007.',
      'Li, J. P., Wu, C. Y., Chen, M. Y., et al. (2021). [PD-1⁺CXCR5⁻CD4⁺ Th-CXCL13 cell subset drives B cells into tertiary lymphoid structures of nasopharyngeal carcinoma](https://pmc.ncbi.nlm.nih.gov/articles/PMC8276302/). *Journal for ImmunoTherapy of Cancer*, 9(7), e002101. DOI: 10.1136/jitc-2020-002101.',
      'QIAGEN. (2024). [EndoFree Plasmid Purification Handbook](https://www.qiagen.com/en-US/resources/download/KitHandbook/hb-1194-003-hb-endofree-plasmid-purif-1124-ww). November 2024 edition.',
      'Rodriguez, A. B., Peske, J. D., Woods, A. N., et al. (2021). [Immune mechanisms orchestrate tertiary lymphoid structures in tumors via cancer-associated fibroblasts](https://pmc.ncbi.nlm.nih.gov/articles/PMC8362934/). *Cell Reports*, 36(3), 109422. DOI: 10.1016/j.celrep.2021.109422.',
      'Tang, Z., Hu, J., Li, X. C., et al. (2025). [A subset of neutrophils activates anti-tumor immunity and inhibits non-small-cell lung cancer progression](https://pubmed.ncbi.nlm.nih.gov/39515330/). *Developmental Cell*, 60(3), 379–395.e8. DOI: 10.1016/j.devcel.2024.10.010.',
      'Thomas, D. A., & Massagué, J. (2005). [TGF-beta directly targets cytotoxic T cell functions during tumor evasion of immune surveillance](https://pubmed.ncbi.nlm.nih.gov/16286245/). *Cancer Cell*, 8(5), 369–380. DOI: 10.1016/j.ccr.2005.10.012.',
      'Yoshimura, T., Matsushima, K., Tanaka, S., et al. (1987). [Purification of a human monocyte-derived neutrophil chemotactic factor that has peptide sequence similarity to other host defense cytokines](https://pubmed.ncbi.nlm.nih.gov/3480540/). *Proceedings of the National Academy of Sciences of the USA*, 84(24), 9233–9237. DOI: 10.1073/pnas.84.24.9233.',
    ],
  },
}

export default cxcl13Data
