'use client';

import { getAward, UserAwardsProvider } from './context';
import { useSession } from 'next-auth/react';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { Suspense } from 'react';

import AwardsSlide from './AwardsSlide';

export default async function Page() {
  const { data: session } = useSession();
  const { total, awards } = await getAward();

  return (
    <UserAwardsProvider>
      <section className="flex flex-col gap-1 w-full mb-10 grow-0">
        <div className="font-uhbee-regular text-2xl">{session?.user.name} 님은</div>
        <div className="font-uhbee-regular text-2xl">
          총 <span className="text-secondary">{total}</span> 개의 상을 받았습니다.
        </div>
      </section>
      <Suspense fallback={<div>Loading...</div>}>
        <AwardsSlide initAwards={awards} total={total} />
      </Suspense>
      <Button
        as={Link}
        href="/award"
        className="font-medium grow-0"
        fullWidth={true}
        color="primary"
        size="lg"
        radius="sm"
      >
        시상식 개최하기
      </Button>
    </UserAwardsProvider>
  );
}
