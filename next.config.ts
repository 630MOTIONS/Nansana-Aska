import type { NextConfig } from "next";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"
).replace(/\/+$/, "");

const nextConfig: NextConfig = {
  output: "standalone",
  cacheComponents: true,
  partialPrefetching: true,
  async rewrites() {
    return [
      { source: "/media/:path*", destination: `${API_URL}/media/:path*` },
      {
        source: "/teams/:slug/logo",
        destination: `${API_URL}/teams/:slug/logo`,
      },
    ];
  },
};

export default nextConfig;
