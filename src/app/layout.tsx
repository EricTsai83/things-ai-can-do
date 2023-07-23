import './globals.css';
import { ReduxProviders } from './GlobalRedux/provider';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import SideNavbar from '@/components/SideNavbar';
import { NextAuthProvider } from './provider';
import NextTopLoader from 'nextjs-toploader';

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
        <NextTopLoader color="linear-gradient(to right, rgb(153, 246, 228), rgb(217, 249, 157))" />
        {/* 所有 provider 之後可以整合再一起 */}
        <ReduxProviders>
          <NextAuthProvider>
            <div className="w-full">
              <Header />
              <div className="flex">
                <SideNavbar />
                <div className="mb-20 xl:ml-60 "> {children}</div>
              </div>
            </div>
          </NextAuthProvider>
        </ReduxProviders>
      </body>
    </html>
  );
}
