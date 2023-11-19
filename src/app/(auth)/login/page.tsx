'use client';

import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { signIn } from 'next-auth/react';

import { InAppInfoModalMemo } from '@/app/InAppInfoModal';
import { Logo, Toast } from '@/components';
import { GoogleBtn, KakaoBtn, NaverBtn } from '@/components/oauth';

import { BgAnimation } from '../BgAnimation';

const OAUTH_ACCOUNT_NOT_LINKED = 'OAuthAccountNotLinked';
const UNAUTHORIZED_ERROR = 'Unauthorized';
const UNEXPECTED_ERROR = 'UnexpectedError';
type AuthError =
  | typeof OAUTH_ACCOUNT_NOT_LINKED
  | typeof UNAUTHORIZED_ERROR
  | typeof UNEXPECTED_ERROR
  | null;

export default function Page() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/';
  const [error, setError] = useState<{ type: AuthError; message: string }>({
    type: null,
    message: '',
  });
  const isError = error.type !== null;

  useEffect(() => {
    const error = searchParams.get('error');

    if (!error) return;
    console.log('error', error);
    if (error === 'OAuthAccountNotLinked') {
      setError({
        type: OAUTH_ACCOUNT_NOT_LINKED,
        message: '이미 가입된 계정입니다.',
      });
    } else if (error === 'Unauthorized') {
      setError({
        type: UNAUTHORIZED_ERROR,
        message: '로그인을 진행해주세요.',
      });
    } else {
      setError({
        type: UNEXPECTED_ERROR,
        message: '예상치 못한 오류가 발생했습니다.',
      });
    }
  }, [searchParams]);

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-full ">
        <section className="flex flex-col justify-center items-center my-5 gap-5">
          <Logo />
          <span className="font-uhbee-regular text-xs text-gray-300">
            서로 칭찬하며 상장을 주고 받아보세요!
          </span>
        </section>
        <section className="flex flex-col w-full p-5 gap-2 justify-center">
          <NaverBtn onClick={() => signIn('naver', { redirect: true, callbackUrl })} />
          <KakaoBtn onClick={() => signIn('kakao', { redirect: true, callbackUrl })} />
          <GoogleBtn onClick={() => signIn('google', { redirect: true, callbackUrl })} />
        </section>
      </div>
      <BgAnimation />
      <Toast isVisible={isError} message={error.message} />
      <InAppInfoModalMemo />
    </>
  );
}
