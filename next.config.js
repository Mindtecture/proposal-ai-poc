/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the 'output: export' as it prevents API routes from working
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;