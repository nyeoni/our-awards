'use client';

import { useState } from 'react';

import Lottie from 'lottie-react';

import sparklesAnimation from './sparkles_animation.json';

export function SparklesAnimation() {
  const [isAnimationComplete, setAnimationComplete] = useState(false);

  const handleComplete = () => {
    setAnimationComplete(true);
  };

  return (
    <>
      {!isAnimationComplete && (
        <div className="fixed bottom-1/3 flex w-full justify-center">
          <Lottie animationData={sparklesAnimation} loop={false} onComplete={handleComplete} />
        </div>
      )}
    </>
  );
}
