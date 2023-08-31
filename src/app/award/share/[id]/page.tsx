'use client';

import html2canvas from 'html2canvas';
import Lottie from 'lottie-react';
import { useRef } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@nextui-org/react';

import Toast from '@/component/toast/Toast';

import SparklesAnimation from '../../components/sparkles_animation/SparklesAnimation';
import BackIcon from '/public/svgs/back.svg';

async function getAward(id: string) {
  if (!id) return;
  const res = await fetch(`/api/award/${id}`);
  return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {
  const captureRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const { label, name, content, host, createdAt, sender } = await getAward(params.id);
  const date = new Date(createdAt);

  const handleTaken = () => {
    // 상을 수여받아서 내 것으로 저장하는 로직
  };

  const handleSaveImage = async () => {
    if (!captureRef.current) return;
    const canvas = await html2canvas(captureRef.current);
    const imgData = canvas.toDataURL();

    // Create a link to download the image
    const link = document.createElement('a');
    link.href = imgData;
    link.download = label + '.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <Link className="flex items-center text-sm w-fit py-2" href="/">
        <BackIcon style={{ color: 'white' }} />
        <span className="ml-0.5 text-xs font-medium">메인페이지로</span>
      </Link>
      <div>
        <section
          ref={captureRef}
          className="oa-result grow-1 mb-5 flex flex-col justify-between items-center p-[42px] font-uhbee-regular text-black"
        >
          <div className="flex flex-col items-center mt-5 w-full gap-5">
            <h1 className="font-uhbee-bold text-2xl">상장</h1>
            <div className="text-sm self-start">{label}상</div>
            <div className="text-sm self-end">이름: {name}</div>
          </div>
          <div className="text-xs text-center p-3">{content}</div>
          <div className="text-sm">
            {date.getFullYear()}년 {date.getMonth() + 1}월 {date.getDate()}일
          </div>
          <div className="text-sm">
            {host} {sender.name}
          </div>
        </section>
        <section className="flex flex-col gap-y-2 grow-0">
          <Button color="primary" radius="sm" fullWidth={true} onClick={handleTaken}>
            수여받기
          </Button>
          <Button
            color="primary"
            variant="light"
            radius="sm"
            fullWidth={true}
            onClick={handleSaveImage}
          >
            사진으로 저장하기
          </Button>
        </section>
      </div>
      <Toast isVisible={true} message="상장이 저장되었습니다." />
      <SparklesAnimation />
    </div>
  );
}
