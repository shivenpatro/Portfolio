/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  // Development configuration - no GitHub Pages setup
  output: 'export',
  basePath: '',  // No base path for local development
  assetPrefix: '', // No asset prefix for local development
  trailingSlash: true,
  images: {
    unoptimized: true,
  }
}

export default nextConfig