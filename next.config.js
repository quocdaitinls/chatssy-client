/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@use "styles/variables.scss" as vars;`,
  },
  images: {
    domains: ["wallpaperaccess.com"],
  },
};

module.exports = nextConfig;
