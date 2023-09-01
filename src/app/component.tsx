'use client';

// Import Swiper styles
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
// Import Swiper React components
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@nextui-org/button';
import { Award } from '@prisma/client';

import chunkArray from '@/lib/chunkArray';

import { useUserAwardsContext } from './context';

export default function Page() {
  const router = useRouter();
  const { data: session } = useSession();
  const { total } = useUserAwardsContext();

  useEffect(() => {
    router.prefetch('/award');
  }, []);

  return (
    <>
      <section className="flex flex-col gap-1 w-full mb-10 grow-0">
        <div className="font-uhbee-regular text-2xl">{session?.user.name} 님은</div>
        <div className="font-uhbee-regular text-2xl">
          총 <span className="text-secondary">{total}</span> 개의 상을 받았습니다.
        </div>
      </section>
      <section className="grow w-full flex">
        <SwipableAwards />
      </section>
      <Button
        className="font-medium grow-0"
        fullWidth={true}
        color="primary"
        size="lg"
        radius="sm"
        onPress={() => {
          router.push('/award');
        }}
      >
        시상식 개최하기
      </Button>
    </>
  );
}

export const SwipableAwards = () => {
  const { total, setCurrentPage } = useUserAwardsContext();

  return (
    <Swiper
      slidesPerView={1}
      pagination={{
        dynamicBullets: true,
      }}
      onSlideChange={swiper => {
        setCurrentPage(swiper.activeIndex + 1);
      }}
      modules={[Pagination]}
      className="w-full"
    >
      {Array.from({ length: total / 16 + 1 }).map((_, i) => (
        <SwiperSlide key={i}>
          <Awards pageNum={i + 1} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export const Awards = ({ pageNum }: { pageNum: number }) => {
  const router = useRouter();
  const { awards: allAwards } = useUserAwardsContext();
  const [awards, setAwards] = useState<Award[][]>();

  useEffect(() => {
    if (allAwards && allAwards[pageNum]) {
      const awards = chunkArray(allAwards[pageNum], 4);
      setAwards(awards);
    }
  }, [allAwards]);

  return (
    <>
      {[1, 2, 3].map((_, i) => (
        <div
          key={Math.random()}
          className="flex items-end justify-center gap-0 w-full h-20 relative my-5"
        >
          <div className="oa-shelf oa-shelf-left grow-0" />
          <div className="oa-shelf oa-shelf-middle grow" />
          <div className="oa-shelf oa-shelf-right grow-0" />
          <ul className="absolute bottom-[10px] flex flex-column items-center justify-space gap-x-1 w-full h-full px-[16px]">
            {awards &&
              awards[i] &&
              awards[i].map(award => (
                <li key={award.id} className="flex flex-col items-center gap-y-1">
                  <label className="block font-uhbee-regular text-xs text-neutral-100">
                    {award.label}
                  </label>
                  <Image
                    src="/assets/award0.png"
                    alt="award"
                    width={72}
                    height={72}
                    onClick={() => router.push(`/award/result/${award.id}`)}
                  />
                </li>
              ))}
          </ul>
        </div>
      ))}
    </>
  );
};
