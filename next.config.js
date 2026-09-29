/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ru-msk-dr3-1.store.cloud.mts.ru",
      },
    ],
  },
};

module.exports = nextConfig;
