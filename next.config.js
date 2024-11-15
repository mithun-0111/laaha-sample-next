/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        // protocol: 'https',
        hostname: 'baef-2409-40f2-305a-6fb2-ce3f-5ba4-50bf-e989.ngrok-free.app',
        // port: '',
        // pathname: '/sites/default/files/**',
      },
    ],
    localPatterns: [{
      pathname: '/assets/images/**',
      search: ''
    }]
  },
}
module.exports = withNextIntl(nextConfig);
