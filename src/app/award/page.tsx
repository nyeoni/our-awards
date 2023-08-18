'use client';

import { ChangeEvent, createContext, useContext, useState } from 'react';

import { redirect, useRouter } from 'next/navigation';

import { Progress } from '@nextui-org/react';

import { ContentPage, HostPage, NamePage } from './_pages';
import Loading from './result/loading';

const pages = [{ Component: NamePage }, { Component: ContentPage }, { Component: HostPage }];

type TargetInfo = {
  name: string;
  content: string;
  host: string;
};

export const TargetInfoContext = createContext<TargetInfo | null>(null);

export const useTargetInfoContext = () => {
  const context = useContext(TargetInfoContext);
  if (!context) {
    throw new Error('useTargetInfoContext must be used within a TargetInfoContext');
  }
  return context;
};

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [targetInfo, setTargetInfo] = useState({
    name: '',
    content: '',
    host: '',
  });
  const [step, setStep] = useState(0); // [0, 1, 2
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

      const { id } = await res.json();

      if (res.status !== 200) {
        // 고쳐야함
        console.log('what the');
      } else {
        router.replace(`/award/result/${id}`);
      }
    } catch (error) {
      throw new Error('gpt error');
      // console.log('gpt fuck error', error);
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

  const handleTargetInfoChange = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setTargetInfo(prev => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    <Loading />;
  }
  return (
    <>
      <Progress
        aria-label="진행상황"
        className="fixed top-0"
        size="sm"
        value={((step + 1) / pages.length) * 100}
      />
      <TargetInfoContext.Provider value={targetInfo}>
        <CurrentPageComponent onNext={handleNext} onValueChange={handleTargetInfoChange} />
      </TargetInfoContext.Provider>
    </>
  );
}
