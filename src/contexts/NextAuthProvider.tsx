'use client';

import type { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

export default function NextAuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider refetchInterval={60 * 30} refetchOnWindowFocus={false}>
      {children}
    </SessionProvider>
  );
}
