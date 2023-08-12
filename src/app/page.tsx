'use client';

import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { Button } from '@nextui-org/button';

export default function Home() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      console.log(session);
    }
  }, [session]);

  return (
    <>
      <Button color="primary" onClick={() => signOut()}>
        Sign out
      </Button>
    </>
  );
}
