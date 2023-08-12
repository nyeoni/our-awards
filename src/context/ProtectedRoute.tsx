'use client';

import { useSession } from 'next-auth/react';

import { redirect } from 'next/navigation';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    redirect('/api/auth/signin');
  }

  return <>{children}</>;
}
