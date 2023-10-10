import { withAuth } from 'next-auth/middleware';

export default withAuth({
  // Options
  // Required: The minimum level of user required to access this route
  // If not specified, all authenticated users are allowed access
  // Minimum level is 0 (public) through 100 (admin)
  // If access is denied, the server will respond with HTTP error code 403 (Forbidden)
  // level: 10,
  // callbacks: {
  //   authorized: ({ token }) => {
  //     console.log('authorized', token);
  //     return !!token;
  //   },
  // },
  pages: {
    signIn: '/login',
  },
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets|svgs|style|result).*)'],
};
