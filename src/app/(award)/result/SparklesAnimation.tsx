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
        <div className="fixed bottom-1/3 left-auto flex w-full">
          <Lottie animationData={sparklesAnimation} loop={false} onComplete={handleComplete} />
        </div>
      )}
    </>
  );
}
