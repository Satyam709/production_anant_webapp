import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.ufs.sh',
        pathname: '/f/*',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '15mb',
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // redirects from old urls to new urls
  async redirects() {
    return [
      {
        source: '/about-anant-nitkkr',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/latest-news',
        destination: '/notices',
        permanent: true,
      },
      {
        source: '/math-dept',
        destination: '/department',
        permanent: true,
      },
      {
        source: '/team-anant-nitkkr',
        destination: '/team_anant',
        permanent: true,
      },
      {
        source: '/anant-event-details',
        destination: '/events',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
