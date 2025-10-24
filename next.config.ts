import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = { productionBrowserSourceMaps: true };

const nextConfigWithIntl = createNextIntlPlugin({
  requestConfig: "./src/pkg/libraries/locale/request.ts",
});

export default nextConfigWithIntl(nextConfig);
