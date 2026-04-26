import "./src/env";
import type { NextConfig } from "next";
import { env } from "./src/env";

const nextConfig: NextConfig = {
  images: {
    // domains: [
    //   "plus.unsplash.com",
    //   "images.unsplash.com",
    //   "new.com",
    //   "i.ibb.co.com",
    //   "lh3.googleusercontent.com",
    //   "github.com",
    //   "medi-store-client-alpha.vercel.app"
    // ],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${env.NEXT_PUBLIC_API_URL}/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;
