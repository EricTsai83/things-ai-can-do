/** @type {import('next').NextConfig} */
const nextConfig = {
  compilerOptions: {
    baseUrl: '.',
    paths: {
      '@/utils/*': ['utils/*'],
      '@/components/*': ['components/*'],
    },
  },
};

module.exports = nextConfig;
