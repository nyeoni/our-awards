'use client';

import { SWRConfig } from 'swr';

export const SWRConfigProvider = ({ children }: { children: React.ReactNode }) => {
  return <SWRConfig value={{ suspense: true }}>{children}</SWRConfig>;
};
