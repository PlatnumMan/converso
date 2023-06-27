/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        protocol: "https",
      },
      {
        hostname: "cdn.pixabay.com",
        protocol: "https",
      },
      {
        hostname: "directus-production-1600.up.railway.app",
        protocol: "https",
      },
    ],
  },
  // experimental: {
  //   serverActions: true,
  // },
};

module.exports = nextConfig;
