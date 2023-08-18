'use client';

import { Spinner } from '@nextui-org/react';

export default function Loading() {
  return (
    <div className="flex justify-center w-full h-full">
      <Spinner color="default" />
    </div>
  );
}
