/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
      {
        protocol: "http",
        hostname: "localhost", // Added localhost as a pattern
        port: "3000",           // Specify port if needed
      },
    ],
  },
};

module.exports = nextConfig;
