'use client';

import Image from 'next/image';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWRInfinite from 'swr/infinite';

import type { Award } from '@prisma/client';

import { ROUTE } from '@/constants/route';

const AwardItem = ({ award }: { award: Award }) => {
  return (
    <li key={award.id} className="flex flex-col items-center gap-y-1">
      <label className="block font-uhbee-regular text-xs text-neutral-100 w-[72px] truncate text-center">
        {award.label}
      </label>
      <Link href={`${ROUTE.AWARD.RESULT}/${award.id}`}>
        <Image src="/assets/award0.png" alt="award" width={72} height={72} />
      </Link>
    </li>
  );
};

const AwardContainer = ({ children }: { children: React.ReactNode }) => {
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
        {/* {awards &&
              awards[i] &&
              awards[i].map(award => <AwardItem key={award.id} award={award} />)} */}
      </ul>
    </div>
  );
};

const getKey = (pageIndex: number) => {
  return `${process.env.NEXT_PUBLIC_BASEURL}/api/user/award?page=${pageIndex + 1}`;
};

type UserAwardsDto = {
  total: number;
  awards: Award[];
};

const getUserAwards = async (url: string): Promise<UserAwardsDto> => {
  const res = await fetch(url);

  if (!res.ok) {
    console.group('res', res);
    // This will activate the closest `error.js` Error Boundary
    throw new Error('getUserAwards: Failed to fetch data');
  }

  return res.json();
};

export default function AwardsSlide() {
  const { data, setSize } = useSWRInfinite(getKey, getUserAwards, {
    initialSize: 2,
    parallel: false,
  });
  const totalPage = data ? Math.floor(data[0].total / 16) + 1 : 1;

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
      {Array.from({ length: totalPage }).map((_, i) => (
        <SwiperSlide key={Math.random()}>
          {data &&
            data[i] &&
            Array.from({ length: 4 }).map((_, j) => (
              <AwardContainer key={j}>
                {data[i].awards.slice(j * 4, j * 4 + 4).map(award => (
                  <AwardItem key={award.id} award={award} />
                ))}
              </AwardContainer>
            ))}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
