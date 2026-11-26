// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   cacheComponents: true,
//   partialPrefetching: true,
//   experimental: {
//     // Check "instant navigation" only for segments that opt in with
//     // `export const instant`. The admin area has to look up the signed-in user
//     // before it can show anything, so the automatic check only produced
//     // warnings there. This changes development warnings only.
//     instantInsights: { validationLevel: "manual-warning" },
//   },
// };

// export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nansana-aska-api.onrender.com",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;