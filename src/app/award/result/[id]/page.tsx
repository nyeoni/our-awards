'use client';

import html2canvas from 'html2canvas';
import { Ref, RefObject, Suspense, useEffect, useRef, useState } from 'react';



import Link from 'next/link';



import { Button } from '@nextui-org/react';



import Toast, { useToast } from '@/component/toast/Toast';



import Award from '../../components/award/Award';
import SparklesAnimation from '../../components/sparkles_animation/SparklesAnimation';
import BackIcon from '/public/svgs/back.svg';


export default async function Page({ params }: { params: { id: string } }) {
  const captureRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <Link className="flex items-center text-sm w-fit py-2" href="/">
        <BackIcon style={{ color: 'white' }} />
        <span className="ml-0.5 text-xs font-medium">메인페이지로</span>
      </Link>
      <div ref={captureRef}>
        <Award awardId={params.id} />
      </div>
      <section className="flex flex-col gap-y-2 grow-0">
        <ShareButton id={params.id} />
        <ImgSaveButton captureRef={captureRef} />
      </section>
      <SparklesAnimation />
    </div>
  );
}

const ShareButton = ({ id }: { id: string }) => {
  const { isVisible, message, open, close } = useToast();

  const handleShare = () => {
    const shareObject = {
      title: '우리들의 시상식',
      text: `당신에게 상을 수여합니다!`, // 이거 바꿔야함
      url: `${process.env.NEXT_PUBLIC_BASEURL}/share/${id}`,
    };

    if (navigator.share) {
      // Navigator를 지원하는 경우만 실행
      navigator
        .share(shareObject)
        .then(() => {
          // 정상 동작할 경우 실행
          open('공유하기 성공');
        })
        .catch(error => {
          open('에러가 발생했습니다.');
        });
    } else {
      // navigator를 지원하지 않는 경우
      console.log(`${process.env.NEXT_PUBLIC_BASEURL}/share/${id}`);
      navigator.clipboard
        .writeText(`${process.env.NEXT_PUBLIC_BASEURL}/share/${id}`)
        .then(() => open('링크가 클립보드에 복사되었습니다.'));
    }
  };

  return (
    <>
      <Button color="primary" radius="sm" fullWidth={true} onClick={handleShare}>
        공유하기
      </Button>
      <Toast isVisible={isVisible} message={message} onClose={close} />
    </>
  );
};

const ImgSaveButton = ({
  captureRef,
  imgName,
}: {
  captureRef: RefObject<HTMLDivElement>;
  imgName?: string;
}) => {
  const { isVisible, message, duration, open, close } = useToast();

  const handleSaveImage = async () => {
    if (!captureRef.current) return;
    const canvas = await html2canvas(captureRef.current);
    const imgData = canvas.toDataURL();

    // Create a link to download the image
    const link = document.createElement('a');
    link.href = imgData;
    link.download = imgName ?? '내상장' + '.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Button
        color="primary"
        variant="light"
        radius="sm"
        fullWidth={true}
        onClick={handleSaveImage}
      >
        사진으로 저장하기
      </Button>
      <Toast isVisible={isVisible} message={message} onClose={close} />
    </>
  );
};