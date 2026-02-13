import "./src/env";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["plus.unsplash.com", "images.unsplash.com"], // 👈 এখানে তোমার image hostnames যোগ করো
  },
};

export default nextConfig;
