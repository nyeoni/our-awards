import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { getToken } from 'next-auth/jwt';
import type { NextRequestWithAuth } from 'next-auth/middleware';

import withAuth from './libs/withAuth';

const withAuthList = ['/', '/create'];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  // 사용자가 요청하는 페이지 pathname
  const agent = req.headers.get('user-agent') || '';
  const isInApp = /kakao|instagram/i;

  if (isInApp.test(agent)) {
    return NextResponse.redirect(new URL('/inapp', req.url));
  }

  const { pathname } = req.nextUrl;
  // 해당 pathname이 미리 정의해둔 withAuth, withOutAuth 배열 중 어디에 속하는지 확인
  const isWithAuth = withAuthList.includes(pathname);

  if (isWithAuth) return withAuth(req as NextRequestWithAuth, !!token as any);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets|fonts|svgs|style|styles).*)'],
};
