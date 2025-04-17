import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enabling React Strict Mode for better dev experience

  // Disable Turbopack (experimental) in all environments
  webpack: (config) => {
    if (process.env.TURBOPACK === 'false') {
      // Disable Turbopack bindings explicitly in production or dev
      config.resolve.alias['react-server-dom-turbopack'] = false;
    }
    return config;
  },

  // Enable Webpack for production builds if Turbopack is not needed
  typescript: {
    // Optional: Enable this if you want to throw errors on type issues
    ignoreBuildErrors: false,
  },

  // Additional optimizations for builds can be added here (optional)
};

export default nextConfig;
