/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.windows.net', // TODO: Add support for base64 and then remove this
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      }
    ],

    domains: [
      'picsum.photos', // For development environment
      // 'oaidalleapiprodscus.blob.core.windows.net', // TODO: Add support for base64 and then remove this
    ],
  },
};

module.exports = nextConfig;
