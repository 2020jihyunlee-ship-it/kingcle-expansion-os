import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from "@/app/providers";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kingcle Expansion OS',
  description: 'AI 기반 1인 기업 성장 운영 시스템. 킹클코치 이지현의 Kingcle Expansion OS.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        {/* <Providers> */}
        {/* <Navbar /> */}
        <main className="flex-1">{children}</main>
        {/* <Footer /> */}
        {/* </Providers> */}
      </body>
    </html>
  );
}
