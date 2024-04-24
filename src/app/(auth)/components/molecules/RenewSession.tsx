'use client';

import { useEffect } from 'react';
import { differenceInHours } from 'date-fns';
import authApiRequest from '@/api/auth';
import { clientSessionToken } from '@/_lib/http';

export default function RenewSession() {
  useEffect(() => {
    const interval = setInterval(
      async () => {
        const now = new Date();
        const expiresAt = new Date(clientSessionToken.expiresAt);
        if (differenceInHours(expiresAt, now) < 1) {
          const res = await authApiRequest.slideSessionFromNextClientToNextServer();
          clientSessionToken.expiresAt = res.data.expiresAt;
        }
      },
      1000 * 60 * 30,
    );
    // once 1 hour run 1 one time
    return () => clearInterval(interval);
  }, []);
  return null;
}
