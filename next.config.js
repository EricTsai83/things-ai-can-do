/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_HUGGINGFACE_ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_HUGGINGFACE_ACCESS_TOKEN,
    NEXT_PUBLIC_CHATGPT_API_KEY: process.env.NEXT_PUBLIC_CHATGPT_API_KEY,
  },
};

module.exports = nextConfig;
