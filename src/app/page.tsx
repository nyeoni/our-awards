'use client';

import { Button } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Suspense } from 'react';

const Intro = dynamic(() => import('./Intro'), { ssr: false });
const AwardsSlide = dynamic(() => import('./AwardsSlide'), { ssr: false });

export default function Page() {
  return (
    <>
      <section className="flex flex-col gap-1 w-full mb-10 grow-0">
        <Suspense fallback={<div>Loading...</div>}>
          <Intro />
        </Suspense>
      </section>
      <section className="grow w-full flex">
        <Suspense fallback={<div>Fuckingng...</div>}>
          <AwardsSlide />
        </Suspense>
      </section>
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
    </>
  );
}
