/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'm3xtrader.com',
          },
        ],
      },
};

export default nextConfig;
