'use client';

import { Button } from '@nextui-org/react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ROUTE } from '@/constants/route';

import { IntroSkeleton } from './Intro';

const Intro = dynamic(() => import('./Intro'), {
  loading: () => <IntroSkeleton />,
  ssr: false,
});
// const AwardsSlide = dynamic(() => import('./AwardsSlide'), { ssr: false });

export default function Page() {
  return (
    <>
      <section className="flex flex-col gap-1 w-full mb-10 grow-0 basis-12">
        <Intro />
      </section>
      <section className="grow w-full flex">
        {/* <Suspense fallback={<div>Fuckingng...</div>}>
          <AwardsSlide />
        </Suspense> */}
      </section>
      <Button
        as={Link}
        href={ROUTE.AWARD.CREATE}
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
