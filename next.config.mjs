import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
import withBundleAnalyzer from "@next/bundle-analyzer";

const isAnalyze = process.env.ANALYZE === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
      allowedOrigins: [
        "http://localhost:3000",
        "https://next-educational-app.pages.dev",
        "https://*.next-educational-app.pages.dev",
      ],
    },
  },
};

if (process.env.NODE_ENV === "development") {
  await setupDevPlatform();
}

export default withBundleAnalyzer({
  enabled: isAnalyze,
})(nextConfig);
