'use client';

import { useSession } from 'next-auth/react';
import useSWR from 'swr';

// import { useEffect, useState } from 'react';
import { Skeleton } from '@nextui-org/react';

import { getData } from '@/libs/api';

export default function Intro() {
  // const [total, setTotal] = useState(0);
  const { data: session } = useSession({ required: true });
  const { data } = useSWR('/api/user/award?page=1', getData, { suspense: true });

  return (
    <>
      <div className="font-uhbee-regular text-2xl">{session?.user.name} 님은</div>
      <div className="font-uhbee-regular text-2xl">
        총 <span className="text-secondary">{data?.total}</span> 개의 상을 받았습니다.
      </div>
    </>
  );
}

export const IntroSkeleton = () => {
  return (
    <>
      <Skeleton className="w-3/5 h-8 rounded-xl opacity-60">
        <div className="font-uhbee-regular text-2xl"></div>
      </Skeleton>
      <Skeleton className="w-4/5 h-8 rounded-xl opacity-60">
        <div className="font-uhbee-regular text-2xl"></div>
      </Skeleton>
    </>
  );
};
