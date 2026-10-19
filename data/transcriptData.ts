type Period = 'ACYR' | 'SEM1' | 'SEM2'

interface TranscriptAssessment {
  title: string
  type: 'Coursework' | 'Examination'
  weight: number
  mark: number
  context?: string[]
}

export interface TranscriptModule {
  period: Period
  code: string
  title: string
  credits: number
  mark: number
  assessments?: TranscriptAssessment[]
  context?: string[]
}

interface TranscriptStage {
  stage: number
  academicYear: string
  studyLevel: string
  weightedAverage: number
  modules: TranscriptModule[]
}

interface AdditionalLearning {
  academicYear: string
  period: Period
  code: string
  title: string
  grade: 'P'
}

// Transcribed from the academic transcript issued on 15 August 2026.
// Keep the issued weighted averages rather than recalculating or converting them.
const transcriptData = {
  institution: "Xi'an Jiaotong-Liverpool University",
  programme: 'Biological Sciences',
  issuedOn: '2026-08-15',
  issuedOnLabel: '15 August 2026',
  overallWeightedAverage: 70,
  stages: [
    {
      stage: 1,
      academicYear: '2023/24',
      studyLevel: 'General education',
      weightedAverage: 65,
      modules: [
        {
          period: 'ACYR',
          code: 'EAP035',
          title: 'Advanced English Communication and Academic Skills I',
          credits: 10,
          mark: 66,
        },
        {
          period: 'SEM1',
          code: 'APH005',
          title: 'Diseases, Healthcare and Society',
          credits: 2.5,
          mark: 85,
        },
        {
          period: 'SEM1',
          code: 'CCT001',
          title: 'The Basic Principles of Marxism',
          credits: 2,
          mark: 59,
        },
        {
          period: 'SEM1',
          code: 'CCT011',
          title: 'Mao Zedong Thought and the Theory of Socialism with Chinese Characteristics',
          credits: 2,
          mark: 61,
        },
        {
          period: 'SEM1',
          code: 'MTH013',
          title: 'Calculus (Science and Engineering)',
          credits: 5,
          mark: 65,
        },
        { period: 'SEM1', code: 'PHE001', title: 'Physical Education 1', credits: 1, mark: 82 },
        {
          period: 'SEM1',
          code: 'SCI002',
          title: 'Scientific Principles and Methods',
          credits: 2.5,
          mark: 80,
        },
        { period: 'SEM1', code: 'SPA001', title: 'Spanish Language 1', credits: 5, mark: 74 },
        { period: 'SEM2', code: 'BIO002', title: 'Introductory Biology', credits: 2.5, mark: 81 },
        {
          period: 'SEM2',
          code: 'BIO006',
          title: 'Key Skills for Life Scientists',
          credits: 2.5,
          mark: 67,
        },
        {
          period: 'SEM2',
          code: 'CCT008',
          title: 'Ideological and Moral Cultivation and Basis of Law',
          credits: 2,
          mark: 52,
        },
        {
          period: 'SEM2',
          code: 'CCT010',
          title: 'Outline of Chinese Modern History',
          credits: 2,
          mark: 40,
        },
        {
          period: 'SEM2',
          code: 'MTH008',
          title: 'Multivariable Calculus (Science and Engineering)',
          credits: 5,
          mark: 40,
        },
        { period: 'SEM2', code: 'PHE002', title: 'Physical Education 2', credits: 1, mark: 71 },
        { period: 'SEM2', code: 'SPA002', title: 'Spanish Language 2', credits: 5, mark: 69 },
      ],
    },
    {
      stage: 2,
      academicYear: '2024/25',
      studyLevel: 'UK Year 1',
      weightedAverage: 78,
      modules: [
        {
          period: 'ACYR',
          code: 'EAP103',
          title: 'English Language and Study Skills for Science',
          credits: 10,
          mark: 65,
        },
        {
          period: 'SEM1',
          code: 'BIO101',
          title: 'Biodiversity of Animals, Plants and Microbes',
          credits: 5,
          mark: 91,
        },
        {
          period: 'SEM1',
          code: 'BIO102',
          title: 'Experimental Design and Analysis',
          credits: 2.5,
          mark: 79,
        },
        {
          period: 'SEM1',
          code: 'BIO103',
          title: 'Cellular and Molecular Biology',
          credits: 5,
          mark: 77,
        },
        {
          period: 'SEM1',
          code: 'BIO105',
          title: 'Chemical Principles of Life',
          credits: 2.5,
          mark: 85,
        },
        {
          period: 'SEM1',
          code: 'BIO107',
          title: 'Introduction to Biochemistry',
          credits: 5,
          mark: 75,
        },
        { period: 'SEM2', code: 'BIO106', title: 'The Biology of Microbes', credits: 5, mark: 83 },
        {
          period: 'SEM2',
          code: 'BIO109',
          title: 'Introduction to Evolution and Genetics',
          credits: 5,
          mark: 88,
        },
        {
          period: 'SEM2',
          code: 'BIO113',
          title: 'Molecular Biology Techniques',
          credits: 5,
          mark: 76,
        },
        { period: 'SEM2', code: 'ENV107', title: 'Introduction In Ecology', credits: 5, mark: 74 },
      ],
    },
    {
      stage: 3,
      academicYear: '2025/26',
      studyLevel: 'UK Year 2',
      weightedAverage: 68,
      modules: [
        { period: 'SEM1', code: 'BIO202', title: 'Biochemical Methods', credits: 2.5, mark: 73 },
        {
          period: 'SEM1',
          code: 'BIO203',
          title: 'Medical Microbiology and Virology',
          credits: 5,
          mark: 71,
        },
        { period: 'SEM1', code: 'BIO205', title: 'Cell Biology Techniques', credits: 5, mark: 90 },
        { period: 'SEM1', code: 'BIO207', title: 'Proteins in Action', credits: 2.5, mark: 82 },
        {
          period: 'SEM1',
          code: 'BIO223',
          title: 'Communicable and Non-communicable Diseases in Public Health',
          credits: 5,
          mark: 50,
          // Component marks from e-Bridge; context is the student's account.
          assessments: [
            {
              title: 'Essay and Data Analysis Paper',
              type: 'Coursework',
              weight: 15,
              mark: 0,
              context: [
                'This component consisted of written responses collected during lectures, a format not explained in the handbook I consulted. Studying primarily independently and attending few lectures, I understood it as an assignment to be set later and did not submit these responses.',
              ],
            },
            {
              title: 'Oral Presentation',
              type: 'Coursework',
              weight: 15,
              mark: 76,
              context: ['Highest presentation mark in the class.'],
            },
            {
              title: 'Final Exam',
              type: 'Examination',
              weight: 70,
              mark: 55,
              context: [
                'Teaching staff from Soochow University verbally explained that they treated a UK mark of 70 as comparable to a Chinese mark of 90. They believed that only a small minority of students should receive marks at these levels and accordingly lowered examination marks to limit high overall module marks. I do not know my pre-adjustment mark.',
                'After I raised these concerns, John Moraros, who was Dean at the time, said the results could not be changed following multiple reviews by XJTLU and the University of Liverpool, but that similarly large adjustments would be avoided in future.',
              ],
            },
          ],
        },
        { period: 'SEM2', code: 'BIO204', title: 'Advanced Genetics', credits: 5, mark: 67 },
        {
          period: 'SEM2',
          code: 'BIO206',
          title: 'Practical Bioinformatics',
          credits: 5,
          mark: 55,
          // Component marks from e-Bridge; context is the student's account.
          assessments: [
            {
              title: 'Quiz',
              type: 'Coursework',
              weight: 15,
              mark: 56,
              context: [
                'For the questions with fixed answers, my responses matched those of peers who received over 75/100 for this assignment. No marking feedback accompanied my result.',
              ],
            },
            {
              title: 'Analysis Report',
              type: 'Coursework',
              weight: 20,
              mark: 37,
              context: [
                'For the questions with fixed answers, my responses matched those of peers who received over 80/100 for this assignment. No marking feedback accompanied my result.',
              ],
            },
            { title: 'Scientific Essay', type: 'Coursework', weight: 65, mark: 61 },
          ],
          context: [
            'I was involved in a serious assessment dispute between my iGEM team and this lecturer concerning another module. The dispute involved multiple hearings over more than one semester. I am concerned that this conflict may have influenced my mark, although I cannot confirm a connection.',
          ],
        },
        { period: 'SEM2', code: 'BIO208', title: 'Cell Signalling', credits: 2.5, mark: 70 },
        {
          period: 'SEM2',
          code: 'BIO212',
          title: 'Structure and Dynamics of Biomolecules',
          credits: 5,
          mark: 69,
        },
        {
          period: 'SEM2',
          code: 'CHE214',
          title: 'Biological Chemistry',
          credits: 2.5,
          mark: 55,
          // Component marks from e-Bridge; context is the student's account.
          assessments: [
            { title: 'In-Class Test #1', type: 'Coursework', weight: 20, mark: 25.5 },
            { title: 'In-Class Test #2', type: 'Coursework', weight: 20, mark: 63.5 },
            { title: 'Final Exam', type: 'Examination', weight: 60, mark: 62 },
          ],
          context: [
            'I particularly appreciated Assistant Professor Qian Zhang’s teaching. A key challenge in this module was combining evidence from different spectroscopic techniques to determine molecular structures, a skill I had not yet mastered.',
          ],
        },
      ],
    },
  ] satisfies TranscriptStage[],
  additionalLearning: [
    {
      academicYear: '2023/24',
      period: 'ACYR',
      code: 'CCT012',
      title: 'Situation and Policy',
      grade: 'P',
    },
    {
      academicYear: '2023/24',
      period: 'ACYR',
      code: 'LIF001',
      title: 'Research-led and Project-based Learning',
      grade: 'P',
    },
    {
      academicYear: '2023/24',
      period: 'SEM1',
      code: 'CCT007',
      title: 'Self-management and Mental Health',
      grade: 'P',
    },
    {
      academicYear: '2024/25',
      period: 'SEM1',
      code: 'CCT009',
      title: 'Comparison between Chinese and Western Culture',
      grade: 'P',
    },
  ] satisfies AdditionalLearning[],
}

export default transcriptData
