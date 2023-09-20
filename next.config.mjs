/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-api.swapcard.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
