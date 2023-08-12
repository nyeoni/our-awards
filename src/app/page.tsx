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
      <section className="flex flex-col gap-1 w-full">
        <div className="font-uhbee-regular text-2xl">{session?.user.name} 님은</div>
        <div className="font-uhbee-regular text-2xl">
          총 <span className="text-amber-300">0</span> 개의 상을 받았습니다.
        </div>
      </section>
      <Button color="primary" onClick={() => signOut()}>
        Sign out
      </Button>
    </>
  );
}
