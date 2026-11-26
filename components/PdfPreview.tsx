// Use the browser's native PDF reader for every embedded document on this site.
export default function PdfPreview({ src, title }: { src: string; title: string }) {
  return (
    <iframe
      src={`${src}#view=FitH`}
      title={title}
      className="not-prose mt-8 block h-[70svh] min-h-[20rem] w-full border-0 bg-gray-100 sm:h-[85svh] sm:min-h-[28rem]"
    />
  )
}
