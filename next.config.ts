import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Add your Higgsfield CDN / asset-storage hostname here once real
    // generations are wired in, e.g. { hostname: "cdn.higgsfield.ai" }.
    remotePatterns: [],
  },
};

export default nextConfig;
