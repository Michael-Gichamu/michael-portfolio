import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // R3F Canvas remounts twice under StrictMode in dev, which makes the
  // first compile / first paint feel sluggish. Keep it off here.
  reactStrictMode: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    // Pin workspace root so an outer lockfile in `AI Automation/`
    // doesn't confuse module resolution.
    root: __dirname,
  },
};

export default nextConfig;
