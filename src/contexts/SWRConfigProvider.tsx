'use client';

import { SWRConfig } from 'swr';

const fetchData = async (url: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}${url}`);

  if (!res.ok) {
    throw new Error('SWRConfigProvider: Failed to fetch data');
  }
  return res.json();
};

export const SWRConfigProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig value={{ provider: () => new Map(), suspense: true, fetcher: fetchData }}>
      {children}
    </SWRConfig>
  );
};
