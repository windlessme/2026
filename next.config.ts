import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // 設置 basePath 和 assetPrefix 為 /2026
  basePath: '/2026',
  assetPrefix: '/2026',
};

export default nextConfig;
