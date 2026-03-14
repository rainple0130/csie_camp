import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // 如果 GitHub Pages 有 basePath（例如 repo 名稱），取消註解下面這行並設定正確的路徑
  // basePath: process.env.NODE_ENV === "production" ? "/csie_camp" : "",
  // assetPrefix: process.env.NODE_ENV === "production" ? "/csie_camp" : "",
};

export default nextConfig;
