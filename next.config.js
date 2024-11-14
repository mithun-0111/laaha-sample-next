/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        // protocol: 'https',
        hostname: '7257-2409-40f2-3040-74c9-df9c-aa9e-9bc6-c77.ngrok-free.app',
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
