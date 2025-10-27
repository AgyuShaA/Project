import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,

  cacheComponents: true,

  poweredByHeader: false,

  cacheMaxMemorySize: 100 * 1024 * 1024,

  output: "standalone",

  images: {
    domains: ["upload.wikimedia.org"],
    remotePatterns: [{ protocol: "https", hostname: "**" }],
    minimumCacheTTL: 3600,
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 1080, 1920, 3840],
    imageSizes: [16, 64, 128, 384],
  },

  serverExternalPackages: ["pino", "pino-pretty"],
};

const nextConfigWithIntl = createNextIntlPlugin({
  requestConfig: "./src/pkg/libraries/locale/request.ts",
});

export default nextConfigWithIntl(nextConfig);
