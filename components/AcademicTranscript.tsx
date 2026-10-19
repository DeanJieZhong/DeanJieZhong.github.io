import transcriptData from '@/data/transcriptData'
import TranscriptModuleRow from '@/components/TranscriptModuleRow'
import TranscriptStudyLevelInfo from '@/components/TranscriptStudyLevelInfo'

export default function AcademicTranscript() {
  return (
    <>
      <dl className="not-prose mb-8 space-y-4">
        <div className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-6">
          <dt className="text-sm text-gray-600">Programme</dt>
          <dd className="m-0 text-base text-gray-900">{transcriptData.programme}</dd>
        </div>
        <div className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-6">
          <dt className="text-sm text-gray-600">Institution</dt>
          <dd className="m-0 text-base text-gray-900">{transcriptData.institution}</dd>
        </div>
        <div className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-6">
          <dt className="text-sm text-gray-600">Issued</dt>
          <dd className="m-0 text-base text-gray-900">
            <time dateTime={transcriptData.issuedOn}>{transcriptData.issuedOnLabel}</time>
          </dd>
        </div>
      </dl>

      <section aria-labelledby="academic-context-heading">
        <h2 id="academic-context-heading">Academic context</h2>
        <p>
          In my first year, I was not focused on academics or research. In my second year, however,
          I began conducting research and took a more proactive approach to my studies through
          independent learning. As my research commitments grew in my third year, balancing them
          with coursework became more demanding.
        </p>
      </section>

      <h2 id="transcript-weighted-averages">Weighted averages</h2>
      <table aria-labelledby="transcript-weighted-averages">
        <thead>
          <tr>
            <th scope="col">Stage</th>
            <th scope="col">Academic year</th>
            <th scope="col">
              <span className="relative inline-block pr-8">
                Study level
                <TranscriptStudyLevelInfo />
              </span>
            </th>
            <th scope="col" className="text-right">
              Weighted average
            </th>
          </tr>
        </thead>
        <tbody>
          {transcriptData.stages.map((stage) => (
            <tr key={stage.stage}>
              <th scope="row" className="py-2 align-top font-normal whitespace-nowrap">
                Stage {stage.stage}
              </th>
              <td className="whitespace-nowrap">{stage.academicYear}</td>
              <td>{stage.studyLevel}</td>
              <td className="text-right tabular-nums">{stage.weightedAverage}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-semibold text-gray-900">
            <th scope="row" colSpan={3}>
              Overall weighted average
            </th>
            <td className="text-right tabular-nums">{transcriptData.overallWeightedAverage}</td>
          </tr>
        </tfoot>
      </table>

      {transcriptData.stages.map((stage) => (
        <section key={stage.stage} aria-labelledby={`transcript-stage-${stage.stage}`}>
          <h2 id={`transcript-stage-${stage.stage}`}>
            Stage {stage.stage} · {stage.academicYear}
          </h2>
          <div
            role="region"
            aria-labelledby={`transcript-stage-${stage.stage}`}
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- Enable keyboard scrolling of wide tables.
            tabIndex={0}
            className="focus-visible:outline-primary-500 [container-type:inline-size] overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <table className="my-0 min-w-[640px]">
              <caption className="sr-only">
                Stage {stage.stage} module credits and marks for {stage.academicYear}
              </caption>
              <thead>
                <tr>
                  <th scope="col">Period</th>
                  <th scope="col">Module</th>
                  <th scope="col" className="w-full">
                    Title
                  </th>
                  <th scope="col" className="text-right">
                    Credit
                  </th>
                  <th scope="col" className="text-right whitespace-nowrap">
                    Mark
                  </th>
                </tr>
              </thead>
              <tbody>
                {stage.modules.map((module) => (
                  <TranscriptModuleRow key={module.code} module={module} />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      <section aria-labelledby="transcript-additional-learning">
        <h2 id="transcript-additional-learning">Additional learning</h2>
        <div
          role="region"
          aria-labelledby="transcript-additional-learning"
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- Enable keyboard scrolling of wide tables.
          tabIndex={0}
          className="focus-visible:outline-primary-500 overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <table className="my-0 min-w-[640px]">
            <caption className="sr-only">Co-curriculum records</caption>
            <thead>
              <tr>
                <th scope="col">Year</th>
                <th scope="col">Period</th>
                <th scope="col">Module</th>
                <th scope="col" className="w-full">
                  Title
                </th>
                <th scope="col" className="text-right">
                  Grade
                </th>
              </tr>
            </thead>
            <tbody>
              {transcriptData.additionalLearning.map((module) => (
                <tr key={module.code}>
                  <td className="whitespace-nowrap">{module.academicYear}</td>
                  <td className="whitespace-nowrap">{module.period}</td>
                  <th scope="row" className="px-2 py-2 text-left font-normal whitespace-nowrap">
                    {module.code}
                  </th>
                  <td>{module.title}</td>
                  <td className="text-right font-medium">{module.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
