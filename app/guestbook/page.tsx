import Link from '@/components/Link'
import SiteInfoLayout from '@/layouts/SiteInfoLayout'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Guestbook',
  description: 'The guestbook is not open for messages yet. Find current ways to get in touch.',
})

export default function Guestbook() {
  return (
    <SiteInfoLayout title="Guestbook">
      <p>Thanks for visiting. This guestbook is not open for messages yet.</p>
      <p>
        How messages will be submitted and displayed is still to be decided. In the meantime, you
        can <Link href="/about/#contact">get in touch directly</Link>.
      </p>
    </SiteInfoLayout>
  )
}
