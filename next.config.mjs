/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains:['picsum.photos'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  reactStrictMode: true,
};

export default nextConfig;
