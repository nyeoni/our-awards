'use client';

import Lottie from 'lottie-react';

import lottieData from './trophy_animation.json';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Lottie animationData={lottieData} style={{ width: '40%' }} />
      <div className="font-uhbee-regular mt-5">
        <span className="text-secondary">상장</span>을 만드는 중이에요
      </div>
    </div>
  );
}
