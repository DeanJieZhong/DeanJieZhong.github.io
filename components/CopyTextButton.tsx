'use client'

import { useState } from 'react'

export default function CopyTextButton({ text }: { text: string }) {
  const [status, setStatus] = useState('')

  async function copyText() {
    try {
      await navigator.clipboard.writeText(text)
      setStatus('Copied.')
    } catch {
      setStatus('Select the details below to copy them manually.')
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <button
        type="button"
        onClick={copyText}
        className="interaction-text border-primary-200 text-primary-500 hover:border-primary-600 hover:text-primary-600 active:text-primary-700 rounded-lg border bg-white px-3 py-1.5 text-sm font-medium"
      >
        Copy details
      </button>
      <span role="status" className="text-sm text-gray-600">
        {status}
      </span>
    </div>
  )
}
