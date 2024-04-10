/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      //TODO: production url
    ],
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
