'use client';

import html2canvas from 'html2canvas';
import { useRef } from 'react';

import Link from 'next/link';

import { Button } from '@nextui-org/react';

import BackIcon from '/public/svgs/back.svg';

export default function Page() {
  const captureRef = useRef<HTMLDivElement>(null);

  const handleShare = () => {};

  const handleSaveImage = async () => {
    if (!captureRef.current) return;
    const canvas = await html2canvas(captureRef.current);
    const imgData = canvas.toDataURL();

    // Create a link to download the image
    const link = document.createElement('a');
    link.href = imgData;
    link.download = new Date().getTime().toString() + 'award.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="flex flex-col justify-between w-full h-full">
      <Link className="flex items-center text-sm" href="/">
        <BackIcon style={{ color: 'white' }} />
        <span className="ml-0.5 text-xs font-medium">메인페이지로</span>
      </Link>
      <div>
        <section
          ref={captureRef}
          className="oa-result grow-1 mb-5 flex flex-col justify-between items-center p-[42px] font-uhbee-regular text-black"
        >
          <div className="flex flex-col items-center mt-5 w-full gap-3">
            <h1 className="font-uhbee-bold text-2xl">상장</h1>
            <div className="text-sm self-start">최고귀요미상</div>
            <div className="text-sm self-end">이름: 김나연</div>
          </div>
          <div className="text-xs text-center p-3">
            귀하는 귀여움 세계에서 당당한 자존심을 가지고 웃음으로 가득한 일상을 만들어 주셨기
            때문에 수여됩니다. 그 누구에게도 귀여움 부동의 1위이기에 이 상장을 수여함.
          </div>
          <div className="text-sm">2023년 8월 13일</div>
          <div className="text-sm">너의베프 김길동</div>
        </section>
        <section className="flex flex-col gap-y-2 grow-0">
          <Button color="primary" radius="sm" fullWidth={true} onClick={handleShare}>
            공유하기
          </Button>
          <Button
            color="primary"
            variant="ghost"
            radius="sm"
            fullWidth={true}
            onClick={handleSaveImage}
          >
            사진으로 저장하기
          </Button>
        </section>
      </div>
    </div>
  );
}
