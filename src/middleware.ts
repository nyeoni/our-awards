import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // root path
  console.log('fuck', request.nextUrl.pathname);
  if (request.nextUrl.pathname === '/') {
    console.log('middleware: root path');
    return NextResponse.rewrite(new URL('/auth', request.url));
  }

  // if (request.nextUrl.pathname.startsWith('/dashboard')) {
  //   return NextResponse.rewrite(new URL('/dashboard/user', request.url));
  // }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
