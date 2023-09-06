import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import type { SwiperClass } from 'swiper/react';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { Award } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getAward } from './context';

export const Awards = ({ data = [] }: { data: Award[] }) => {
  const size = 4;
  const [awards, setAwards] = useState<Award[][]>([]);

  useEffect(() => {
    if (data.length) {
      const chunkedData = data.reduce((acc, _, i) => {
        if (i % size === 0) {
          acc.push(data.slice(i, i + size));
        }
        return acc;
      }, [] as Award[][]);
      setAwards(chunkedData);
    }
  }, [data]);

  return (
    <>
      {Array.from({ length: size }).map((_, i) => (
        <div
          key={Math.random()}
          className="flex items-end justify-center gap-0 w-full h-20 relative my-5"
        >
          <div className="oa-shelf oa-shelf-left grow-0" />
          <div className="oa-shelf oa-shelf-middle grow" />
          <div className="oa-shelf oa-shelf-right grow-0" />
          <ul className="absolute bottom-[10px] flex flex-column items-center justify-space gap-x-1 w-full h-full px-[16px]">
            {awards[i] &&
              awards[i].map(award => (
                <li key={award.id} className="flex flex-col items-center gap-y-1">
                  <label className="block font-uhbee-regular text-xs text-neutral-100 w-[72px] truncate text-center">
                    {award.label}
                  </label>
                  <Link href={`/award/result/${award.id}`}>
                    <Image src="/assets/award0.png" alt="award" width={72} height={72} />
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default function AwardsSlide({
  initAwards = [],
  total = 0,
}: {
  initAwards: Award[];
  total: number;
}) {
  const totalPage = total / 16 + 1; // useMemo?
  const [data, setData] = useState<Award[][]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // set data array length to totalPage
    if (total !== 0) {
      setData(Array.from({ length: totalPage }));

      // set data array to initAwards
      setData(data => {
        const newData = [...data];
        newData[0] = initAwards;
        return newData;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initAwards]);

  const handleSlideChange = async (swiper: SwiperClass) => {
    const { activeIndex } = swiper;
    // const nextPage = Math.ceil((activeIndex + 1) / 10); // 10은 한 페이지에 표시되는 아이템 수

    setCurrentPage(activeIndex + 1);
    if (activeIndex + 1 > data.length) {
      console.log('=======calling========');
      const { awards } = await getAward(currentPage);
      setData(data => {
        const newData = [...data];
        newData[activeIndex] = awards;
        return newData;
      });
    }
  };

  return (
    <section className="grow w-full flex">
      <Swiper
        slidesPerView={1}
        pagination={{
          dynamicBullets: true,
        }}
        onSlideChange={handleSlideChange}
        modules={[Pagination]}
        className="w-full"
      >
        {Array.from({ length: total / 16 + 1 }).map((_, i) => (
          <SwiperSlide key={i}>
            <Awards data={data[i]} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
