/** @type {import('next').NextConfig} */
const nextConfig = {
  // i18n is not compatible with static export
  // i18n: {
  //   locales: ['en','jp'],
  //   defaultLocale: 'en',
  // },
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};
module.exports = nextConfig;