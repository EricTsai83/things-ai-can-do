import NextAuth from 'next-auth/next';
// import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';

const handler = NextAuth({
  providers: [
    GithubProvider({
      // @ts-ignore
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      // @ts-ignore
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
    }),
  ],
});

export { handler as GET, handler as POST };

// Initialize NextAuth

// export default NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId:
//         '317091199727-sahn5faj0apkf82nkdm66s902cveur19.apps.googleusercontent.com',
//       clientSecret: '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',
//     }),
//   ],
// });

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId:
//         '317091199727-sahn5faj0apkf82nkdm66s902cveur19.apps.googleusercontent.com',
//       clientSecret: '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',
//     }),
//   ],
// });

// export { handler as Get, handler as POST };

// import NextAuth from 'next-auth/next';
// import CredentialsProvider from 'next-auth/providers/credentials';
// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       // The name to display on the sign in form (e.g. "Sign in with...")
//       name: 'Credentials',
//       // `credentials` is used to generate a form on the sign in page.
//       // You can specify which fields should be submitted, by adding keys to the `credentials` object.
//       // e.g. domain, username, password, 2FA token, etc.
//       // You can pass any HTML attribute to the <input> tag through the object.
//       credentials: {
//         username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials, req) {
//         // Add logic here to look up the user from the credentials supplied
//         const res = await fetch('http://localhost:3000/api/login', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             username: credentials?.username,
//             password: credentials?.password,
//           }),
//         });

//         const user = await res.json();

//         if (user) {
//           // Any object returned will be saved in `user` property of the JWT
//           return user;
//         } else {
//           // If you return null then an error will be displayed advising the user to check their details.
//           return null;

//           // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       return { ...token, ...user };
//     },

//     async session({ session, token }) {
//       session.user = token as any;
//       return session;
//     },
//   },
// });

// export { handler as GET, handler as POST };
