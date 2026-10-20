import Image from 'next/image'
import type { ResearchPhoto } from '@/data/researchData'
import styles from './TrogenProject.module.css'

// The supplied image already includes its gradient and labels.
export default function PreparedProjectCover({
  photo,
  title,
  titleId,
}: {
  photo: ResearchPhoto
  title: string
  titleId: string
}) {
  return (
    <>
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes="100vw"
        priority
        className="block h-auto w-full lg:max-h-[calc(100svh-14rem)] lg:object-contain"
      />
      <div className="mx-auto flow-root max-w-4xl px-4 sm:px-6">
        <h1
          id={titleId}
          className={`${styles.title} relative -mt-[1lh] font-bold tracking-tight text-white`}
        >
          {title}
        </h1>
      </div>
    </>
  )
}
