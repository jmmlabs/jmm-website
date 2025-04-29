/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        // pathname: '/**'
      }
    ]
  },
  allowedDevOrigins: [
    'http://localhost:*',
    'http://127.0.0.1:*'
  ]
};

module.exports = nextConfig;