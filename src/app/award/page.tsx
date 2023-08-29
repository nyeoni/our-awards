'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Progress } from '@nextui-org/react';

import TargetInfoProvider, { useTargetInfoContext } from '@/context/TargetInfoProvider';

import { ContentPage, HostPage, NamePage } from './_pages';
import Loading from './result/load';

const pages = [{ Component: NamePage }, { Component: ContentPage }, { Component: HostPage }];

export default function Page() {
  return (
    <TargetInfoProvider>
      <AwardPage />
    </TargetInfoProvider>
  );
}

const AwardPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const targetInfo = useTargetInfoContext();

  const CurrentPageComponent = pages[step].Component ?? null;

  const handleCreateAward = async () => {
    console.log('create award');
    try {
      const res = await fetch('/api/award', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(targetInfo),
      });

      console.log('check', res);
      const { id } = await res.json();

      if (res.status !== 200) {
        // 고쳐야함
        console.log('what the');
      } else {
        router.replace(`/award/result/${id}`);
      }
    } catch (error) {
      throw new Error('gpt error');
    }
  };

  const handleNext = () => {
    if (step === pages.length - 1) {
      console.log('finish');
      setIsLoading(true);
      handleCreateAward();
    } else {
      setStep(step + 1);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Progress
        aria-label="진행상황"
        className="fixed top-0"
        size="sm"
        value={((step + 1) / pages.length) * 100}
      />
      <CurrentPageComponent onNext={handleNext} />
    </>
  );
};
