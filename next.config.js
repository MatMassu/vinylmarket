/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
    minimumCacheTTL: 60 * 60 * 24,
  },
};

export default nextConfig;
