// default config
// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig



/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    remotePatterns: [
      {hostname: 'lh3.googleusercontent.com'}
    ]
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    return config;
  },
};

module.exports = nextConfig;
