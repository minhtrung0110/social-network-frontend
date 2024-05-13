import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { checkPrivateRoute } from '@/utils/util';
import { ROUTES, SNRoute } from '@/constrants/route';

// @ts-ignore
const privatePaths: string[] = Object.values(ROUTES).reduce((acc: string[], item: SNRoute) => {
  if (item.isPrivate) acc.push(item.path);
  return acc;
}, []);
// @ts-ignore
const authPaths: string[] = Object.values(ROUTES).reduce((acc: string[], item: SNRoute) => {
  if (!item.isPrivate) acc.push(item.path);
  return acc;
}, []);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get('sessionToken')?.value;
  // If user isn't login, redirect to login page
  if (checkPrivateRoute(pathname, privatePaths) && !sessionToken) {
    return NextResponse.redirect(new URL(ROUTES.login.path, request.url));
  }

  // If user is login, redirect to private pages
  const conditionVerify = authPaths.some(path => pathname.startsWith(path));
  if (conditionVerify && sessionToken) {
    return NextResponse.redirect(new URL(ROUTES.HOME.path, request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: Object.values(ROUTES).map(route => route.path),
};
