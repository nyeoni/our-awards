'use client';

import { useRef } from 'react';

import {
  Award,
  ImgSaveButton,
  NavigateButton,
  ShareButton,
  SparklesAnimation,
} from '../../components';

export default async function Page({ params }: { params: { id: string } }) {
  const captureRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <NavigateButton path="/" />
      <div ref={captureRef}>
        <Award awardId={params.id} />
      </div>
      <section className="flex flex-col gap-y-2 grow-0">
        <ShareButton id={params.id} />
        <ImgSaveButton captureRef={captureRef} />
      </section>
      <SparklesAnimation />
    </div>
  );
}
