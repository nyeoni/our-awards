'use client';

import { useState } from 'react';

import { Progress } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

import TargetInfoProvider, { useTargetInfoContext } from '@/contexts/TargetInfoProvider';

import { ContentPage, HostPage, NamePage } from './_pages';
import { ResultLoading } from './ResultLoading';
import { ROUTE } from '@/constants/route';
import { BackButton } from '@/components';

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
        router.replace(`${ROUTE.AWARD.RESULT}/${id}`);
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
    return <ResultLoading />;
  }
  return (
    <>
      <Progress
        aria-label="진행상황"
        className="fixed top-0"
        size="sm"
        value={((step + 1) / pages.length) * 100}
      />
      {step > 0 && (
        <BackButton className="self-start px-0" onClick={() => setStep(prev => prev - 1)}>
          이전으로
        </BackButton>
      )}
      <CurrentPageComponent onNext={handleNext} />
    </>
  );
};
