import transcriptData from '@/data/transcriptData'

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

      <table>
        <caption className="mb-3 text-left text-sm text-gray-600">
          Weighted averages as reported on the transcript
        </caption>
        <thead>
          <tr>
            <th scope="col">Stage</th>
            <th scope="col">Academic year</th>
            <th scope="col" className="text-right">
              Weighted average
            </th>
          </tr>
        </thead>
        <tbody>
          {transcriptData.stages.map((stage) => (
            <tr key={stage.stage}>
              <th scope="row" className="font-normal">
                Stage {stage.stage}
              </th>
              <td>{stage.academicYear}</td>
              <td className="text-right tabular-nums">{stage.weightedAverage}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-semibold text-gray-900">
            <th scope="row" colSpan={2}>
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
            className="focus-visible:outline-primary-500 overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-4"
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
                  <tr key={module.code}>
                    <td className="whitespace-nowrap">{module.period}</td>
                    <th scope="row" className="px-2 py-2 text-left font-normal whitespace-nowrap">
                      {module.code}
                    </th>
                    <td>{module.title}</td>
                    <td className="text-right tabular-nums">{module.credits.toFixed(1)}</td>
                    <td className="text-right font-medium whitespace-nowrap tabular-nums">
                      {module.mark}%
                    </td>
                  </tr>
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
