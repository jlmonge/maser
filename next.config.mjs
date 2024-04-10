/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "maser-production.up.railway.app"],
    // remotePatterns: [
    //   {
    //     hostname: "localhost",
    //     pathname: "**",
    //     port: "3000",
    //     protocol: "http",
    //   },
    // ],
  },
};

export default nextConfig;
