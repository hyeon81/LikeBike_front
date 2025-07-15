import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://kr.object.ncloudstorage.com/likebike.media/**"),
    ],
  },
};

export default nextConfig;
