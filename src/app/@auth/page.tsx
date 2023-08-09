import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import type { AppProps } from 'next/app';

import { Logo } from '@/component/logo';
import { Wrapper } from '@/component/wrapper';

export default function Login({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider>
      <Wrapper>
        <Logo />
        <Component {...pageProps} />
      </Wrapper>
    </SessionProvider>
  );
}
