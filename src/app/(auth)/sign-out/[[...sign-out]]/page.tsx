'use client';

import { clientSessionToken } from '@/_lib/http';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import authApiRequest from '@/api/auth';
import { ROUTES } from '@/constrants/route';

export default function Logout() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sessionToken = searchParams.get('sessionToken');
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (sessionToken === clientSessionToken.value) {
      authApiRequest.logoutFromNextClientToNextServer(true, signal).then(res => {
        router.push(`${ROUTES.login.path}?redirectFrom=${pathname}`);
      });
    }
    return () => {
      controller.abort();
    };
  }, [sessionToken, router, pathname]);
  return <div>page</div>;
}
