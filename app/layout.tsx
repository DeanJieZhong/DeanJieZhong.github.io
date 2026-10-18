import 'css/tailwind.css'
import 'remark-github-blockquote-alert/alert.css'

import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import SiteSearchProvider from '@/components/search/SiteSearchProvider'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import Footer from '@/components/Footer'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'
import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  applicationName: siteMetadata.title,
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const basePath = process.env.BASE_PATH || ''
  const faviconPath = `${basePath}/static/favicons`
  const faviconVersion = 'four-blocks-black-v1'

  return (
    <html lang={siteMetadata.language} className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${faviconPath}/apple-touch-icon.png?v=${faviconVersion}`}
        />
        <link rel="icon" href={`${faviconPath}/favicon.ico?v=${faviconVersion}`} sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${faviconPath}/favicon-32x32.png?v=${faviconVersion}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${faviconPath}/favicon-16x16.png?v=${faviconVersion}`}
        />
        <link
          rel="icon"
          type="image/svg+xml"
          sizes="any"
          href={`${faviconPath}/four-blocks.svg?v=${faviconVersion}`}
        />
        <link rel="manifest" href={`${faviconPath}/site.webmanifest?v=dean-jie-zhong-v1`} />
        <link
          rel="mask-icon"
          href={`${faviconPath}/safari-pinned-tab.svg?v=${faviconVersion}`}
          color="#000000"
        />
        <meta name="theme-color" content="#ffffff" />
        <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
      </head>

      <body className="flex min-h-dvh flex-col bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-gray-950 dark:text-white">
        <ThemeProviders>
          <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />

          <div className="flex-1">
            <SectionContainer>
              <SiteSearchProvider
                indexUrl={`${basePath}/search.json?v=${process.env.SITE_REVISION}`}
              >
                <Header />
                <main>{children}</main>
              </SiteSearchProvider>
            </SectionContainer>
          </div>
          <Footer />
        </ThemeProviders>
      </body>
    </html>
  )
}
