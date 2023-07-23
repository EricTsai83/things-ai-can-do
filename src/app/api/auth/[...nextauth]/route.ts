import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';

const handler = NextAuth({
  providers: [
    GithubProvider({
      // @ts-ignore
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      // @ts-ignore
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      // @ts-ignore
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      // @ts-ignore
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
  ],
});

export { handler as GET, handler as POST };
