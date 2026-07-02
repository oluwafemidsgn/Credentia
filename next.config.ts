import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old support route renamed to /jollof — keep old links working.
      { source: "/coffee", destination: "/jollof", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        // /studio is excluded — Sanity Studio needs to frame itself for previews.
        source: "/((?!studio).*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
