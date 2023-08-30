import { NextAuthOptions } from 'next-auth';
import type { Adapter } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';

import { PrismaAdapter } from '@auth/prisma-adapter';

import prisma from '@/api/prisma';

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma) as Adapter,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('signIn', user, account, profile, email, credentials);
      // 여기서 사용자 로그인을 검증하거나 추가적인 동작을 수행할 수 있습니다.
      // 로그인이 유효하다면 true를 반환하십시오. 그렇지 않으면 false를 반환합니다.
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log('redirect', url, baseUrl);
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async jwt({ token, user, account, profile }) {
      console.log('jwt', token, user, account, profile);
      // Persist the OAuth access_token and or the user id to the token right after signin
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      // 필요한 경우 세션 객체에 추가 데이터를 추가하십시오.
      session.user = token as any;
      console.log('session', session, token, user);
      return session;
    },
  },
  pages: {
    signIn: '/auth',
  },
};

export default authOptions;
