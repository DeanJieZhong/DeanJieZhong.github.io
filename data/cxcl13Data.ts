interface Cxcl13Section {
  id: string
  title: string
  paragraphs?: string[]
  items?: { title: string; body: string }[]
  paragraphsAfter?: string[]
  subsections?: { id: string; title: string; paragraphs: string[] }[]
}

// Local draft mirrored in Obsidian: CD8_CXCL13Fc_CXCR5.md, Draft 1.
const cxcl13Data: { overview: string[]; sections: Cxcl13Section[] } = {
  overview: [
    'This project explores how CXCL13–Fc and CXCR5 overexpression might influence CD8⁺ T-cell distribution, proliferation, cytotoxicity, and stemness-associated features. The Fc fusion was intended to extend the duration of the CXCL13 signal, while CXCR5 overexpression was intended to increase cellular responsiveness. A longer-term question is whether this axis could help promote tertiary lymphoid structures; the work I joined focused on cellular properties.',
    'I began with literature reading in January–March 2026, followed by intensive laboratory work in April–August. My project work is currently paused while I focus on applications.',
  ],
  sections: [
    {
      id: 'my-contribution',
      title: 'My contribution',
      items: [
        {
          title: 'T-cell experiments.',
          body: 'Using plasmids provided by Jiajia Wang, a senior PhD student, I performed viral packaging, mouse T-cell isolation and activation, transduction, culture expansion, and flow cytometry sample preparation. I carried out the recorded experiments myself, seeking guidance when needed.',
        },
        {
          title: 'Flow cytometry analysis.',
          body: 'I used FlowJo to gate populations, compare group proportions, and consider possible explanations, including analyses of CD44/CD62L and IFNγ/TNFα. I checked my interpretations with Jiajia Wang.',
        },
        {
          title: 'Animal work.',
          body: 'I performed ear tagging, MC38 and B16OVA tumor inoculation, and tail-vein transfer of CXCR5-overexpressing and vector-control T cells, with Jiajia Wang present throughout.',
        },
      ],
      paragraphsAfter: [
        'Alongside this project, I also performed viral packaging and T-cell transduction for the separate TB4 project, and gained experience in 293F transfection and Fc-protein purification.',
      ],
    },
    {
      id: 'research-decisions',
      title: 'Research decisions',
      subsections: [
        {
          id: 'cesome-exploration',
          title: 'Exploring an alternative for plasmid endotoxin removal',
          paragraphs: [
            'Persistent endotoxin in CXCL13–Fc plasmid preparations led me to propose testing Cesome, a material from my parents’ research project. Discussions with them about earlier ROS-related experiments prompted a shared hypothesis that the material might also act on LPS. I received prepared materials and designed and conducted the endotoxin experiments.',
            'I compared Cesome and Cecel, examined material-only background signals, tested concentration ranges, and explored plasmid recovery after treatment. Limited throughput shaped the design: small-volume handling and short incubations constrained how many samples I could process reliably. I generally prioritized three separately prepared and treated samples per condition, using fewer concentration levels. I organized the data, plotted results, and fitted standard curves in Prism.',
          ],
        },
        {
          id: 'assay-and-recovery',
          title: 'Assessing the assay and the next validation steps',
          paragraphs: [
            'Repeatedly irregular standard curves made the assay itself a major concern. I repeated measurements and examined standards and background signals before interpreting apparent treatment effects.',
            'I also considered whether Cesome could be removed adequately and whether residual material might affect subsequent transfection or cell experiments. These additional validation needs, together with an available, more time-consuming alternative, contributed to my decision to stop pursuing this route.',
          ],
        },
      ],
    },
    {
      id: 'experimental-progress',
      title: 'Experimental progress',
      paragraphs: [
        'Some early Cesome conditions produced lower endotoxin-assay readings, but calibration problems and possible interference limited interpretation. The work did not establish direct LPS degradation or a validated removal method.',
        'I attempted plasmid recovery in an earlier round. The final experiment on 12 August did not successfully remove LPS and therefore did not proceed to recovery. I did not carry out subsequent transfection validation. My confirmed contribution to the T-cell project is experimental execution and population analysis; functional improvements remain unconfirmed in this account.',
      ],
    },
    {
      id: 'reflection',
      title: 'Reflection',
      paragraphs: [
        'This experience gave me a practical understanding of daily work in a CD8 T-cell laboratory: extensive preparation leading into flow cytometry or mouse experiments. It expanded my hands-on skills in cell handling, transfection, protein purification, and endotoxin testing. The Cesome exploration also made the trade-offs between experimental scope, reliable measurement, and downstream compatibility concrete.',
      ],
    },
    {
      id: 'people-resources',
      title: 'People & resources',
      paragraphs: [
        'Lianjun Zhang guided the research direction and shared literature; I supplemented this with my own searches. Jiajia Wang provided day-to-day guidance and the main experimental plans. Yao Wang performed one recorded T-cell isolation and activation round. Xiaoru Cheng, from my mother’s Cesome group, performed the initial dynamic light scattering pilot. The possible LPS mechanism arose through discussions with my parents; I proposed the plasmid application and designed its tests.',
      ],
    },
  ],
}

export default cxcl13Data
