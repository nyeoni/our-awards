'use client';

import { AwardsSlideSkeleton } from './AwardsSlide';
import { IntroSkeleton } from './Intro';

export default function Loading() {
  return (
    <>
      <IntroSkeleton />
      <AwardsSlideSkeleton />
    </>
  );
}
