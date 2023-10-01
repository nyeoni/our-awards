'use client';

import { IntroSkeleton } from './Intro';

export default function Loading() {
  return (
    <>
      <section className="flex flex-col gap-1 w-full mb-10 grow-0 basis-12">
        <IntroSkeleton />
      </section>
      <section className="grow w-full flex">{/* <AwardsSlide /> */}</section>
    </>
  );
}
