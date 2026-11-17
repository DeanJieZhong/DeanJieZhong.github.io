const teamAwards: Record<string, { awards: string[]; nominations?: string[] }> = {
  dogmaos: {
    awards: [
      'Gold Medal',
      'Best Model — sole undergraduate winner',
      'Best Education — sole undergraduate winner',
    ],
    nominations: ['Best Measurement', 'Best Wiki'],
  },
  flame: { awards: ['Silver Medal'] },
  'b-longum-pancreatic-cancer': { awards: ['Gold Medal'] },
}

export default function AdvisoryAwards({
  projectId,
  light = false,
}: {
  projectId: string
  light?: boolean
}) {
  const result = teamAwards[projectId]
  if (!result) return null

  return (
    <section
      aria-labelledby={`team-awards-${projectId}`}
      className={`mt-8 border-t pt-6 ${light ? 'border-gray-200' : 'border-white/20'}`}
    >
      <h3
        id={`team-awards-${projectId}`}
        className={`text-lg font-semibold ${light ? 'text-gray-950' : 'text-white'}`}
      >
        iGEM 2026 · Team awards
      </h3>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-base leading-7">
        {result.awards.map((award) => (
          <li key={award}>{award}</li>
        ))}
      </ul>
      {result.nominations && (
        <p className="mt-3 text-base leading-7">Nominated: {result.nominations.join(' · ')}</p>
      )}
    </section>
  )
}
