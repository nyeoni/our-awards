'use client';

import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';

import { Button } from '@nextui-org/button';

type Award = {
  id: number;
  name: string;
};

const Shelf = ({ awards }: { awards: Award[] }) => {
  // mobile 4, tablet 8, desktop 16

  return (
    <div className="flex items-end justify-center gap-0 w-full h-20 relative my-5">
      <div className="oa-shelf oa-shelf-left grow-0" />
      <div className="oa-shelf oa-shelf-middle grow" />
      <div className="oa-shelf oa-shelf-right grow-0" />
      <ul className="absolute bottom-[10px] flex flex-column items-center justify-space gap-x-1 w-full h-full px-[16px]">
        {awards.map((award, i) => (
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

function chunkArray(array: string | any[], size: number) {
  const chunked = [];
  let index = 0;

  while (index < array.length) {
    chunked.push(array.slice(index, size + index));
    index += size;
  }

  return chunked;
}

// async function getAwards() {
//   const res = await fetch('/api/user/award', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   const data = await res.json();

//   console.log(data);

//   return data;
// }

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const awards: Award[] = [
    {
      id: 1,
      name: '최고귀요미상',
    },
    {
      id: 2,
      name: '최고이쁘니상',
    },
    {
      id: 3,
      name: '슈퍼우먼상',
    },
    {
      id: 4,
      name: '까불이상',
    },
    {
      id: 5,
      name: '최고귀요미상',
    },
    {
      id: 2,
      name: '최고이쁘니상',
    },
    {
      id: 3,
      name: '슈퍼우먼상',
    },
    {
      id: 4,
      name: '까불이상',
    },
  ];

  useEffect(() => {
    router.prefetch('/award');
  }, [router]);

  useEffect(() => {
    if (session) {
      console.log(session);
    }
  }, [session]);

  return (
    <>
      <section className="flex flex-col gap-1 w-full">
        <section className="flex flex-col gap-1 w-full mb-10">
          <div className="font-uhbee-regular text-2xl">{session?.user.name} 님은</div>
          <div className="font-uhbee-regular text-2xl">
            총 <span className="text-secondary">{awards.length}</span> 개의 상을 받았습니다.
          </div>
        </section>
        {chunkArray(awards, 4).map((group, i) => (
          <Shelf key={i * 3 + 1} awards={group as Award[]} />
        ))}
      </section>
      <Button
        className="font-medium justify-self-end"
        fullWidth={true}
        color="primary"
        radius="sm"
        onClick={() => {
          router.push('/award');
        }}
      >
        시상식 개최하기
      </Button>
    </>
  );
}
