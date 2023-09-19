'use client';

import Confetti from 'react-confetti';

import useWindowSize from '@/hooks/useWindowSize';

export function BgAnimation() {
  const { width, height } = useWindowSize();

  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={150}
      gravity={0.05}
      opacity={0.75}
      style={{ zIndex: -1 }}
    />
  );
}
