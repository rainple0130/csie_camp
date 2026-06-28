import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/csie_camp",
  assetPrefix: "/csie_camp",
};

export default nextConfig;
