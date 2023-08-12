'use client';

import { stat } from 'fs';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { redirect } from 'next/navigation';

import { Spinner } from '@nextui-org/react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

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
