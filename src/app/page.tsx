'use client';

import dynamic from 'next/dynamic';

import { UserAwardsProvider } from './context';

const MainPage = dynamic(() => import('./component'), { ssr: false });

export default async function Page() {
  return (
    <UserAwardsProvider>
      <MainPage />
    </UserAwardsProvider>
  );
}
