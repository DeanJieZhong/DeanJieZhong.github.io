const { withContentlayer } = require('next-contentlayer2')
const { execFileSync } = require('node:child_process')

// GitHub Pages supplies the exact deployed source revision. Local previews use
// HEAD with an explicit local suffix, including builds with uncommitted edits.
const deploymentRevision = /^[a-f0-9]{40}$/i.test(process.env.GITHUB_SHA || '')
  ? process.env.GITHUB_SHA
  : ''
let siteRevision = deploymentRevision
if (!siteRevision) {
  try {
    siteRevision = execFileSync('git', ['rev-parse', 'HEAD'], {
      cwd: __dirname,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
  } catch {
    // Source archives may not contain Git metadata; do not invent a version.
    siteRevision = ''
  }
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// Same-origin frames support embedded articles after client-side navigation too.
// You might need to insert additional domains in script-src if you are using external services
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app analytics.umami.is;
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src *.s3.amazonaws.com;
  connect-src *;
  font-src 'self';
  frame-src 'self' giscus.app
`

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

const output = process.env.EXPORT ? 'export' : undefined
const basePath = process.env.BASE_PATH || undefined
const unoptimized = process.env.UNOPTIMIZED ? true : undefined

/** @type {import('next/dist/next-server/server/config').NextConfig} **/
module.exports = () => {
  const plugins = [withContentlayer, withBundleAnalyzer]

  const nextConfig = {
    env: {
      SITE_REVISION: siteRevision,
      SITE_LOCAL_PREVIEW: String(!deploymentRevision),
    },
    output,
    basePath,
    reactStrictMode: true,
    trailingSlash: true,
    turbopack: {
      root: process.cwd(),
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    images: {
      remotePatterns: [{ protocol: 'https', hostname: 'picsum.photos' }],
      unoptimized,
    },
    webpack: (config) => {
      config.module.rules.push({
        test: /pdf\.worker\.min\.mjs$/,
        type: 'asset/resource',
      })
      config.module.rules.push({
        test: /\.svg$/,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      })
      return config
    },
  }

  // ✅ 关键：export 模式下不要出现 `headers` 这个字段（哪怕返回 [] 也会警告）
  if (output !== 'export') {
    nextConfig.redirects = async () =>
      Object.entries(require('./data/routeRedirects.json')).map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      }))
    nextConfig.headers = async () => [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        source: '/static/blog/why-blue-as-the-accent-colour/oklab-color-matrix.html',
        headers: [{ key: 'X-Frame-Options', value: 'SAMEORIGIN' }],
      },
    ]
  }

  return plugins.reduce((acc, next) => next(acc), nextConfig)
}
