import { Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import Header from '@/components/Header';
import SideNavbar from '@/components/SideNavbar';
import './globals.css';
import { NextAuthProvider } from './provider';

export const metadata = {
  title: {
    default: 'Things AI Can Do',
    template: '%s | Things AI Can Do',
  },
  description: 'Make AI Do Things For You',
  keywords: ['Artificial Intelligence', 'Machine Learning', 'Data Science'],
  openGraph: {
    title: 'Things AI Can Do',
    description:
      '透過互動的教學，讓您暸解 AI 的實際應用，解放你的大腦、釋放你的時間和加速你的工作效率。一起學習 AI 吧！讓它成為你人生最大的助力！',
    url: 'https://main.d1iicrvwglvc93.amplifyapp.com/',
    images: [
      {
        url: 'https://www.marktechpost.com/wp-content/uploads/2023/04/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai-scaled.jpg',
        width: 800,
        height: 600,
      },
    ],
  },
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader color="linear-gradient(to right, rgb(153, 246, 228), rgb(217, 249, 157))" />
        <NextAuthProvider>
          <div className="w-full">
            <Header />
            <div className="flex">
              <SideNavbar />
              <div className="mb-20 xl:ml-60 ">{children}</div>
            </div>
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
