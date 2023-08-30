'use client';

import Image from 'next/image';

import { Award } from '@prisma/client';

function chunkArray(array: string | any[], size: number) {
  const chunked = [];
  let index = 0;

  while (index < array.length) {
    chunked.push(array.slice(index, size + index));
    index += size;
  }

  return chunked;
}

export const Awards = ({ awards }: { awards: Award[] }) => {
  return (
    <>
      {chunkArray(awards, 4).map((group, i) => (
        <Shelf key={i * 3 + 1} awards={group as Award[]} />
      ))}
    </>
  );
};

export const Shelf = ({ awards }: { awards?: Award[] }) => {
  // mobile 4, tablet 8, desktop 16

  return (
    <div className="flex items-end justify-center gap-0 w-full h-20 relative my-5">
      <div className="oa-shelf oa-shelf-left grow-0" />
      <div className="oa-shelf oa-shelf-middle grow" />
      <div className="oa-shelf oa-shelf-right grow-0" />
      <ul className="absolute bottom-[10px] flex flex-column items-center justify-space gap-x-1 w-full h-full px-[16px]">
        {awards &&
          awards.map((award, i) => (
            <li key={i} className="flex flex-col items-center gap-y-1">
              <label className="block font-uhbee-regular text-xs text-neutral-100">
                {award.name}
              </label>
              <Image src="/assets/award0.png" alt="award" width={72} height={72} />
            </li>
          ))}
      </ul>
    </div>
  );
};
