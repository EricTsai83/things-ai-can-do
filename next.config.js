/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_HUGGINGFACE_ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_HUGGINGFACE_ACCESS_TOKEN,
  },
};

module.exports = nextConfig;
