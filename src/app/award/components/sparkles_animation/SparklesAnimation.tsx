'use client';

import Lottie from 'lottie-react';
import { useState } from 'react';

import sparklesAnimation from './sparkles_animation.json';

export default function SparklesAnimation() {
  const [isAnimationComplete, setAnimationComplete] = useState(false);

  const handleComplete = () => {
    setAnimationComplete(true);
  };

  return (
    <>
      {!isAnimationComplete && (
        <Lottie
          className="fixed top-10 left-0"
          animationData={sparklesAnimation}
          loop={false}
          onComplete={handleComplete}
        />
      )}
    </>
  );
}
