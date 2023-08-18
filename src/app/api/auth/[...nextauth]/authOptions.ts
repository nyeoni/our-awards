import { NextAuthOptions } from 'next-auth';
import type { Adapter } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';

import { PrismaAdapter } from '@auth/prisma-adapter';

import prisma from '@/api/prisma';

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
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
    async signIn({ user, account, profile }) {
      // 여기서 사용자 로그인을 검증하거나 추가적인 동작을 수행할 수 있습니다.
      // 로그인이 유효하다면 true를 반환하십시오. 그렇지 않으면 false를 반환합니다.
      return true;
    },
    async redirect({ url, baseUrl }) {
      // 로그인 성공 후 리다이렉트될 URL을 지정합니다.
      // 기본적으로 로그인 후에는 '/api/auth/signin'으로 리다이렉트됩니다.
      // 여기서는 로그인에 성공하면 루트 페이지('/')로 리다이렉트하도록 설정합니다.
      console.log('redirect', url, baseUrl);
      return baseUrl;
    },
    async session({ session, user }) {
      // 필요한 경우 세션 객체에 추가 데이터를 추가하십시오.
      return session;
    },
  },
  theme: {
    colorScheme: 'dark',
    logo: '/assets/logo.png',
  },
};

export default authOptions;
