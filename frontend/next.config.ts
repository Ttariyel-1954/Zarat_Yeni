import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  experimental: {
    serverActions: { allowedOrigins: ['localhost:3000'] },
  },
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'}/api/:path*`,
      },
    ]
  },
}

export default nextConfig;
