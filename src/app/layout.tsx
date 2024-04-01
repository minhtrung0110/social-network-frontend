import type { Metadata } from 'next';
import './globals.css';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@/components/templates/ThemeProvider';

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
