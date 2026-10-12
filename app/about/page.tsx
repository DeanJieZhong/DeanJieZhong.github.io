import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
import siteMetadata from '@/data/siteMetadata'

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  return (
    <>
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} />
        <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-8">
          <h2 id="contact-heading">Contact</h2>
          <address className="not-italic">
            <dl>
              <dt>Phone</dt>
              <dd>
                <a href={`tel:${siteMetadata.phone.replace(/\s/g, '')}`}>{siteMetadata.phone}</a>
              </dd>
              <dt>Email</dt>
              <dd className="break-words">
                <a href={`mailto:${siteMetadata.email}`}>{siteMetadata.email}</a>
              </dd>
              <dt>WeChat</dt>
              <dd className="break-words select-all">{siteMetadata.wechat}</dd>
            </dl>
          </address>
        </section>
      </AuthorLayout>
    </>
  )
}
