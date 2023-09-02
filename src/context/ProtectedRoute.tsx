'use client';

import { useEffect } from 'react';

import { Spinner } from '@nextui-org/react';
import { redirect } from 'next/navigation';

import { useSession } from 'next-auth/react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/api/auth/signin');
    }
  }, [status]);

  if (status === 'loading') {
    return (
      <div className="flex justify-center w-full h-full">
        <Spinner color="default" />
      </div>
    );
  }
  return <>{children}</>;
}
