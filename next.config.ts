import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...config.externals, 'zlib-sync'];
    }
    return config;
  },
};

export default nextConfig;
