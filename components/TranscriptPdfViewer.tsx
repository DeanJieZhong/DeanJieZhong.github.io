'use client'

import { useEffect, useRef, useState } from 'react'
import type { PDFDocumentLoadingTask, PDFPageProxy } from 'pdfjs-dist'

function PdfPage({ page, width }: { page: PDFPageProxy; width: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [failed, setFailed] = useState(false)
  const viewport = page.getViewport({ scale: width / page.getViewport({ scale: 1 }).width })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
    const renderViewport = page.getViewport({
      scale: width / page.getViewport({ scale: 1 }).width,
    })
    canvas.width = Math.floor(renderViewport.width * pixelRatio)
    canvas.height = Math.floor(renderViewport.height * pixelRatio)
    const task = page.render({
      canvas,
      viewport: renderViewport,
      transform: [pixelRatio, 0, 0, pixelRatio, 0, 0],
    })
    let cancelled = false
    task.promise.catch(() => {
      if (!cancelled) setFailed(true)
    })
    return () => {
      cancelled = true
      task.cancel()
    }
  }, [page, width])

  return (
    <figure className="m-0" style={{ width }}>
      <figcaption className="mb-2 text-center text-xs text-gray-500">
        Page {page.pageNumber}
      </figcaption>
      {failed ? (
        <p role="status" className="bg-white p-6 text-sm text-gray-600">
          This page could not be displayed. Please refresh to try again.
        </p>
      ) : (
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={`Official academic transcript, page ${page.pageNumber}. An accessible text summary appears above.`}
          className="block bg-white shadow-sm"
          style={{ width: viewport.width, height: viewport.height }}
        />
      )}
    </figure>
  )
}

export default function TranscriptPdfViewer({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pages, setPages] = useState<PDFPageProxy[]>([])
  const [width, setWidth] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let cancelled = false
    let loadingTask: PDFDocumentLoadingTask | undefined
    const load = async () => {
      try {
        const pdfjs = await import('pdfjs-dist')
        if (cancelled) return
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          'pdfjs-dist/build/pdf.worker.min.mjs',
          import.meta.url
        ).toString()
        loadingTask = pdfjs.getDocument({ url: src })
        const document = await loadingTask.promise
        const documentPages = await Promise.all(
          Array.from({ length: document.numPages }, (_, index) => document.getPage(index + 1))
        )
        if (!cancelled) setPages(documentPages)
      } catch {
        if (!cancelled) setFailed(true)
      }
    }

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          visibilityObserver.disconnect()
          void load()
        }
      },
      { rootMargin: '300px' }
    )
    visibilityObserver.observe(container)
    const resizeObserver = new ResizeObserver(([entry]) => {
      setWidth(Math.max(1, Math.floor(entry.contentRect.width - 32)))
    })
    resizeObserver.observe(container)

    return () => {
      cancelled = true
      visibilityObserver.disconnect()
      resizeObserver.disconnect()
      void loadingTask?.destroy()
    }
  }, [src])

  return (
    <div className="not-prose overflow-hidden rounded-xl border border-gray-200">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 py-2 text-sm">
        <span className="text-gray-500">
          {pages.length ? `${pages.length} pages` : 'PDF preview'}
        </span>
        <div className="flex items-center gap-2">
          <label htmlFor="transcript-pdf-zoom" className="text-gray-600">
            Zoom
          </label>
          <select
            id="transcript-pdf-zoom"
            value={zoom}
            onChange={(event) => setZoom(Number(event.target.value))}
            className="focus-visible:outline-primary-500 rounded border border-gray-200 bg-white py-1 pr-8 pl-2 text-gray-700 focus-visible:outline-2"
          >
            <option value={1}>Fit width</option>
            <option value={1.5}>150%</option>
            <option value={2}>200%</option>
            <option value={3}>300%</option>
          </select>
        </div>
      </div>
      <div
        ref={containerRef}
        role="region"
        aria-label="Official transcript PDF pages"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- Enable keyboard scrolling of PDF pages.
        tabIndex={0}
        className="focus-visible:outline-primary-500 h-[75vh] min-h-[520px] overflow-auto overscroll-contain bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-[-2px]"
      >
        {failed || pages.length === 0 ? (
          <p role="status" className="p-6 text-sm text-gray-600">
            {failed
              ? 'The preview could not be loaded. Please refresh to try again.'
              : 'Loading transcript…'}
          </p>
        ) : (
          <div className="flex w-max min-w-full flex-col items-center gap-6 p-4">
            {width > 0 &&
              pages.map((page) => (
                <PdfPage
                  key={`${page.pageNumber}-${width}-${zoom}`}
                  page={page}
                  width={width * zoom}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
