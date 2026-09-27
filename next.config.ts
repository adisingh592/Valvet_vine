import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Editorial imagery is served from Unsplash's CDN, which resizes on the fly.
    // The custom loader requests the exact width next/image needs.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
};

export default nextConfig;
