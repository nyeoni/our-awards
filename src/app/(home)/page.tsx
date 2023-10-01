'use client';

import Link from 'next/link';

import { Button } from '@nextui-org/react';

import { ROUTE } from '@/constants/route';

import AwardsSlide from './AwardsSlide';
import Intro from './Intro';

export default function Page() {
  return (
    <>
      <section className="flex flex-col gap-1 w-full mb-10 grow-0 basis-12">
        <Intro />
      </section>
      <section className="grow w-full flex">
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
