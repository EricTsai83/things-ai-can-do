/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_HUGGINGFACE_ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_HUGGINGFACE_ACCESS_TOKEN,
    NEXT_PUBLIC_CHATGPT_API_KEY: process.env.NEXT_PUBLIC_CHATGPT_API_KEY,
    NEXT_PUBLIC_GOOGLE_ID: process.env.NEXT_PUBLIC_GOOGLE_ID,
    NEXT_PUBLIC_GOOGLE_SECRET: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
    NEXT_PUBLIC_GITHUB_CLIENT_ID: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
    NEXT_PUBLIC_GITHUB_CLIENT_SECRET:
      process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  images: { domains: ['avatars.githubusercontent.com'] },
};

module.exports = nextConfig;
