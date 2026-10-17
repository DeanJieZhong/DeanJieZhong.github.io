type Period = 'ACYR' | 'SEM1' | 'SEM2'

interface TranscriptModule {
  period: Period
  code: string
  title: string
  credits: number
  mark: number
}

interface TranscriptStage {
  stage: number
  academicYear: string
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
        },
        { period: 'SEM2', code: 'BIO204', title: 'Advanced Genetics', credits: 5, mark: 67 },
        { period: 'SEM2', code: 'BIO206', title: 'Practical Bioinformatics', credits: 5, mark: 55 },
        { period: 'SEM2', code: 'BIO208', title: 'Cell Signalling', credits: 2.5, mark: 70 },
        {
          period: 'SEM2',
          code: 'BIO212',
          title: 'Structure and Dynamics of Biomolecules',
          credits: 5,
          mark: 69,
        },
        { period: 'SEM2', code: 'CHE214', title: 'Biological Chemistry', credits: 2.5, mark: 55 },
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
