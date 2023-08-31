'use client';

import { useRef } from 'react';

import {
  Award,
  ImgSaveButton,
  NavigateButton,
  ShareButton,
  SparklesAnimation,
} from '../../components';

async function getAward(id: string) {
  if (!id) return;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/award/${id}`);
  return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {
  const captureRef = useRef<HTMLDivElement>(null);
  const award = await getAward(params.id);

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <NavigateButton path="/" />
      <div ref={captureRef}>
        <Award award={award} />
      </div>
      <section className="flex flex-col gap-y-2 grow-0">
        <ShareButton id={params.id} />
        <ImgSaveButton captureRef={captureRef} />
      </section>
      <SparklesAnimation />
    </div>
  );
}
