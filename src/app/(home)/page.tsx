'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import { Button } from '@nextui-org/react';

import { ROUTE } from '@/constants/route';

import { InAppInfoModalMemo } from '../InAppInfoModal';
import { AwardsSlideSkeleton } from './AwardsSlide';
import { IntroSkeleton } from './Intro';

// import AwardsSlide, { AwardsSlideSkeleton } from './AwardsSlide';
// import Intro, { IntroSkeleton } from './Intro';

const Intro = dynamic(() => import('./Intro'), { ssr: false, loading: () => <IntroSkeleton /> });
const AwardsSlide = dynamic(() => import('./AwardsSlide'), {
  ssr: false,
  loading: () => <AwardsSlideSkeleton />,
});

export default function Page() {
  return (
    <>
      <section className="flex flex-col gap-1 w-full grow-0 basis-12">
        <Intro />
      </section>
      <section className="w-full pt-10 flex flex-col grow">
        <AwardsSlide />
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
