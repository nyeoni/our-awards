'use client';

import { ChangeEvent, createContext, useContext, useState } from 'react';

import { Progress } from '@nextui-org/react';

import { Loading } from '@/component';

import { ContentPage, HostPage, NamePage } from './_pages';

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
  const [targetInfo, setTargetInfo] = useState({
    name: '',
    content: '',
    host: '',
  });
  const [step, setStep] = useState(0); // [0, 1, 2
  const CurrentPageComponent = pages[step].Component;

  const handleNext = () => {
    if (step === pages.length - 1) {
      // finish
      console.log('finish');
      setIsLoading(true);
      return;
    }
    setStep(step + 1);
  };

  const handleTargetInfoChange = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setTargetInfo(prev => ({ ...prev, [name]: value }));
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
      <TargetInfoContext.Provider value={targetInfo}>
        <CurrentPageComponent onNext={handleNext} onValueChange={handleTargetInfoChange} />
      </TargetInfoContext.Provider>
    </>
  );
}
