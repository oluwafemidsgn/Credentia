import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old support route renamed to /jollof — keep old links working.
      { source: "/coffee", destination: "/jollof", permanent: true },
    ];
  },
};

export default nextConfig;
