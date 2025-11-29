/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: ['**/data.json', '**/node_modules/**'],
      };
    }
    return config;
  },
};

export default nextConfig;
