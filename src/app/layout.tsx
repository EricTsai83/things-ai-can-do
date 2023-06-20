// Reference: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required

// The root layout is defined at the top level of the app directory and
// applies to all routes. This layout enables you to modify the initial
// HTML returned from the server.

// Good to know:
// ========================
// The app directory must include a root layout.
// The root layout must define <html> and <body> tags since Next.js does not automatically create them.
// You can use the built-in SEO support to manage <head> HTML elements, for example, the <title> element.
// You can use route groups to create multiple root layouts. See an example here.
// The root layout is a Server Component by default and can not be set to a Client Component.

import './globals.css';
import { Providers } from './GlobalRedux/provider';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import { NextAuthProvider } from './provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Things AI Can Do',
  description: 'Make AI Do Thing For You',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {/* <NextAuthProvider> */}
          <div className="max-w-5xl mx-auto px-8">
            {/* <Navbar /> */}
            <div className="pt-16"> {children}</div>
          </div>
          {/* </NextAuthProvider> */}
        </Providers>
      </body>
    </html>
  );
}
