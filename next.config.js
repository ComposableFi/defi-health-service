const WindiCSS = require('windicss-webpack-plugin');
//@ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, context) => {
    config.plugins.push(new WindiCSS());
    return config;
  },
  generateEtags: false,
  poweredByHeader: false,
};

module.exports = nextConfig;
