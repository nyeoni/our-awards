'use client';

import Image from 'next/image';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWRInfinite from 'swr/infinite';

import { Skeleton } from '@nextui-org/react';
import type { Award } from '@prisma/client';

import { ROUTE } from '@/constants/route';
import { getData } from '@/libs/api';

export const AwardItem = ({ award }: { award: Award }) => {
  return (
    <li className="flex flex-col items-center gap-y-1">
      <label className="block font-uhbee-regular text-xs text-neutral-100 w-[72px] truncate text-center">
        {award.label}
      </label>
      <Link href={`${ROUTE.AWARD.RESULT}/${award.id}`}>
        <Image src="/assets/award0.png" alt="award" width={72} height={72} />
      </Link>
    </li>
  );
};

export const AwardContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      key={Math.random()}
      className="flex items-end justify-center gap-0 w-full h-20 relative my-5"
    >
      <div className="oa-shelf oa-shelf-left grow-0" />
      <div className="oa-shelf oa-shelf-middle grow" />
      <div className="oa-shelf oa-shelf-right grow-0" />
      <ul className="absolute bottom-[10px] flex flex-column items-center justify-space gap-x-1 w-full h-full px-[16px]">
        {children}
      </ul>
    </div>
  );
};

const getKey = (pageIndex: number) => {
  return `/api/user/award?page=${pageIndex + 1}`;
};

type UserAwardsDto = {
  total: number;
  awards: Award[];
};

export default function AwardsSwiper() {
  const { data, setSize } = useSWRInfinite<UserAwardsDto>(getKey, getData, {
    suspense: true,
    initialSize: 2,
    dedupingInterval: 36000,
    refreshInterval: 36000,
    revalidateOnFocus: false,
    revalidateOnMount: false,
  });

  const handleSlideChange = () => {
    setSize(prev => prev + 1);
  };

  return (
    <Swiper
      slidesPerView={1}
      pagination={{
        dynamicBullets: true,
      }}
      onSlideChange={handleSlideChange}
      modules={[Pagination]}
      className="w-full"
    >
      {Array.from({ length: data ? Math.floor(data[0].total / 16) + 1 : 1 }).map((_, i) => (
        <AwardSwiperSlide key={i} awards={data && data[i] ? data[i].awards : []} />
      ))}
    </Swiper>
  );
}

const AwardSwiperSlide = ({ awards }: { awards: Award[] }) => {
  return (
    <SwiperSlide>
      {Array.from({ length: 4 }).map((_, j) => (
        <AwardContainer key={j}>
          {awards.slice(j * 4, j * 4 + 4).map(award => (
            <AwardItem key={award.id} award={award} />
          ))}
        </AwardContainer>
      ))}
    </SwiperSlide>
  );
};

export const AwardsSlideSkeleton = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <AwardContainer key={i}>
          <div className="flex flex-col items-center gap-y-1">
            <Skeleton className="rounded-lg h-[12px] w-[72px] opacity-70" />
            <Skeleton className="rounded-lg h-[72px] w-[72px] opacity-70" />
          </div>
        </AwardContainer>
      ))}
    </>
  );
};
