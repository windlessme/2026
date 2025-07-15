import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // 如果你的 GitHub Pages 部署在子路徑（例如 username.github.io/repository-name）
  // 請取消註釋下面這行並替換為你的 repository 名稱
  // basePath: '/repository-name',
  // assetPrefix: '/repository-name',
};

export default nextConfig;
