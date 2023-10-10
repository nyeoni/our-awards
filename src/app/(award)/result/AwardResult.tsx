'use client';

import { useRef } from 'react';

import { useRouter } from 'next/navigation';

import { useSession } from 'next-auth/react';

import { ROUTE } from '@/constants/route';

import { Award as AwardImg } from './Award';
import { ImgSaveButton } from './ImgSaveButton';
import { NavigateButton } from './NavigateButton';
import { ShareAwardButton } from './ShareAwardButton';
import { TakenAwardButton } from './TakenAwardButton';
import type { AwardDto } from './[id]/page';

export const AwardResult = ({ award }: { award: AwardDto }) => {
  const router = useRouter();
  const captureRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <NavigateButton label="메인페이지로" onClick={() => router.push(ROUTE.HOME)} />
      <div ref={captureRef}>
        <AwardImg award={award} />
      </div>
      <section className="flex flex-col gap-y-2 grow-0">
        {user?.id !== award.senderId && !award.receiverId ? (
          <TakenAwardButton award={award} />
        ) : (
          <ShareAwardButton award={award} />
        )}
        <ImgSaveButton captureRef={captureRef} />
      </section>
    </div>
  );
};

// 여기서 수여받은 기록이 있는지 없는지 확인하고
// 이미 수여받아져 있으면 -> 다른 멋있는 뷰를 보여주고,
// 수여받지 않았으면 -> 수여받을 수 있는 버튼을 보여준다. -> 버튼을 클릭하면 -> 모달이 뜨고, 정말 그 사람이 맞는지 확인하는 로직을 추가한다.
