/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    domains: ['github.com', 'raw.githubusercontent.com'],
  },
  experimental: {
    mdxRs: false,
  },
}

module.exports = nextConfig
