/** @type {import('next').NextConfig} */
const nextConfig = {
  compilerOptions: {
    baseUrl: '.',
    paths: {
      '@/utils/*': ['utils/*'],
      '@/components/*': ['components/*'],
    },
  },
  env: {
    NEXT_PUBLIC_HUGGINGFACE_ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_HUGGINGFACE_ACCESS_TOKEN,
  },
};

module.exports = nextConfig;
