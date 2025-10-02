/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'm3xtrader.com',
          },
          {
            protocol: 'https',
            hostname: 'couponri.divenclave.com',
          },
        ],
      },
};

export default nextConfig;
