'use client';

import { handleErrorApi } from '@/utils/util';
import { usePathname, useRouter } from 'next/navigation';
import authApiRequest from '@/api/auth';
import { PinLeft } from '@/components/atoms/icons/PinLeft';
import React from 'react';
import { ROUTES } from '@/constraints/route';

export default function ButtonLogout() {
  const router = useRouter();
  const pathname = usePathname();
  const handleLogout = async () => {
    try {
      await authApiRequest.logoutFromNextClientToNextServer();
      router.push(ROUTES.login.path);
    } catch (error) {
      handleErrorApi({
        error,
      });
      authApiRequest.logoutFromNextClientToNextServer(true).then(res => {
        router.push(`${ROUTES.login.path}?redirectFrom=${pathname}`);
      });
    } finally {
      router.refresh();
    }
  };
  return (
    <div className={`left-sidebar-link group `} onClick={handleLogout}>
      <div className="flex gap-4 items-center p-4 text-muted-foreground">
        <PinLeft />
        Logout
      </div>
    </div>
  );
}
