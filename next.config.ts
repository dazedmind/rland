import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true, // Disable Next.js image optimization for Cloudflare
  },
};

export default nextConfig;
