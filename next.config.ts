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
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;