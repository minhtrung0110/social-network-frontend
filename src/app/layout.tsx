import type { Metadata } from 'next';
import './globals.css';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@/components/templates/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import NextTopLoader from 'nextjs-toploader';
import RenewSession from '@/app/(auth)/components/molecules/RenewSession';
import { clsx } from 'clsx';
import AppProvider from '@/store/app-provider';
import { cookies } from 'next/headers';
import userApiRequest from '@/api/user';
import { FullUser } from '@/schema/user.schema';
import { QueryProvider } from '@/queries/QueryProvider';
import StoryMode from '@/app/(home)/components/organisms/StoryMode';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  let user: FullUser | null = null;
  if (sessionToken) {
    const res = await userApiRequest.me(sessionToken.value);
    user = res.data;
  }

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
          <QueryProvider>
            <AppProvider inititalSessionToken={sessionToken?.value ?? ''} user={user}>
              {children}
              <RenewSession />
              <StoryMode />
            </AppProvider>
          </QueryProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
