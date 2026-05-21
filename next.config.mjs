import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Content Security Policy ──────────────────────────────────────────────────
// Assembled as an array and joined so it stays readable and diffable.
// Directives are ordered: defaults → scripts → styles → resources → navigation.
const csp = [
  // Fallback: only load from same origin unless a more specific directive matches
  "default-src 'self'",

  // Scripts
  // 'unsafe-inline' is required for Next.js App Router hydration bootstrap scripts.
  // Vercel Analytics can load its beacon script from va.vercel-scripts.com.
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",

  // Styles — Framer Motion writes inline styles; Tailwind JIT can also emit them
  "style-src 'self' 'unsafe-inline'",

  // Images — data: for Three.js canvas exports; blob: for canvas.toBlob()
  "img-src 'self' data: blob:",

  // Fonts — Next.js font system downloads Google Fonts at build-time and
  // serves them as /static/media/* (same-origin). No external font CDN needed.
  "font-src 'self'",

  // Network requests
  // api.web3forms.com  — contact form submission
  // vitals.vercel-insights.com — Web Vitals beacon
  // va.vercel-scripts.com      — Vercel Analytics beacon
  "connect-src 'self' https://api.web3forms.com https://vitals.vercel-insights.com https://va.vercel-scripts.com",

  // Web Workers (Three.js geometry workers use blob: URLs)
  "worker-src 'self' blob:",

  // Iframes — this site neither embeds nor should be embedded
  "frame-src 'none'",
  "frame-ancestors 'none'",

  // Block Flash, Silverlight, Java plugins entirely
  "object-src 'none'",

  // <base> tag hijacking prevention
  "base-uri 'self'",

  // Form submissions must go to our own origin or Web3Forms only
  "form-action 'self' https://api.web3forms.com",

  // Upgrade any accidental mixed-content HTTP sub-resource requests to HTTPS
  "upgrade-insecure-requests",
]
  .join("; ")
  .trim();

// ─── Permissions Policy ───────────────────────────────────────────────────────
// Explicitly deny every sensor/hardware API this site does not use.
const permissionsPolicy = [
  "camera=()",
  "microphone=()",
  "geolocation=()",
  "interest-cohort=()", // opt out of FLoC
  "payment=()",
  "usb=()",
  "bluetooth=()",
  "serial=()",
  "magnetometer=()",
  "gyroscope=()",
  "accelerometer=()",
  "ambient-light-sensor=()",
  "battery=()",
  "display-capture=()",
  "document-domain=()",
  "encrypted-media=()",
  "execution-while-not-rendered=()",
  "execution-while-out-of-viewport=()",
  "fullscreen=(self)", // allow fullscreen for the 3D scene
  "picture-in-picture=()",
  "publickey-credentials-get=()",
  "screen-wake-lock=()",
  "sync-xhr=()",
  "xr-spatial-tracking=()",
].join(", ");

// ─── All response headers ─────────────────────────────────────────────────────
const securityHeaders = [
  // Remove "X-Powered-By: Next.js" — no need to advertise the stack
  // (also set poweredByHeader: false in nextConfig below)

  // Force HTTPS for 2 years; include subdomains; eligible for preload list
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },

  // Prevent browsers from MIME-sniffing a response away from the declared content-type
  { key: "X-Content-Type-Options", value: "nosniff" },

  // Belt-and-suspenders clickjacking protection (CSP frame-ancestors is primary)
  { key: "X-Frame-Options", value: "DENY" },

  // Control how much referrer info is sent with requests
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

  // Disable browser DNS prefetch (minor privacy improvement)
  { key: "X-DNS-Prefetch-Control", value: "off" },

  // Restrict hardware/browser-API access
  { key: "Permissions-Policy", value: permissionsPolicy },

  // Content Security Policy
  { key: "Content-Security-Policy", value: csp },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // R3F Canvas remounts twice under StrictMode in dev, which makes the
  // first compile / first paint feel sluggish. Keep it off here.
  reactStrictMode: false,

  // Remove the X-Powered-By header that leaks Next.js version info
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    // No remotePatterns — all images are self-hosted in /public
  },

  turbopack: {
    // Pin workspace root so an outer lockfile in `AI Automation/`
    // doesn't confuse module resolution.
    root: __dirname,
  },

  async headers() {
    return [
      {
        // Apply security headers to every route
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
