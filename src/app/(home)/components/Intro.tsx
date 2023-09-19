'use client';

import { useSession } from 'next-auth/react';
// import { useEffect, useState } from 'react';
import { getAward } from '../../getAwards';
import { Skeleton } from '@nextui-org/react';

export default async function Intro() {
  // const [total, setTotal] = useState(0);
  const { data: session } = useSession();
  const data = await getAward();

  // useEffect(() => {
  //   const update = async () => {
  //     // const data = await getAward();
  //     if (data) {
  //       setTotal(data.total);
  //     }
  //   };
  //   update();
  // }, []);

  return (
    <>
      <div className="font-uhbee-regular text-2xl">{session?.user.name} 님은</div>
      <div className="font-uhbee-regular text-2xl">
        총 <span className="text-secondary">{data.total}</span> 개의 상을 받았습니다.
      </div>
    </>
  );
}

export const IntroSkeleton = () => {
  return (
    <>
      <Skeleton className="w-3/5 h-6 rounded-lg" />
      <Skeleton className="w-4/5 h-6 rounded-lg" />
    </>
  );
};
