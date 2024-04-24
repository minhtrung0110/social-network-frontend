import type { Metadata } from 'next';
import './globals.css';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@/components/templates/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import NextTopLoader from 'nextjs-toploader';
import RenewSession from '@/app/(auth)/components/molecules/RenewSession';
import { clsx } from 'clsx';

const roboto = Roboto({
  weight: ['400', '700', '500', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui', 'inter'],
});

export const metadata: Metadata = {
  title: 'Snap Gram',
  description: 'Social Network Working',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(roboto.className, 'overflow-hidden')}>
        <NextTopLoader />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <RenewSession />
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
