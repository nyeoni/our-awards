'use client';

import { useRef } from 'react';

import { Button } from '@nextui-org/react';

import {
  Award,
  ImgSaveButton,
  NavigateButton,
  ShareButton,
  SparklesAnimation,
} from '../../components';

export default async function Page({ params }: { params: { id: string } }) {
  // 여기서 수여받은 기록이 있는지 없는지 확인하고
  // 이미 수여받아져 있으면 -> 다른 멋있는 뷰를 보여주고,
  // 수여받지 않았으면 -> 수여받을 수 있는 버튼을 보여준다. -> 버튼을 클릭하면 -> 모달이 뜨고, 정말 그 사람이 맞는지 확인하는 로직을 추가한다.
  const captureRef = useRef<HTMLDivElement>(null);

  const handleTakenAward = () => {
    // auth 로그인이 안되어있는 유저일때
  }

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <NavigateButton path="/" />
      <div ref={captureRef}>
        <Award awardId={params.id} />
      </div>
      <section className="flex flex-col gap-y-2 grow-0">
        {/* <ShareButton id={params.id} /> */}
        <Button color="primary" radius="sm" fullWidth={true}>
          수여받기
        </Button>
        <ImgSaveButton captureRef={captureRef} />
      </section>
      <SparklesAnimation />
    </div>
  );
}
