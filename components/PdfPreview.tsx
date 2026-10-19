'use client'

import { useEffect, useRef, useState } from 'react'
import type { PDFDocumentLoadingTask } from 'pdfjs-dist'
import type { PDFViewer } from 'pdfjs-dist/web/pdf_viewer.mjs'
import 'pdfjs-dist/web/pdf_viewer.css'
import styles from './PdfPreview.module.css'

export default function PdfPreview({ src, title }: { src: string; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pagesRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    const container = containerRef.current
    const pages = pagesRef.current
    if (!container || !pages) return

    const controller = new AbortController()
    let loadingTask: PDFDocumentLoadingTask | undefined
    let viewer: PDFViewer | undefined
    let resizeObserver: ResizeObserver | undefined

    async function load() {
      try {
        // Load the reader only on pages that actually display a PDF.
        const pdfjs = await import('pdfjs-dist')
        const { EventBus, PDFLinkService, PDFViewer } =
          await import('pdfjs-dist/web/pdf_viewer.mjs')
        if (controller.signal.aborted) return

        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          'pdfjs-dist/build/pdf.worker.min.mjs',
          import.meta.url
        ).toString()

        const eventBus = new EventBus()
        const linkService = new PDFLinkService({ eventBus, externalLinkTarget: 2 })
        // PDF.js supports abortSignal for listener/observer cleanup; its options type omits it.
        const viewerOptions: ConstructorParameters<typeof PDFViewer>[0] & {
          abortSignal: AbortSignal
        } = {
          container: container!,
          viewer: pages!,
          eventBus,
          linkService,
          annotationMode: pdfjs.AnnotationMode.ENABLE,
          abortSignal: controller.signal,
        }
        viewer = new PDFViewer(viewerOptions)
        linkService.setViewer(viewer)

        eventBus.on('pagesinit', () => {
          if (controller.signal.aborted || !viewer) return
          viewer.currentScaleValue = 'page-width'
          let width = container!.clientWidth
          resizeObserver = new ResizeObserver(() => {
            if (!viewer || container!.clientWidth === width) return
            width = container!.clientWidth
            viewer.currentScaleValue = 'page-width'
          })
          resizeObserver.observe(container!)
        })
        eventBus.on('pagerendered', ({ error }: { error?: Error }) => {
          if (!controller.signal.aborted) setStatus(error ? 'error' : 'ready')
        })

        setStatus('loading')
        loadingTask = pdfjs.getDocument({ url: src, useSystemFonts: true })
        const document = await loadingTask.promise
        if (controller.signal.aborted) return
        viewer.setDocument(document)
        linkService.setDocument(document)
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error('PDF preview failed to load:', error)
          setStatus('error')
        }
      }
    }

    void load()
    return () => {
      controller.abort()
      resizeObserver?.disconnect()
      viewer?.setDocument(null)
      void loadingTask?.destroy()
    }
  }, [src])

  return (
    <div className={`not-prose ${styles.preview}`}>
      <div
        ref={containerRef}
        role="region"
        aria-label={title}
        aria-busy={status === 'loading'}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- Make the PDF scrollable with the keyboard.
        tabIndex={0}
        className={styles.viewport}
      >
        <div ref={pagesRef} className="pdfViewer" />
      </div>
      {status !== 'ready' && (
        <p role="status" className={styles.status}>
          {status === 'loading' ? (
            'Loading PDF…'
          ) : (
            <>
              PDF preview could not load. <a href={src}>Open the PDF</a>.
            </>
          )}
        </p>
      )}
    </div>
  )
}
